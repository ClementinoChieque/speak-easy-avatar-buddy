
import React from 'react';
import { useConversation } from '@/contexts/ConversationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TopicSelector: React.FC = () => {
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
  
  const { setCurrentTopic, learningLanguage } = useConversation();
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

export default TopicSelector;
