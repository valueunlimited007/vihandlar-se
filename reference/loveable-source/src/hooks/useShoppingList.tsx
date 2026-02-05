import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  user_id: string | null;
  share_token: string;
  created_at: string;
  updated_at: string;
}

export const useShoppingList = (listId?: string) => {
  const [list, setList] = useState<ShoppingList | null>(null);
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load list and items
  const loadList = async (id: string) => {
    try {
      setLoading(true);
      
      // Fetch list
      const { data: listData, error: listError } = await supabase
        .from('lists')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (listError) throw listError;
      setList(listData);

      // Fetch items
      const { data: itemsData, error: itemsError } = await supabase
        .from('items')
        .select('*')
        .eq('list_id', id)
        .order('created_at', { ascending: true });

      if (itemsError) throw itemsError;
      setItems(itemsData || []);

    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Fel",
        description: "Kunde inte ladda listan"
      });
    } finally {
      setLoading(false);
    }
  };

  // Create new list
  const createList = async (name: string = 'Min lista') => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('lists')
        .insert({
          name,
          user_id: userData.user?.id || null
        })
        .select()
        .single();

      if (error) throw error;
      
      setList(data);
      setItems([]);
      return data;
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Fel",
        description: "Kunde inte skapa listan"
      });
      return null;
    }
  };

  // Add item to list
  const addItem = async (name: string, quantity: string = '1', unit: string = 'st') => {
    if (!list) return;

    // Enhanced input validation for security
    const trimmedName = name.trim();
    
    // Check for empty or too long names
    if (!trimmedName || trimmedName.length > 100) {
      toast({
        variant: "destructive",
        title: "Ogiltigt varunamn",
        description: "Varunamnet måste vara mellan 1-100 tecken."
      });
      return;
    }

    // Check for potentially malicious content
    if (/<script|javascript:|data:|vbscript:|on\w+=/i.test(trimmedName)) {
      toast({
        variant: "destructive",
        title: "Ogiltigt varunamn",
        description: "Varunamnet innehåller otillåtna tecken."
      });
      return;
    }

    // Allow only safe characters including Swedish characters
    if (!/^[\w\s\-åäöÅÄÖ.,!?()\/&%]+$/u.test(trimmedName)) {
      toast({
        variant: "destructive",
        title: "Ogiltigt varunamn",
        description: "Varunamnet får endast innehålla bokstäver, siffror och vanliga tecken."
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('items')
        .insert({
          list_id: list.id,
          name: trimmedName,
          quantity,
          unit
        })
        .select()
        .single();

      if (error) throw error;
      
      setItems(prev => [...prev, data]);
      return data;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Fel",
        description: "Kunde inte lägga till varan"
      });
    }
  };

  // Toggle item completion
  const toggleItem = async (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    try {
      const { error } = await supabase
        .from('items')
        .update({ completed: !item.completed })
        .eq('id', itemId);

      if (error) throw error;

      setItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, completed: !i.completed } : i
      ));
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Fel",
        description: "Kunde inte uppdatera varan"
      });
    }
  };

  // Delete item
  const deleteItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setItems(prev => prev.filter(i => i.id !== itemId));
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Fel",
        description: "Kunde inte ta bort varan"
      });
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    if (!listId) return;

    loadList(listId);

    // Subscribe to changes
    const channel = supabase
      .channel('shopping-list-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'items',
          filter: `list_id=eq.${listId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setItems(prev => {
              const exists = prev.find(item => item.id === payload.new.id);
              return exists ? prev : [...prev, payload.new as ShoppingItem];
            });
          } else if (payload.eventType === 'UPDATE') {
            setItems(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as ShoppingItem : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setItems(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [listId]);

  return {
    list,
    items,
    loading,
    error,
    createList,
    addItem,
    toggleItem,
    deleteItem,
    loadList
  };
};