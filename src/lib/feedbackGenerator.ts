
import { FeedbackType } from '@/contexts/ConversationContext';

// Simple grammar rules to check
const grammarRules = [
  { pattern: /i (is|am|are) /i, correction: 'I am', type: 'grammar' },
  { pattern: /you (is|am) /i, correction: 'you are', type: 'grammar' },
  { pattern: /he (am|are) /i, correction: 'he is', type: 'grammar' },
  { pattern: /she (am|are) /i, correction: 'she is', type: 'grammar' },
  { pattern: /they (is|am) /i, correction: 'they are', type: 'grammar' },
  { pattern: /we (is|am) /i, correction: 'we are', type: 'grammar' },
];

// Vocabulary improvements
const vocabularyImprovements = [
  { pattern: /good/i, suggestion: 'excellent, great, wonderful', type: 'vocabulary' },
  { pattern: /bad/i, suggestion: 'poor, terrible, unpleasant', type: 'vocabulary' },
  { pattern: /big/i, suggestion: 'large, enormous, substantial', type: 'vocabulary' },
  { pattern: /small/i, suggestion: 'tiny, compact, miniature', type: 'vocabulary' },
];

// Praise templates for good responses
const praiseTemplates = [
  "Well done! Your sentence structure is excellent.",
  "Great job using that vocabulary correctly!",
  "Your pronunciation sounds very natural.",
  "Excellent use of grammar in that sentence!",
  "You're expressing yourself very clearly!",
];

// Generate feedback based on user input
export const generateFeedback = (userInput: string): Omit<FeedbackType, 'id'> | null => {
  // Return null sometimes to simulate not always giving feedback
  if (Math.random() < 0.25 && userInput.length > 20) {
    return null;
  }

  // Check grammar rules
  for (const rule of grammarRules) {
    if (rule.pattern.test(userInput)) {
      return {
        type: 'grammar',
        message: `I noticed a small grammar issue in your sentence.`,
        suggestion: `Try using "${rule.correction}" instead.`
      };
    }
  }

  // Check vocabulary improvements
  for (const vocab of vocabularyImprovements) {
    if (vocab.pattern.test(userInput)) {
      return {
        type: 'vocabulary',
        message: `You could use more varied vocabulary here.`,
        suggestion: `Instead of "${vocab.pattern.source}", try: ${vocab.suggestion}`
      };
    }
  }

  // Check for very short responses
  if (userInput.split(' ').length < 3) {
    return {
      type: 'fluency',
      message: 'Try to provide longer responses to practice more.',
      suggestion: 'Expand your answer with details or explanations.'
    };
  }

  // Provide positive reinforcement occasionally
  if (Math.random() < 0.4 && userInput.length > 15) {
    const randomIndex = Math.floor(Math.random() * praiseTemplates.length);
    return {
      type: 'praise',
      message: praiseTemplates[randomIndex]
    };
  }

  return null;
};
