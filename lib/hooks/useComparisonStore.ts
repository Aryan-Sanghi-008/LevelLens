import { create } from 'zustand';
import { ComparisonSlot } from '@/types';

interface ComparisonStore {
  slots: ComparisonSlot[];
  addToComparison: (slot: ComparisonSlot) => void;
  removeFromComparison: (index: number) => void;
  clearComparison: () => void;
  isInComparison: (slot: ComparisonSlot) => boolean;
}

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  slots: [],
  
  addToComparison: (slot) => {
    const currentSlots = get().slots;
    if (currentSlots.length >= 3) return;
    
    // Prevent exact duplicates
    const isDuplicate = currentSlots.some(
      s => s.companyId === slot.companyId && s.level === slot.level && s.role === slot.role
    );
    if (isDuplicate) return;

    set({ slots: [...currentSlots, slot] });
  },
  
  removeFromComparison: (index) => {
    set((state) => ({
      slots: state.slots.filter((_, i) => i !== index)
    }));
  },
  
  clearComparison: () => {
    set({ slots: [] });
  },
  
  isInComparison: (slot) => {
    return get().slots.some(
      s => s.companyId === slot.companyId && s.level === slot.level && s.role === slot.role
    );
  }
}));
