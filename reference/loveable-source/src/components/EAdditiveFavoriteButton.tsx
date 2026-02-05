import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useEAdditiveFavorites } from '@/hooks/useEAdditiveFavorites';
import { EAdditive } from '@/hooks/useEAdditives';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface EAdditiveFavoriteButtonProps {
  additive: EAdditive;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
  className?: string;
}

export const EAdditiveFavoriteButton = ({ 
  additive, 
  variant = 'ghost', 
  size = 'sm',
  showText = false,
  className 
}: EAdditiveFavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useEAdditiveFavorites();
  const isCurrentlyFavorite = isFavorite(additive.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if used inside Link
    e.stopPropagation();
    
    toggleFavorite(additive);
    
    if (isCurrentlyFavorite) {
      toast.success(`${additive.e_number} borttaget från favoriter`);
    } else {
      toast.success(`${additive.e_number} tillagt till favoriter`);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn(
        "transition-colors",
        isCurrentlyFavorite && "text-red-500 hover:text-red-600",
        className
      )}
      title={isCurrentlyFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
    >
      <Heart 
        className={cn(
          "w-4 h-4",
          showText && "mr-2",
          isCurrentlyFavorite && "fill-current"
        )} 
      />
      {showText && (isCurrentlyFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter")}
    </Button>
  );
};