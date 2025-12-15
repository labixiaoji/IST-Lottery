import { create } from 'zustand';

interface SoundState {
  isPlaying: boolean;
  currentAudio: HTMLAudioElement | null;
  play: (url: string) => void;
  stop: () => void;
}

export const useSoundStore = create<SoundState>((set, get) => ({
  isPlaying: false,
  currentAudio: null,
  
  play: (url: string) => {
    const { currentAudio } = get();
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    const audio = new Audio(url);
    
    // Add event listeners to update state when audio ends
    audio.addEventListener('ended', () => {
        set({ isPlaying: false, currentAudio: null });
    });
    
    // Also handle errors so we don't get stuck in "playing" state
    audio.addEventListener('error', () => {
         set({ isPlaying: false, currentAudio: null });
    });

    audio.play().catch(console.warn);
    set({ currentAudio: audio, isPlaying: true });
  },

  stop: () => {
    const { currentAudio } = get();
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    set({ currentAudio: null, isPlaying: false });
  }
}));
