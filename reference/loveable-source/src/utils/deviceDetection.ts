export type DeviceType = 'iPhone' | 'Android' | 'Desktop' | 'Tablet' | 'Unknown';

export const detectDeviceType = (): DeviceType => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
  
  // iPhone detection
  if (/iphone|ipod/.test(userAgent)) {
    return 'iPhone';
  }
  
  // iPad detection (considered tablet)
  if (/ipad/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'Tablet';
  }
  
  // Android phone detection
  if (/android/.test(userAgent) && /mobile/.test(userAgent)) {
    return 'Android';
  }
  
  // Android tablet detection
  if (/android/.test(userAgent) && !isTablet) {
    return 'Tablet';
  }
  
  // General tablet detection based on screen size
  if (isTablet) {
    return 'Tablet';
  }
  
  // Desktop detection
  if (window.innerWidth > 1024) {
    return 'Desktop';
  }
  
  return 'Unknown';
};

export const getDeviceEmoji = (deviceType: DeviceType): string => {
  switch (deviceType) {
    case 'iPhone':
      return '📱';
    case 'Android':
      return '🤖';
    case 'Desktop':
      return '💻';
    case 'Tablet':
      return '📱';
    default:
      return '📱';
  }
};

export const getDeviceNotificationText = (deviceType: DeviceType): { title: string; description: string } => {
  const emoji = getDeviceEmoji(deviceType);
  
  switch (deviceType) {
    case 'iPhone':
      return {
        title: `${emoji} Någon gick med från iPhone!`,
        description: "En person till handlar nu med dig"
      };
    case 'Android':
      return {
        title: `${emoji} Någon gick med från Android!`,
        description: "En person till handlar nu med dig"
      };
    case 'Desktop':
      return {
        title: `${emoji} Någon gick med från Desktop!`,
        description: "En person till handlar nu med dig"
      };
    case 'Tablet':
      return {
        title: `${emoji} Någon gick med från Surfplatta!`,
        description: "En person till handlar nu med dig"
      };
    default:
      return {
        title: "🎉 Någon gick med!",
        description: "En person till handlar nu med dig"
      };
  }
};