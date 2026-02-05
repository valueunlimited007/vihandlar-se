export const useHapticFeedback = () => {
  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const lightTap = () => vibrate(50);
  const mediumTap = () => vibrate(100);
  const doubleTap = () => vibrate([50, 50, 50]);

  return {
    lightTap,
    mediumTap,
    doubleTap,
    isSupported: 'vibrate' in navigator,
  };
};