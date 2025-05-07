
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-2 flex items-center justify-center gap-2">
        <span className="text-avatar">SpeakEasy</span>
        <Sparkles className="h-6 w-6 text-avatar-accent animate-pulse-light" />
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Pratique inglês com IA em tempo real e desenvolva a sua habilidade.
      </p>
    </header>
  );
};

export default Header;
