import { PLAYER, USER_TYPE } from '@/app/simulations/graph-game/_lib/protocol';

// "player1" -> "Player 1", "spectator2" -> "Spectator 2".
export function formatPlayerOrder(playerOrder) {
  const match = /^(player|spectator)(\d+)$/.exec(playerOrder ?? '');
  if (!match) return playerOrder ?? '';
  return `${match[1] === USER_TYPE.PLAYER ? 'Player' : 'Spectator'} ${match[2]}`;
}

export function isSpectatorOrder(playerOrder) {
  return Boolean(playerOrder?.startsWith(USER_TYPE.SPECTATOR));
}

// Client-only reducer actions; never sent to or received from the server.
export const LOCAL_ACTION = Object.freeze({
  SET_VIEWING_TURN: 'SET_VIEWING_TURN',
  CLEAR_JOIN_ERROR: 'CLEAR_JOIN_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
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
