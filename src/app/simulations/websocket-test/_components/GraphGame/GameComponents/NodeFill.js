import { Sword, Shield } from 'lucide-react';
import { useMatchState } from '@/app/simulations/websocket-test/_components/GraphGame/gameProvider';
import { PLAYER_COLORS } from '@/app/simulations/websocket-test/_components/GraphGame/constants';
import { PLAYER, SELECTION } from '@/app/simulations/websocket-test/_lib/protocol';

const ICONS = {
  [SELECTION.ATTACK]: { Icon: Sword, label: 'Attack' },
  [SELECTION.DEFEND]: { Icon: Shield, label: 'Defend' },
};

// The inside of a node for the viewed turn. A selected node is filled with the selecting player's
// light colour (split in half if both players picked it) and shows a sword or shield per selection.
// Otherwise it shows the owner's colour.
export default function NodeFill({ nodeId, owner }) {
  const match = useMatchState();
  const selections = match.log[match.viewingTurn - 1].selections;

  const picks = [PLAYER.ONE, PLAYER.TWO].flatMap((player) =>
    [SELECTION.ATTACK, SELECTION.DEFEND]
      .filter((selection) => selections[player][selection] === nodeId)
      .map((selection) => ({ player, selection }))
  );
  const pickers = [...new Set(picks.map(({ player }) => player))];
  const ownerFill = (PLAYER_COLORS[owner] ?? PLAYER_COLORS.neutral).base;

  return (
    <div className="relative h-full w-full rounded-full overflow-hidden">
      <div className="absolute inset-0 flex flex-col">
        {pickers.length === 0
          ? <div className={`flex-1 ${ownerFill}`} />
          : pickers.map((player) => <div key={player} className={`flex-1 ${PLAYER_COLORS[player].light}`} />)}
      </div>
      <div className="relative flex h-full items-center justify-center gap-0.5">
        {picks.map(({ player, selection }) => {
          const { Icon, label } = ICONS[selection];
          return (
            <Icon
              key={`${player}-${selection}`}
              size={22}
              strokeWidth={2.5}
              className={PLAYER_COLORS[player].icon}
              aria-label={`${player} ${label}`}
            />
          );
        })}
      </div>
    </div>
  );
}
