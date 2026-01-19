import { TileType, PathCoord, Player } from '../types';
import { Sparkles, Bomb, Trophy, User, UserRound } from 'lucide-react';

interface GameBoardProps {
  boardMap: TileType[];
  pathCoords: PathCoord[];
  players: Player[];
  currentTurn: number;
}

export function GameBoard({ boardMap, pathCoords, players, currentTurn }: GameBoardProps) {
  const coordToIndex: Record<string, number> = {};
  pathCoords.forEach((coord, idx) => {
    coordToIndex[`${coord.r},${coord.c}`] = idx;
  });

  const renderTile = (r: number, c: number) => {
    const idx = coordToIndex[`${r},${c}`];
    const type = boardMap[idx];
    const isStart = idx === 0;
    const isEnd = idx === 48;

    let className = 'relative w-full h-full rounded-xl flex items-center justify-center transition-colors duration-300';

    if (isStart) {
      className += ' bg-white/10 border border-white/20';
    } else if (isEnd) {
      className += ' bg-white shadow-lg shadow-white/20';
    } else if (type === 'lucky') {
      className += ' bg-[#FF375F]/20';
    } else if (type === 'trap') {
      className += ' bg-[#BF5AF2]/20';
    } else {
      className += ' bg-[#2C2C2E]';
    }

    return (
      <div key={`${r}-${c}`} className={className}>
        {isStart && <span className="text-[8px] font-bold text-gray-400">START</span>}
        {isEnd && <Trophy className="text-[#FFD700]" size={18} />}
        {!isStart && !isEnd && type === 'lucky' && (
          <Sparkles className="text-[#FF375F]" size={14} fill="currentColor" />
        )}
        {!isStart && !isEnd && type === 'trap' && (
          <Bomb className="text-[#BF5AF2]" size={14} />
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[360px] aspect-square relative">
      <div className="absolute inset-0 grid grid-cols-7 gap-1.5">
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => renderTile(r, c))
        )}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {players.map((player) => {
          const coord = pathCoords[player.step];
          const playersOnSameTile = players.filter(p => p.step === player.step);
          const isOverlapping = playersOnSameTile.length > 1;
          const indexOnTile = playersOnSameTile.findIndex(p => p.id === player.id);
          
          let translate = 'translate(0, 0)';
          if (isOverlapping) {
            translate = indexOnTile === 0 ? 'translate(-4px, -4px)' : 'translate(4px, 4px)';
          }

          const isActive = player.id === currentTurn;
          const isMale = player.id === 0;
          
          return (
             <div
              key={player.id}
              className="absolute w-[14.28%] h-[14.28%] flex items-center justify-center transition-all duration-500 ease-in-out z-20"
              style={{
                top: `${(coord.r / 7) * 100}%`,
                left: `${(coord.c / 7) * 100}%`,
              }}
            >
              <div 
                className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg transition-transform duration-300 ${isActive ? 'avatar-pulse scale-110' : ''}`}
                style={{ 
                  backgroundColor: player.color,
                  transform: translate,
                  border: '2px solid white'
                }}
              >
                {isMale ? (
                  <User className="text-white w-5 h-5" />
                ) : (
                  <UserRound className="text-white w-5 h-5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
