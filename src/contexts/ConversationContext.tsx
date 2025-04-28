
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ConversationTopic {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  initialPrompt: string;
}

export interface FeedbackType {
  id?: string;
  type: 'grammar' | 'pronunciation' | 'vocabulary' | 'fluency' | 'praise';
  message: string;
  suggestion?: string;
}

interface ConversationContextType {
  messages: Array<{ id: string; speaker: 'user' | 'avatar'; text: string; timestamp: Date }>;
  addMessage: (speaker: 'user' | 'avatar', text: string) => void;
  userInput: string;
  setUserInput: (input: string) => void;
  feedback: FeedbackType[];
  addFeedback: (feedback: Omit<FeedbackType, 'id'>) => void;
  isAvatarSpeaking: boolean;
  setIsAvatarSpeaking: (speaking: boolean) => void;
  learningLevel: string;
  setLearningLevel: (level: string) => void;
  currentTopic: ConversationTopic | null;
  setCurrentTopic: (topic: ConversationTopic) => void;
  learningLanguage: "en" | "pt";
  setLearningLanguage: (lang: "en" | "pt") => void;
  resetConversation: () => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Array<{ id: string; speaker: 'user' | 'avatar'; text: string; timestamp: Date }>>([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<FeedbackType[]>([]);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [learningLevel, setLearningLevel] = useState('beginner');
  const [currentTopic, setCurrentTopic] = useState<ConversationTopic | null>(null);
  const [learningLanguage, setLearningLanguage] = useState<"en" | "pt">("en");

  const addMessage = (speaker: 'user' | 'avatar', text: string) => {
    setMessages(prev => [...prev, { id: Math.random().toString(), speaker, text, timestamp: new Date() }]);
  };

  const addFeedback = (newFeedback: Omit<FeedbackType, 'id'>) => {
    setFeedback(prev => [...prev, { id: Math.random().toString(), ...newFeedback }]);
  };

  const resetConversation = () => {
    setMessages([]);
    setFeedback([]);
    setUserInput('');
  };

  return (
    <ConversationContext.Provider value={{
      messages,
      addMessage,
      userInput,
      setUserInput,
      feedback,
      addFeedback,
      isAvatarSpeaking,
      setIsAvatarSpeaking,
      learningLevel,
      setLearningLevel,
      currentTopic,
      setCurrentTopic,
      learningLanguage,
      setLearningLanguage,
      resetConversation,
    }}>
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};
