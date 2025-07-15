import { create } from 'zustand';

type Event = {
  id: string;
  title: string;
  description: string;
  time: string;
  participants: string;
  prize: string;
  difficulty: string;
  location: string;
  highlights: string[];
  image: string;
};

type CartState = {
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (eventId: string) => void;
  clearCart: () => void;
  isEventInCart: (eventId: string) => boolean;
};

export const useCartStore = create<CartState>((set,get) => ({
  events: [],
  addEvent: (event) => set((state) => {
    // Check if event already exists in cart
    if (state.events.some(e => e.id === event.id)) {
      return state;
    }
    return { events: [...state.events, event] };
  }),
  removeEvent: (eventId) => set((state) => ({
    events: state.events.filter(event => event.id !== eventId),
  })),

  clearCart: () => set({ events: [] }),
   isEventInCart: (eventId) => get().events.some(e => e.id === eventId),
}));