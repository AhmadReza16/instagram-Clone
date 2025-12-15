import { create } from "zustand";
import { Story } from "@/types/story";

interface StoryState {
  stories: Story[];
  activeIndex: number;
  isOpen: boolean;
  open: (stories: Story[], index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  stories: [],
  activeIndex: 0,
  isOpen: false,

  open: (stories, index) =>
    set({ stories, activeIndex: index, isOpen: true }),

  close: () => set({ isOpen: false }),

  next: () =>
    set((s) => ({
      activeIndex:
        s.activeIndex + 1 < s.stories.length
          ? s.activeIndex + 1
          : s.activeIndex,
    })),

  prev: () =>
    set((s) => ({
      activeIndex:
        s.activeIndex > 0 ? s.activeIndex - 1 : 0,
    })),
}));
