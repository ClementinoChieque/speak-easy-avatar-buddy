
import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onResult?: (transcript: string) => void;
  onEnd?: () => void;
  language?: string;
}

interface UseSpeechRecognitionReturn {
  transcript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
  isSpeechSupported: boolean;
}

const useSpeechRecognition = ({
  onResult,
  onEnd,
  language = 'en-US',
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(false);
  
  // Store recognition instance in a ref
  const recognitionRef = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    // Check browser compatibility
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      setIsSpeechSupported(false);
      return null;
    }
    
    setIsSpeechSupported(true);
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const transcriptText = result[0].transcript;
      
      setTranscript(transcriptText);
      if (onResult) onResult(transcriptText);
    };
    
    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      console.error('Speech recognition error:', event.error);
    };
    
    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      } else if (onEnd) {
        onEnd();
      }
    };
    
    return recognition;
  }, [language, onResult, onEnd, isListening]);

  const startListening = useCallback(() => {
    setError(null);
    const recognition = recognitionRef();
    
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        console.error('Error starting speech recognition:', err);
        setError('Error starting speech recognition.');
      }
    }
  }, [recognitionRef]);

  const stopListening = useCallback(() => {
    const recognition = recognitionRef();
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognitionRef]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  useEffect(() => {
    // Check if speech recognition is supported when the hook mounts
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechSupported(!!SpeechRecognition);
    
    // Cleanup function - ensure speech recognition is stopped
    return () => {
      const recognition = recognitionRef();
      if (recognition && isListening) {
        recognition.stop();
      }
    };
  }, [recognitionRef, isListening]);

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    error,
    isSpeechSupported
  };
};

export default useSpeechRecognition;
