
import React from 'react';
import { Languages } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useConversation } from '@/contexts/ConversationContext';

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

export default LanguageSelector;
