
import React from 'react';
import { useConversation } from '@/contexts/ConversationContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

export default LevelSelector;
