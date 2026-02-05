import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useAudioFeedback } from "@/hooks/useAudioFeedback";
import { useState, useEffect } from "react";

export const AudioSettings = () => {
  const { setEnabled, isEnabled, testAudio } = useAudioFeedback();
  const [audioEnabled, setAudioEnabled] = useState(isEnabled());

  useEffect(() => {
    setAudioEnabled(isEnabled());
  }, [isEnabled]);

  const handleToggle = (enabled: boolean) => {
    setAudioEnabled(enabled);
    setEnabled(enabled);
  };

  const handleTest = () => {
    if (audioEnabled) {
      testAudio();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {audioEnabled ? (
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          ) : (
            <VolumeX className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">Ljudfeedback</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {audioEnabled ? "På" : "Av"}
          </span>
          <Switch
            checked={audioEnabled}
            onCheckedChange={handleToggle}
            aria-label={`Ljudfeedback ${audioEnabled ? "på" : "av"}`}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Testa ljud</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleTest}
          disabled={!audioEnabled}
          aria-label="Testa ljudsignaler"
          className="text-xs"
        >
          Testa
        </Button>
      </div>
      
      {!audioEnabled && (
        <p className="text-xs text-muted-foreground">
          Ljudsignaler är avstängda. Slå på för att höra feedback när du lägger till, bockar av eller tar bort varor.
        </p>
      )}
    </div>
  );
};