import { Theme } from '../../types';

interface ThemesViewProps {
  themes: Theme[];
}

export function ThemesView({ themes }: ThemesViewProps) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-24">
      <h2 className="text-2xl font-bold mb-6 text-white">任务主题库</h2>
      <div className="space-y-3">
        {themes.map(theme => (
          <div key={theme.id} className="ios-card p-4 border border-white/5">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white font-semibold">{theme.name}</div>
                <div className="text-xs text-gray-500 mt-1">{theme.desc}</div>
              </div>
              <div className="bg-white/10 px-2 py-1 rounded text-[10px] text-gray-300">
                {theme.tasks.length}卡
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
