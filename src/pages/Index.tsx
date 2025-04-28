
import React, { useState } from 'react';
import { ConversationProvider } from '@/contexts/ConversationContext';
import Avatar from '@/components/Avatar';
import ConversationArea from '@/components/ConversationArea';
import FeedbackDisplay from '@/components/FeedbackDisplay';
import SpeechRecognition from '@/components/SpeechRecognition';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useConversation } from '@/contexts/ConversationContext';
import { Sparkles, Languages } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { learningLanguage, setLearningLanguage } = useConversation();
  
  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4" />
      <Select
        value={learningLanguage}
        onValueChange={(value: "en" | "pt") => setLearningLanguage(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="pt">Português</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const LevelSelector: React.FC = () => {
  const { learningLevel, setLearningLevel } = useConversation();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Level:</span>
      <Select
        value={learningLevel}
        onValueChange={(value: any) => setLearningLevel(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const TopicSelector: React.FC = () => {
  const { learningLanguage } = useConversation();
  
  const topics = {
    en: [
      {
        id: '1',
        title: 'Ordering at a Restaurant',
        description: 'Practice ordering food and drinks at a restaurant.',
        difficulty: 'beginner' as const,
        initialPrompt: "Hello! Welcome to our restaurant. What would you like to order today?"
      },
      {
        id: '2',
        title: 'Job Interview',
        description: 'Practice answering common job interview questions.',
        difficulty: 'intermediate' as const,
        initialPrompt: "Good morning! Thanks for coming in today. Could you tell me a bit about yourself?"
      },
      {
        id: '3',
        title: 'Business Negotiation',
        description: 'Practice negotiating a business deal or contract.',
        difficulty: 'advanced' as const,
        initialPrompt: "Let's discuss the terms of our potential partnership. What are your thoughts on our initial proposal?"
      }
    ],
    pt: [
      {
        id: '1',
        title: 'Pedindo em um Restaurante',
        description: 'Pratique fazer pedidos de comida e bebida em inglês.',
        difficulty: 'beginner' as const,
        initialPrompt: "Hello! Welcome to our restaurant. What would you like to order today?"
      },
      {
        id: '2',
        title: 'Entrevista de Emprego',
        description: 'Pratique responder perguntas comuns de entrevista de emprego em inglês.',
        difficulty: 'intermediate' as const,
        initialPrompt: "Good morning! Thanks for coming in today. Could you tell me a bit about yourself?"
      },
      {
        id: '3',
        title: 'Negociação Empresarial',
        description: 'Pratique negociar acordos e contratos em inglês.',
        difficulty: 'advanced' as const,
        initialPrompt: "Let's discuss the terms of our potential partnership. What are your thoughts on our initial proposal?"
      }
    ]
  };
  
  const { setCurrentTopic } = useConversation();
  const currentTopics = topics[learningLanguage || 'en'];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {currentTopics.map((topic) => (
        <Card 
          key={topic.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setCurrentTopic(topic)}
        >
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{topic.title}</CardTitle>
              <Badge 
                variant="outline" 
                className={
                  topic.difficulty === 'beginner' 
                    ? 'bg-green-100 text-green-800' 
                    : topic.difficulty === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }
              >
                {topic.difficulty}
              </Badge>
            </div>
            <CardDescription>{topic.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAvatarSpeaking } = useConversation();
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<'neutral' | 'happy' | 'thinking' | 'confused'>('neutral');
  
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
