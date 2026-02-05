import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1c4a890b24f944f5b91484bf1c9a2836',
  appName: 'vihandlar-sverige',
  webDir: 'dist',
  server: {
    url: 'https://1c4a890b-24f9-44f5-b914-84bf1c9a2836.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#F1A200',
      showSpinner: false
    }
  }
};

export default config;