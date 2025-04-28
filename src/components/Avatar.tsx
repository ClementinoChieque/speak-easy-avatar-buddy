
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type AvatarProps = {
  isSpeaking: boolean;
  emotion?: 'neutral' | 'happy' | 'thinking' | 'confused';
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ 
  isSpeaking, 
  emotion = 'neutral',
  className 
}) => {
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate avatar loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Map emotions to expressions
  const getExpressionClass = () => {
    switch (emotion) {
      case 'happy':
        return 'before:border-b-[3px] before:border-black before:bottom-[35%]';
      case 'thinking':
        return 'before:border-t-[3px] before:border-black before:bottom-[40%]';
      case 'confused':
        return 'before:border-t-[3px] before:border-b-[3px] before:border-black before:bottom-[40%] before:rotate-12';
      default:
        return 'before:border-none';
    }
  };

  // Handle avatar animation state
  const avatarStateClass = cn(
    'relative w-64 h-64 rounded-full bg-gradient-to-br from-avatar to-avatar-secondary flex items-center justify-center transition-all duration-300',
    isSpeaking ? 'animate-avatar-talk' : isLoaded ? 'animate-avatar-bounce' : '',
    className
  );

  // Face features
  const eyesClass = 'absolute w-10 h-12 rounded-full bg-white flex items-center justify-center';
  const pupilClass = cn(
    'w-5 h-5 rounded-full bg-black',
    emotion === 'confused' ? 'animate-pulse' : ''
  );
  const mouthClass = cn(
    'absolute w-20 h-10 rounded-full bg-white bottom-[25%] flex items-center justify-center',
    isSpeaking ? 'animate-avatar-talk' : ''
  );

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        ref={avatarRef} 
        className={avatarStateClass}
        onClick={() => toast({
          title: "Avatar clicked!",
          description: "The avatar is here to help you practice English.",
        })}
      >
        {/* Eyes */}
        <div className={cn(eyesClass, "left-[25%] top-[35%]")}>
          <div className={pupilClass}></div>
        </div>
        <div className={cn(eyesClass, "right-[25%] top-[35%]")}>
          <div className={pupilClass}></div>
        </div>
        
        {/* Expression */}
        <div className={cn(
          "absolute w-24 h-4",
          "before:content-[''] before:absolute before:w-full before:h-2",
          getExpressionClass()
        )}></div>
        
        {/* Mouth */}
        <div className={mouthClass}>
          <div className="w-16 h-1 rounded-full bg-black"></div>
        </div>
      </div>
      <div className="mt-4 text-center">
        {!isLoaded && (
          <p className="text-gray-400 animate-pulse">Loading avatar...</p>
        )}
      </div>
    </div>
  );
};

export default Avatar;
