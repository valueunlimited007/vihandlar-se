import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { ShoppingItem } from '@/hooks/useShoppingList';
import { Button } from '@/components/ui/button';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { cn } from '@/lib/utils';

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ShoppingListItem = ({ item, onToggle, onDelete }: ShoppingListItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [justChanged, setJustChanged] = useState(false);
  const { lightTap, mediumTap } = useHapticFeedback();
  const { playItemCompleted, playItemRemoved } = useAudioFeedback();

  const handleToggle = () => {
    setIsAnimating(true);
    setJustChanged(true);
    
    if (!item.completed) {
      lightTap();
      playItemCompleted();
    } else {
      mediumTap();
    }
    
    onToggle(item.id);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleDelete = () => {
    setIsAnimating(true);
    mediumTap();
    playItemRemoved();
    onDelete(item.id);
  };

  // Swipe gestures
  const swipeHandlers = useSwipeGesture({
    onSwipeRight: () => {
      if (!item.completed) {
        handleToggle(); // Swipe right to complete
      }
    },
    onSwipeLeft: handleDelete, // Swipe left to delete
    threshold: 100,
  });

  // Reset animation state after item changes
  useEffect(() => {
    if (justChanged) {
      const timer = setTimeout(() => setJustChanged(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [justChanged]);
  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-4 bg-card rounded-lg border transition-all duration-200 hover:shadow-md",
        isAnimating && "scale-95",
        justChanged && "animate-pulse ring-2 ring-primary/20",
        item.completed && "opacity-60"
      )}
      {...swipeHandlers}
    >
      <button
        onClick={handleToggle}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover-scale",
          item.completed 
            ? "bg-accent border-accent text-accent-foreground" 
            : "border-muted-foreground hover:border-primary"
        )}
      >
        {item.completed && <Check className="w-4 h-4" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className={cn(
          "font-medium transition-all duration-200",
          item.completed && "line-through text-muted-foreground"
        )}>
          {item.name}
        </div>
        {(item.quantity !== '1' || item.unit !== 'st') && (
          <div className="text-sm text-muted-foreground">
            {item.quantity} {item.unit}
          </div>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className="flex-shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};