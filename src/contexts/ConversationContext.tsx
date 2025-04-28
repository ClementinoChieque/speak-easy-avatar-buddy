
import React, { createContext, useState, useContext, useCallback } from 'react';

// Define types for our feedback and dialogue
export type FeedbackType = {
  type: 'pronunciation' | 'grammar' | 'vocabulary' | 'fluency' | 'praise';
  message: string;
  suggestion?: string;
};

export type DialogueMessage = {
  id: string;
  speaker: 'avatar' | 'user';
  text: string;
  timestamp: Date;
};

export type ConversationTopic = {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  initialPrompt: string;
};

type ConversationContextType = {
  messages: DialogueMessage[];
  feedback: FeedbackType[];
  currentTopic: ConversationTopic | null;
  isAvatarSpeaking: boolean;
  userInput: string;
  learningLevel: 'beginner' | 'intermediate' | 'advanced';
  addMessage: (speaker: 'avatar' | 'user', text: string) => void;
  setUserInput: (input: string) => void;
  addFeedback: (feedback: FeedbackType) => void;
  clearFeedback: () => void;
  setCurrentTopic: (topic: ConversationTopic) => void;
  setIsAvatarSpeaking: (isSpeaking: boolean) => void;
  setLearningLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  resetConversation: () => void;
};

// Sample topics
const SAMPLE_TOPICS: ConversationTopic[] = [
  {
    id: '1',
    title: 'Ordering at a Restaurant',
    description: 'Practice ordering food and drinks at a restaurant.',
    difficulty: 'beginner',
    initialPrompt: "Hello! Welcome to our restaurant. What would you like to order today?"
  },
  {
    id: '2',
    title: 'Job Interview',
    description: 'Practice answering common job interview questions.',
    difficulty: 'intermediate',
    initialPrompt: "Good morning! Thanks for coming in today. Could you tell me a bit about yourself?"
  },
  {
    id: '3',
    title: 'Business Negotiation',
    description: 'Practice negotiating a business deal or contract.',
    difficulty: 'advanced',
    initialPrompt: "Let's discuss the terms of our potential partnership. What are your thoughts on our initial proposal?"
  }
];

// Create the context
const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

// Create provider component
export const ConversationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<DialogueMessage[]>([]);
  const [feedback, setFeedback] = useState<FeedbackType[]>([]);
  const [currentTopic, setCurrentTopic] = useState<ConversationTopic | null>(SAMPLE_TOPICS[0]);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [learningLevel, setLearningLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  // Add a new message to the conversation
  const addMessage = useCallback((speaker: 'avatar' | 'user', text: string) => {
    const newMessage: DialogueMessage = {
      id: Date.now().toString(),
      speaker,
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // Add feedback
  const addFeedback = useCallback((newFeedback: FeedbackType) => {
    setFeedback(prev => [...prev, newFeedback]);
  }, []);

  // Clear all feedback
  const clearFeedback = useCallback(() => {
    setFeedback([]);
  }, []);

  // Reset the entire conversation
  const resetConversation = useCallback(() => {
    setMessages([]);
    setFeedback([]);
    if (currentTopic) {
      addMessage('avatar', currentTopic.initialPrompt);
    }
  }, [currentTopic, addMessage]);

  return (
    <ConversationContext.Provider
      value={{
        messages,
        feedback,
        currentTopic,
        isAvatarSpeaking,
        userInput,
        learningLevel,
        addMessage,
        setUserInput,
        addFeedback,
        clearFeedback,
        setCurrentTopic,
        setIsAvatarSpeaking,
        setLearningLevel,
        resetConversation
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

// Custom hook to use the conversation context
export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};

export default ConversationContext;
