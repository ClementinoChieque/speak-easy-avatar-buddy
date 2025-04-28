
import React from 'react';
import { ConversationProvider } from '@/contexts/ConversationContext';
import Avatar from '@/components/Avatar';
import ConversationArea from '@/components/ConversationArea';
import FeedbackDisplay from '@/components/FeedbackDisplay';
import SpeechRecognition from '@/components/SpeechRecognition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector from '@/components/language/LanguageSelector';
import LevelSelector from '@/components/level/LevelSelector';
import TopicSelector from '@/components/topics/TopicSelector';
import { useConversation } from '@/contexts/ConversationContext';
import { Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAvatarSpeaking } = useConversation();
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);
  const [isListening, setIsListening] = React.useState(false);
  const [currentEmotion, setCurrentEmotion] = React.useState<'neutral' | 'happy' | 'thinking' | 'confused'>('neutral');
  
  const handleToggleListen = () => {
    setIsListening(!isListening);
  };
  
  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center justify-center gap-2">
          <span className="text-avatar">SpeakEasy</span>
          <Sparkles className="h-6 w-6 text-avatar-accent animate-pulse-light" />
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practice English conversations with your AI language buddy. Get real-time feedback and improve your speaking skills.
        </p>
      </header>
      
      <main className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        
        <Tabs defaultValue="practice" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="practice">Practice Conversation</TabsTrigger>
            <TabsTrigger value="topics">Choose Topic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="practice" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <Avatar 
                  isSpeaking={isAvatarSpeaking && isAudioEnabled} 
                  emotion={currentEmotion}
                  className="mb-4"
                />
                <LevelSelector />
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <ConversationArea />
                <SpeechRecognition 
                  isListening={isListening}
                  onToggleListen={handleToggleListen}
                  isAudioEnabled={isAudioEnabled}
                  onToggleAudio={handleToggleAudio}
                />
                <FeedbackDisplay />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="topics">
            <Card>
              <CardHeader>
                <CardTitle>Choose a conversation topic</CardTitle>
                <CardDescription>
                  Select a topic to practice different conversation scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopicSelector />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© 2025 SpeakEasy - Learn English with an AI Avatar Buddy</p>
      </footer>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ConversationProvider>
      <AppContent />
    </ConversationProvider>
  );
};

export default Index;
