import { PLAYER } from '@/app/simulations/websocket-test/protocol';

// Client-only reducer actions; never sent to or received from the server.
export const LOCAL_ACTION = Object.freeze({
  SET_VIEWING_TURN: 'SET_VIEWING_TURN',
});

export const PLAYER_COLORS = {
  [PLAYER.ONE]: {
    base: 'bg-red-500',
    icon: 'text-red-500',
    light: 'bg-red-200',
  },
  [PLAYER.TWO]: {
    base: 'bg-blue-500',
    icon: 'text-blue-500',
    light: 'bg-blue-200',
  },
  neutral: {
    base: 'bg-white',
  },
};
