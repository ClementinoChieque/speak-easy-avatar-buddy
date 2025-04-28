
import React from 'react';
import { ConversationProvider } from '@/contexts/ConversationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LanguageSelector from '@/components/language/LanguageSelector';
import TopicSelector from '@/components/topics/TopicSelector';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PracticeArea from '@/components/practice/PracticeArea';

const AppContent: React.FC = () => {
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);
  const [isListening, setIsListening] = React.useState(false);
  
  const handleToggleListen = () => {
    setIsListening(!isListening);
  };
  
  const handleToggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Header />
      
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
            <PracticeArea 
              isAudioEnabled={isAudioEnabled}
              isListening={isListening}
              onToggleListen={handleToggleListen}
              onToggleAudio={handleToggleAudio}
            />
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
      
      <Footer />
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
