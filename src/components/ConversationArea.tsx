
import React, { useState, useEffect, useRef } from 'react';
import { useConversation } from '@/contexts/ConversationContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, RefreshCw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import { useToast } from '@/components/ui/use-toast';
import { generateFeedback } from '@/lib/feedbackGenerator';
import { generateAvatarResponse } from '@/lib/dialogueManager';

const ConversationArea: React.FC = () => {
  const { 
    messages, 
    addMessage, 
    userInput, 
    setUserInput, 
    addFeedback,
    setIsAvatarSpeaking,
    resetConversation,
    currentTopic
  } = useConversation();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputDisabled, setInputDisabled] = useState(false);

  // Initialize speech recognition
  const { 
    transcript, 
    isListening, 
    startListening, 
    stopListening, 
    resetTranscript, 
    isSpeechSupported 
  } = useSpeechRecognition({
    onResult: (result) => {
      setUserInput(result);
    }
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start conversation with initial prompt if topic changes
  useEffect(() => {
    if (currentTopic && messages.length === 0) {
      resetConversation();
    }
  }, [currentTopic, messages.length, resetConversation]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Stop listening if active
    if (isListening) {
      stopListening();
    }
    
    const finalInput = userInput;
    setInputDisabled(true);
    
    // Add user message
    addMessage('user', finalInput);
    setUserInput('');
    resetTranscript();
    
    // Generate feedback based on user input
    setTimeout(() => {
      const feedback = generateFeedback(finalInput);
      if (feedback) {
        addFeedback(feedback);
      }
    }, 1000);
    
    // Generate avatar response
    setTimeout(() => {
      setIsAvatarSpeaking(true);
      
      setTimeout(() => {
        const response = generateAvatarResponse(finalInput, currentTopic?.title || '');
        addMessage('avatar', response);
        setIsAvatarSpeaking(false);
        setInputDisabled(false);
      }, 1500);
    }, 2000);
  };

  // Handle microphone toggle
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      if (!isSpeechSupported) {
        toast({
          title: "Speech recognition not supported",
          description: "Your browser doesn't support speech recognition.",
          variant: "destructive"
        });
        return;
      }
      resetTranscript();
      startListening();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full h-[500px] bg-white rounded-lg shadow-md">
      {/* Message area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.speaker === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.speaker === 'user'
                    ? 'bg-learner-accent text-white'
                    : 'bg-avatar-accent text-white'
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t p-4 flex gap-2 items-center">
        <Button
          variant="outline"
          size="icon"
          className={isListening ? "bg-red-100 text-red-500" : ""}
          onClick={toggleListening}
          title={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>
        <Input
          placeholder={isListening ? "Speak now..." : "Type your message..."}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 ${isListening ? "bg-gray-50" : ""}`}
          disabled={inputDisabled || isListening}
        />
        <Button onClick={handleSendMessage} disabled={inputDisabled || !userInput.trim()}>
          <Send size={18} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={resetConversation}
          title="Reset conversation"
        >
          <RefreshCw size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ConversationArea;
