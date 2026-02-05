import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export const SulfiteWarningBanner = () => {
  return (
    <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription>
        <strong className="text-red-700 dark:text-red-400">OBS! Detta är en sulfit.</strong>
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          Sulfiter kan orsaka allvarliga reaktioner hos astmatiker och sulfitöverkänsliga personer. 
          Om du tillhör någon av dessa grupper, undvik produkter med detta E-ämne helt.
        </p>
      </AlertDescription>
    </Alert>
  );
};
