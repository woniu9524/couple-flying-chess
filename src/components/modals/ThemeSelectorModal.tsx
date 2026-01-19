import { Theme } from '../../types';
import { Check } from 'lucide-react';
import { useEffect } from 'react';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  themes: Theme[];
  selectedThemeId: string | null;
  onSelect: (themeId: string) => void;
  onClose: () => void;
}

export function ThemeSelectorModal({
  isOpen,
  themes,
  selectedThemeId,
  onSelect,
  onClose
}: ThemeSelectorModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] rounded-t-[32px] p-6 transform transition-transform duration-300">
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6" />
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">选择主题</h3>
        </div>
        <div className="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar pb-8">
          {themes.map(theme => (
            <div
              key={theme.id}
              onClick={() => {
                onSelect(theme.id);
                onClose();
              }}
              className="p-4 bg-[#2C2C2E] rounded-xl flex justify-between items-center active:bg-[#3A3A3C] transition-colors cursor-pointer"
            >
              <span className="text-white font-medium">{theme.name}</span>
              {selectedThemeId === theme.id && (
                <Check className="text-[#0A84FF]" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
