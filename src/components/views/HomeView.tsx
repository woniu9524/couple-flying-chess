import { Player, Theme } from '../../types';
import { ChevronRight, User, UserRound } from 'lucide-react';

interface HomeViewProps {
  players: Player[];
  themes: Theme[];
  onSelectTheme: (playerId: number) => void;
  onStartGame: () => void;
}

export function HomeView({ players, themes, onSelectTheme, onStartGame }: HomeViewProps) {
  return (
    <div className="flex-1 flex flex-col justify-start space-y-8 mt-10">
      <div className="text-center mb-4">
        <h2 className="text-xl text-gray-300 font-medium">配置游戏角色</h2>
        <p className="text-sm text-gray-500 mt-2">选择双方的任务主题包</p>
      </div>

      <div className="space-y-4">
        {players.map((player, idx) => {
          const theme = themes.find(t => t.id === player.themeId);
          const isMale = idx === 0;

          return (
            <div
              key={player.id}
              className="ios-card p-5 flex items-center justify-between ios-btn cursor-pointer group border border-white/5"
              onClick={() => onSelectTheme(player.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: player.color,
                    boxShadow: `0 10px 15px -3px ${player.color}30`
                  }}
                >
                  {isMale ? (
                    <User className="text-white" size={24} />
                  ) : (
                    <UserRound className="text-white" size={24} />
                  )}
                </div>
                <div>
                  <div className="text-base font-semibold text-white">
                    {player.name} (Player {player.id + 1})
                  </div>
                  <div className="text-sm font-medium text-white mt-0.5">
                    {theme?.name || '未选择主题'}
                  </div>
                </div>
              </div>
              <ChevronRight className="text-gray-600" size={20} />
            </div>
          );
        })}
      </div>

      <div className="flex-1" />

      <button
        className="w-full h-14 bg-white rounded-full text-black font-semibold text-lg shadow-lg ios-btn flex items-center justify-center gap-2 mb-8"
        onClick={onStartGame}
      >
        <span>开始游戏</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
