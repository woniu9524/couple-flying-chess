interface WinModalProps {
  isOpen: boolean;
  winnerName: string;
  onRestart: () => void;
}

export function WinModal({ isOpen, winnerName, onRestart }: WinModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95">
      <div className="text-center animate-pulse">
        <div className="text-7xl mb-6">👑</div>
        <h2 className="text-5xl font-bold text-white mb-2">{winnerName}</h2>
        <p className="text-gray-400 mb-10">今晚你是赢家</p>
        <button
          className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full ios-btn"
          onClick={onRestart}
        >
          再来一局
        </button>
      </div>
    </div>
  );
}
