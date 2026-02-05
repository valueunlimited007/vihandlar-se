import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useListPresence } from '@/hooks/useListPresence';
import { useTypingIndicator } from '@/hooks/useTypingIndicator';
import { useSmartSorting } from '@/hooks/useSmartSorting';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { ShoppingListItem } from './ShoppingListItem';
import { AddItemForm } from './AddItemForm';
import { ShareButton } from './ShareButton';
import { SaveButton } from './SaveButton';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Settings } from 'lucide-react';
import { AudioSettings } from './AudioSettings';

export const ShoppingListView = () => {
  const { shareToken } = useParams<{ shareToken: string }>();
  const navigate = useNavigate();
  const [listId, setListId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const { list, items, loading, error, addItem, toggleItem, deleteItem } = useShoppingList(listId || undefined);
  const { presenceCount } = useListPresence(listId || undefined);
  const { typingUsers } = useTypingIndicator(listId || undefined);
  const { sortItems } = useSmartSorting();
  const { isEnabled: soundEnabled, setEnabled: setSoundEnabled, playItemAdded } = useAudioFeedback();

  // Find list by share token with proper validation
  useEffect(() => {
    if (shareToken && !listId) {
      // Validate share token format (should be UUID)
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(shareToken)) {
        console.error('Invalid share token format');
        return;
      }

      const findListByToken = async () => {
        try {
          // Get the list directly by share token
          const { data: listData, error: listError } = await supabase
            .from('lists')
            .select('id')
            .eq('share_token', shareToken)
            .single();
          
          if (listError) {
            console.error('Could not find list with share token:', listError);
            return;
          }
          
          if (listData && listData.id !== listId) {
            setListId(listData.id);
          }
        } catch (err) {
          console.error('Error finding list by share token:', err);
        }
      };
      
      findListByToken();
    }
  }, [shareToken, listId]);

  const { pendingItems, completedItems } = useMemo(() => {
    const sorted = sortItems(items);
    const pending = sorted.filter(item => !item.completed);
    const completed = sorted.filter(item => item.completed);
    return { pendingItems: pending, completedItems: completed };
  }, [items, sortItems]);

  const handleAddItem = (name: string) => {
    // Check if name contains comma-separated items
    if (name.includes(',')) {
      const items = name.split(',').map(item => item.trim()).filter(item => item.length > 0);
      items.forEach(item => {
        // Parse quantity and unit for each item
        const match = item.match(/^(.+?)\s+(\d+(?:[.,]\d+)?)\s*([a-zA-ZåäöÅÄÖ]+)?$/);
        
        if (match) {
          const [, itemName, quantity, unit] = match;
          addItem(itemName.trim(), quantity, unit || 'st');
        } else {
          addItem(item);
        }
      });
      playItemAdded();
    } else {
      // Parse quantity and unit from voice input or text
      const match = name.match(/^(.+?)\s+(\d+(?:[.,]\d+)?)\s*([a-zA-ZåäöÅÄÖ]+)?$/);
      
      if (match) {
        const [, itemName, quantity, unit] = match;
        addItem(itemName.trim(), quantity, unit || 'st');
      } else {
        addItem(name);
      }
      playItemAdded();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-md mx-auto">
          <div className="p-4 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-12 w-full" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !list) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto" />
          <h2 className="text-xl font-semibold">Listan kunde inte hittas</h2>
          <p className="text-muted-foreground">
            Kontrollera länken eller skapa en ny lista.
          </p>
          <Button onClick={() => navigate('/')}>
            Tillbaka till start
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {shareToken && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="h-8 w-8 p-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <div>
                <h1 className="text-xl font-bold text-primary">{list.name}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{pendingItems.length} kvar, {completedItems.length} klara</span>
                <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span className={cn(presenceCount > 1 && "text-green-600 font-medium")}>
                      {presenceCount === 1 ? 'Endast jag' : `${presenceCount} personer`}
                    </span>
                  </div>
                </div>
                {typingUsers.length > 0 && (
                  <p className="text-xs text-primary animate-pulse">
                    Någon skriver...
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="h-8 w-8 p-0"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 bg-muted/20 border-b animate-fade-in">
            <h3 className="font-medium mb-3">Inställningar</h3>
            <AudioSettings />
            <div className="mt-4 pt-4 border-t text-xs text-muted-foreground space-y-1">
              <p>💡 Tips: Swipe höger för att bocka av, swipe vänster för att ta bort</p>
              <p>🔊 Om ljudet inte fungerar, tryck "Testa" efter att ha klickat någonstans på sidan först</p>
            </div>
          </div>
        )}

        {/* List Content */}
        <div className="p-4 space-y-4">
          {/* Pending Items */}
          {pendingItems.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Att handla
              </h2>
              {pendingItems.map((item) => (
                <div key={item.id} className="animate-fade-in">
                  <ShoppingListItem
                    item={item}
                    onToggle={toggleItem}
                    onDelete={deleteItem}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Completed Items */}
          {completedItems.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Inhandlat
              </h2>
              {completedItems.map((item) => (
                <div key={item.id} className="animate-fade-in">
                  <ShoppingListItem
                    item={item}
                    onToggle={toggleItem}
                    onDelete={deleteItem}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {items.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-medium mb-2">Tom lista</h3>
                <p className="text-muted-foreground">
                  Lägg till din första vara nedan eller använd röstinmatning.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Add Item Form */}
        <AddItemForm 
          onAddItem={handleAddItem} 
          listId={listId || undefined}
        />


        {/* Save Button and Share Button - Mobile First */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          <SaveButton 
            shareToken={list.share_token} 
            listName={list.name}
          />
          <ShareButton 
            shareToken={list.share_token} 
            listName={list.name}
          />
        </div>
      </div>
    </div>
  );
};