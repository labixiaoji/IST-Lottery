import { useCallback } from 'react';
import { useLotteryStore } from '../stores/useLotteryStore';
import { useSoundStore } from '../stores/useSoundStore';

export const useSound = () => {
  const enabled = useLotteryStore(state => state.config.soundEnabled);
  const { play: playSound, stop: stopSound, isPlaying } = useSoundStore();

  const play = useCallback((url: string) => {
    if (!enabled) return;
    playSound(url);
  }, [enabled, playSound]);

  const stop = useCallback(() => {
    stopSound();
  }, [stopSound]);

  return { play, stop, isPlaying };
};
