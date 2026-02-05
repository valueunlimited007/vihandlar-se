interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export const useSwipeGesture = ({ 
  onSwipeLeft, 
  onSwipeRight, 
  threshold = 100 
}: SwipeHandlers) => {
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isTracking = false;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isTracking = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTracking || e.touches.length !== 1) return;
    
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!isTracking) return;
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    
    // Check if horizontal swipe is dominant and exceeds threshold
    if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    
    isTracking = false;
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};