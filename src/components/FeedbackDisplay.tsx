
import React from 'react';
import { useConversation, FeedbackType } from '@/contexts/ConversationContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Lightbulb, BookOpen, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeedbackDisplay: React.FC = () => {
  const { feedback } = useConversation();

  if (feedback.length === 0) {
    return null;
  }

  // Get icon based on feedback type
  const getFeedbackIcon = (type: FeedbackType['type']) => {
    switch (type) {
      case 'pronunciation':
        return <BookOpen className="h-4 w-4" />;
      case 'grammar':
        return <AlertCircle className="h-4 w-4" />;
      case 'vocabulary':
        return <Lightbulb className="h-4 w-4" />;
      case 'fluency':
        return <BookOpen className="h-4 w-4" />;
      case 'praise':
        return <ThumbsUp className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  // Get variant based on feedback type
  const getFeedbackVariant = (type: FeedbackType['type']) => {
    switch (type) {
      case 'pronunciation':
        return 'bg-blue-50 border-blue-200';
      case 'grammar':
        return 'bg-amber-50 border-amber-200';
      case 'vocabulary':
        return 'bg-green-50 border-green-200';
      case 'fluency':
        return 'bg-purple-50 border-purple-200';
      case 'praise':
        return 'bg-emerald-50 border-emerald-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-2 animate-fade-in">
      {feedback.map((item, index) => (
        <Alert 
          key={index} 
          className={cn(
            "border transition-all", 
            getFeedbackVariant(item.type)
          )}
        >
          <div className="flex items-center gap-2">
            {getFeedbackIcon(item.type)}
            <AlertTitle className="capitalize font-medium">
              {item.type}
            </AlertTitle>
          </div>
          <AlertDescription>
            {item.message}
            {item.suggestion && (
              <p className="text-sm font-medium mt-2">
                <span className="font-bold">Suggestion:</span> {item.suggestion}
              </p>
            )}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default FeedbackDisplay;
