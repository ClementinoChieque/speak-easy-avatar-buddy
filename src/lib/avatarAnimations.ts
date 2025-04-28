
// Define different avatar animations and expressions
export type AvatarEmotion = 'neutral' | 'happy' | 'thinking' | 'confused';

export type AnimationSequence = {
  emotion: AvatarEmotion;
  duration: number;
};

// Predefined animation sequences
export const animationSequences = {
  greeting: [
    { emotion: 'happy', duration: 1000 },
    { emotion: 'neutral', duration: 500 },
    { emotion: 'happy', duration: 1000 },
  ],
  thinking: [
    { emotion: 'thinking', duration: 800 },
    { emotion: 'neutral', duration: 400 },
    { emotion: 'thinking', duration: 1200 },
  ],
  confused: [
    { emotion: 'confused', duration: 700 },
    { emotion: 'thinking', duration: 1000 },
    { emotion: 'neutral', duration: 500 },
  ],
  happy: [
    { emotion: 'happy', duration: 1500 },
    { emotion: 'neutral', duration: 300 },
  ],
};

// Play an animation sequence on demand
export const playAnimationSequence = (
  sequence: AnimationSequence[],
  onEmotionChange: (emotion: AvatarEmotion) => void
): Promise<void> => {
  return new Promise((resolve) => {
    let currentIndex = 0;

    const playNext = () => {
      if (currentIndex >= sequence.length) {
        resolve();
        return;
      }

      const { emotion, duration } = sequence[currentIndex];
      onEmotionChange(emotion);

      setTimeout(() => {
        currentIndex++;
        playNext();
      }, duration);
    };

    playNext();
  });
};

// Generate a random emotion
export const getRandomEmotion = (): AvatarEmotion => {
  const emotions: AvatarEmotion[] = ['neutral', 'happy', 'thinking', 'confused'];
  const randomIndex = Math.floor(Math.random() * emotions.length);
  return emotions[randomIndex];
};
