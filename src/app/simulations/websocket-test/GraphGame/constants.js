import { PLAYER, SELECTION } from '@/app/simulations/websocket-test/protocol';

// Client-only reducer actions; never sent to or received from the server.
export const LOCAL_ACTION = Object.freeze({
  SET_VIEWING_TURN: 'SET_VIEWING_TURN',
});

export const PLAYER_COLORS = {
  [PLAYER.ONE]: {
    base: 'bg-red-500',
    [SELECTION.ATTACK]: 'bg-amber-500',
    [SELECTION.DEFEND]: 'bg-yellow-200',
  },
  [PLAYER.TWO]: {
    base: 'bg-blue-500',
    [SELECTION.ATTACK]: 'bg-lime-600',
    [SELECTION.DEFEND]: 'bg-cyan-200',
  },
  neutral: {
    base: 'bg-white',
  },
};
