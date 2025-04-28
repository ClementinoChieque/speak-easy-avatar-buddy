
import type { ConversationTopic } from '@/contexts/ConversationContext';

// Simple responses for different conversation topics
const responseTemplates = {
  'restaurant': [
    "That sounds delicious! Would you like anything to drink with that?",
    "Great choice! Would you like that with fries or a salad?",
    "Would you prefer your steak well-done, medium, or rare?",
    "We also have a special today. Would you be interested in hearing about it?",
    "Is this your first time dining with us?",
  ],
  'job interview': [
    "That's interesting. Can you tell me about a challenge you faced in your previous role?",
    "What would you say are your greatest strengths?",
    "Where do you see yourself in five years?",
    "How would your colleagues describe your work style?",
    "What interests you about this position specifically?",
  ],
  'business': [
    "I see your point. What do you think about our proposed timeline?",
    "That's a reasonable request. Can we discuss the budget implications?",
    "I'm interested in your perspective on the market trends. What do you foresee?",
    "Let's explore how we can create a win-win situation for both companies.",
    "What are your thoughts on extending our partnership for another year?",
  ],
  'default': [
    "That's interesting! Tell me more.",
    "I understand. Could you elaborate on that?",
    "Thank you for sharing that with me.",
    "Let's explore that idea further.",
    "I see what you mean. How do you feel about that?",
  ]
};

// Generate a response based on user input and conversation topic
export const generateAvatarResponse = (userInput: string, topicTitle: string): string => {
  const lowerInput = userInput.toLowerCase();
  const lowerTopic = topicTitle.toLowerCase();
  
  let category = 'default';
  
  if (lowerTopic.includes('restaurant') || lowerInput.includes('food') || lowerInput.includes('order') || lowerInput.includes('eat')) {
    category = 'restaurant';
  } else if (lowerTopic.includes('job') || lowerTopic.includes('interview') || lowerInput.includes('work') || lowerInput.includes('experience')) {
    category = 'job interview';
  } else if (lowerTopic.includes('business') || lowerTopic.includes('negotiation') || lowerInput.includes('deal') || lowerInput.includes('partner')) {
    category = 'business';
  }
  
  // Select a response template based on the category
  const templates = responseTemplates[category as keyof typeof responseTemplates] || responseTemplates.default;
  
  // Pick a random response from the templates
  const randomIndex = Math.floor(Math.random() * templates.length);
  return templates[randomIndex];
};

// In a real application, this would connect to a language model or more sophisticated dialogue system
export const generateNextQuestion = (currentTopic: ConversationTopic | null): string => {
  if (!currentTopic) return "What would you like to talk about today?";
  
  switch (currentTopic.difficulty) {
    case 'beginner':
      return "Let's practice some simple everyday phrases. How are you today?";
    case 'intermediate':
      return "Let's dive a bit deeper. Could you tell me about a recent challenge you faced?";
    case 'advanced':
      return "Let's explore some complex topics. What are your thoughts on globalization and its impact on language learning?";
    default:
      return "What would you like to talk about today?";
  }
};
