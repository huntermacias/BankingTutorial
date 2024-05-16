import { create } from 'zustand'; 

type NewAccountState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useNewAccount = create<NewAccountState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));