import { useState, useEffect } from 'react';
import { Plus, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWhisperVoiceInput } from '@/hooks/useWhisperVoiceInput';
import { useTypingIndicator } from '@/hooks/useTypingIndicator';
import { useQuickAddSuggestions } from '@/hooks/useQuickAddSuggestions';

import { cn } from '@/lib/utils';

interface AddItemFormProps {
  onAddItem: (name: string) => void;
  disabled?: boolean;
  listId?: string;
}

export const AddItemForm = ({ onAddItem, disabled, listId }: AddItemFormProps) => {
  const [itemName, setItemName] = useState('');
  const { isRecording, isProcessing, startRecording, stopRecording, isSupported, error } = useWhisperVoiceInput();
  const { setTyping } = useTypingIndicator(listId);
  const { suggestions } = useQuickAddSuggestions(itemName);
  
  
  let typingTimeout: NodeJS.Timeout;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = itemName.trim();
    
    // Enhanced input validation for security
    if (!trimmedName || disabled) return;
    
    // Security validation
    if (trimmedName.length > 100 || /<script|javascript:|data:|vbscript:|on\w+=/i.test(trimmedName)) {
      console.warn('Invalid input filtered for security');
      return;
    }
    
    // Additional safe character validation (allow commas for multi-item input)
    if (!/^[\w\s\-åäöÅÄÖ.,!?()\/&%]+$/u.test(trimmedName)) {
      console.warn('Invalid characters in input');
      return;
    }
    
    onAddItem(trimmedName);
    setItemName('');
    setTyping(false);
  };

  const handleVoiceInput = () => {
    if (isRecording || isProcessing) {
      return; // Prevent multiple clicks
    }
    
    startRecording((text) => {
      // Auto-add the item directly after voice recognition
      const trimmedText = text.trim();
      if (trimmedText) {
        onAddItem(trimmedText);
        setTyping(false);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemName(value);
    
    // Typing indicator
    setTyping(true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => setTyping(false), 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onAddItem(suggestion);
    setItemName('');
    setTyping(false);
  };

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, []);

  return (
    <div className="sticky bottom-0 bg-background border-t">
      {/* Quick Add Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-2 border-b">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {suggestions.map((item) => (
              <Button
                key={item.name}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(item.name)}
                className="whitespace-nowrap text-xs"
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={itemName}
            onChange={handleInputChange}
            placeholder="Lägg till vara..."
            disabled={disabled}
            autoComplete="off"
            className="pr-12 ring-2 ring-primary/20 focus:ring-primary/50 transition-all"
          />
          
          {isSupported && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleVoiceInput}
              disabled={disabled || isProcessing}
              className={cn(
                "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0",
                (isRecording || isProcessing) && "text-primary animate-pulse"
              )}
            >
              {isProcessing ? (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : isRecording ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={!itemName.trim() || disabled}
          className="h-10 w-10 p-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
        </form>

        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
        
        {isRecording && (
          <p className="text-sm text-primary mt-2 animate-pulse">
            Lyssnar... Säg namnet på varan (4 sek)
          </p>
        )}
        
        {isProcessing && (
          <p className="text-sm text-primary mt-2 animate-pulse">
            Bearbetar röstinput...
          </p>
        )}
      </div>
    </div>
  );
};