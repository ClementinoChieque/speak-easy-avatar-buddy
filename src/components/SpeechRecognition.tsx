
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

type SpeechRecognitionProps = {
  isListening: boolean;
  onToggleListen: () => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  className?: string;
};

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  isListening,
  onToggleListen,
  isAudioEnabled,
  onToggleAudio,
  className
}) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center gap-3">
            <Button
              onClick={onToggleListen}
              variant={isListening ? "destructive" : "default"}
              className="gap-2"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              {isListening ? "Stop" : "Start"} Listening
            </Button>
            
            {isListening && (
              <div className="flex items-center gap-1">
                <span className="animate-pulse h-2 w-2 bg-red-500 rounded-full"></span>
                <span className="animate-pulse h-3 w-3 bg-red-500 rounded-full delay-75"></span>
                <span className="animate-pulse h-4 w-4 bg-red-500 rounded-full delay-150"></span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={onToggleAudio}
              variant={isAudioEnabled ? "default" : "outline"}
              className="gap-2"
            >
              {isAudioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              {isAudioEnabled ? "Mute Avatar" : "Unmute Avatar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpeechRecognition;
