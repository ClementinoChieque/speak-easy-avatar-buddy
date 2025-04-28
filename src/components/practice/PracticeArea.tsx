
import React from 'react';
import Avatar from '@/components/Avatar';
import ConversationArea from '@/components/ConversationArea';
import FeedbackDisplay from '@/components/FeedbackDisplay';
import SpeechRecognition from '@/components/SpeechRecognition';
import LevelSelector from '@/components/level/LevelSelector';
import { useConversation } from '@/contexts/ConversationContext';

const PracticeArea: React.FC<{
  isAudioEnabled: boolean;
  isListening: boolean;
  onToggleListen: () => void;
  onToggleAudio: () => void;
}> = ({ isAudioEnabled, isListening, onToggleListen, onToggleAudio }) => {
  const { isAvatarSpeaking } = useConversation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col items-center">
        <Avatar 
          isSpeaking={isAvatarSpeaking && isAudioEnabled} 
          emotion="neutral"
          className="mb-4"
        />
        <LevelSelector />
      </div>
      
      <div className="md:col-span-2 space-y-4">
        <ConversationArea />
        <SpeechRecognition 
          isListening={isListening}
          onToggleListen={onToggleListen}
          isAudioEnabled={isAudioEnabled}
          onToggleAudio={onToggleAudio}
        />
        <FeedbackDisplay />
      </div>
    </div>
  );
};

export default PracticeArea;
