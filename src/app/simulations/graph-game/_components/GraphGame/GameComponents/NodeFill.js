import { useRef } from 'react';
import { Sword, Shield } from 'lucide-react';
import { useMatchState } from '@/app/simulations/graph-game/_state/GameProvider';
import { PLAYER_COLORS } from '@/app/simulations/graph-game/_components/GraphGame/constants';
import { PLAYER, SELECTION } from '@/app/simulations/graph-game/_lib/protocol';

const ICONS = {
  [SELECTION.ATTACK]: { Icon: Sword, label: 'Attack' },
  [SELECTION.DEFEND]: { Icon: Shield, label: 'Defend' },
};

// Which half of the node each player's fill takes when both players picked it.
const HALF_CLIP = {
  [PLAYER.ONE]: 'inset(0 0 50% 0)',
  [PLAYER.TWO]: 'inset(50% 0 0 0)',
};

const fillKey = (player) => `fill-${player}`;
const iconKey = (player, selection) => `${player}-${selection}`;

// Returns the keys that just appeared on the turn being viewed, so only those animate. Everything
// already on screen when the node mounts or the viewed turn changes (loading, reconnecting, stepping
// through the log) shows without animating. A key stays in the set until it disappears, so its
// animation isn't cut short by a re-render. It can animate again if it is picked again later.
function useNewKeys(turn, keys) {
  const seen = useRef(null);
  const fresh = useRef(new Set());

  if (seen.current === null || seen.current.turn !== turn) {
    fresh.current = new Set();
  } else {
    for (const key of keys) if (!seen.current.keys.has(key)) fresh.current.add(key);
    for (const key of fresh.current) if (!keys.includes(key)) fresh.current.delete(key);
  }
  seen.current = { turn, keys: new Set(keys) };
  return fresh.current;
}

// The inside of a node for the viewed turn. A selected node is filled with the selecting player's
// light colour (split in half if both players picked it) and shows a sword or shield per selection.
// Otherwise it shows the owner's colour. A new selection's fill grows out from the centre and its
// icon grows with it.
export default function NodeFill({ nodeId, owner }) {
  const match = useMatchState();
  // There is no turn to show while state is being reset, e.g. when the room closes and the board
  // is still on screen until navigation to the lobby finishes. Treat that as nothing selected.
  const selections = match.log[match.viewingTurn - 1]?.selections;

  const picks = !selections ? [] : [PLAYER.ONE, PLAYER.TWO].flatMap((player) =>
    [SELECTION.ATTACK, SELECTION.DEFEND]
      .filter((selection) => selections[player][selection] === nodeId)
      .map((selection) => ({ player, selection }))
  );
  const pickers = [...new Set(picks.map(({ player }) => player))];
  const ownerFill = (PLAYER_COLORS[owner] ?? PLAYER_COLORS.neutral).base;

  const fresh = useNewKeys(match.viewingTurn, [
    ...pickers.map(fillKey),
    ...picks.map(({ player, selection }) => iconKey(player, selection)),
  ]);

  // A fill that is growing goes on top. When both players picked the node, each fill is cut to its
  // half, except one sitting under a growing fill: it stays whole so the new colour grows over it
  // rather than over the owner's colour.
  const fills = [...pickers].sort((a, b) => fresh.has(fillKey(a)) - fresh.has(fillKey(b)));
  const clipFor = (player) =>
    pickers.length > 1 && !pickers.some((other) => other !== player && fresh.has(fillKey(other)))
      ? HALF_CLIP[player]
      : undefined;

  return (
    <div className="relative h-full w-full rounded-full overflow-hidden">
      <div className={`absolute inset-0 ${ownerFill}`} />
      {fills.map((player) => (
        <div
          key={fillKey(player)}
          className="absolute inset-0"
          style={{ clipPath: clipFor(player) }}
        >
          <div
            className={`h-full w-full rounded-full ${PLAYER_COLORS[player].light} ${
              fresh.has(fillKey(player)) ? 'motion-safe:animate-selection-fill' : ''
            }`}
          />
        </div>
      ))}
      <div className="relative flex h-full items-center justify-center gap-0.5">
        {picks.map(({ player, selection }) => {
          const { Icon, label } = ICONS[selection];
          const key = iconKey(player, selection);
          return (
            <Icon
              key={key}
              size={22}
              strokeWidth={2.5}
              className={`${PLAYER_COLORS[player].icon} ${
                fresh.has(key) ? 'motion-safe:animate-selection-icon' : ''
              }`}
              aria-label={`${player} ${label}`}
            />
          );
        })}
      </div>
    </div>
  );
}
