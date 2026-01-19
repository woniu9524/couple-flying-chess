import { useState, useEffect, useCallback } from 'react';
import { GameState, Player, TaskEventData } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/localStorage';
import { generateSpiralPath, generateBoardMap, calculateNewPosition } from '../utils/gameLogic';
import { DEFAULT_THEMES } from '../data/defaultThemes';

const STORAGE_KEY = 'couples-ludo-game-state';

const initialPlayers: Player[] = [
  { id: 0, name: '男方', color: '#0A84FF', step: 0, themeId: null },
  { id: 1, name: '女方', color: '#FF375F', step: 0, themeId: null }
];

export function useGameState() {
  const [state, setState] = useState<GameState>(() => {
    const saved = loadFromStorage<GameState | null>(STORAGE_KEY, null);

    if (saved) {
      return saved;
    }

    return {
      view: 'home',
      turn: 0,
      players: initialPlayers,
      themes: DEFAULT_THEMES,
      boardMap: generateBoardMap(),
      pathCoords: generateSpiralPath(),
      isRolling: false
    };
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEY, state);
  }, [state]);

  const switchView = useCallback((view: GameState['view']) => {
    setState(prev => ({ ...prev, view }));
  }, []);

  const selectTheme = useCallback((playerId: number, themeId: string) => {
    setState(prev => ({
      ...prev,
      players: prev.players.map(p =>
        p.id === playerId ? { ...p, themeId } : p
      )
    }));
  }, []);

  const startGame = useCallback(() => {
    const bothSelected = state.players.every(p => p.themeId !== null);
    if (!bothSelected) {
      return false;
    }
    setState(prev => ({ ...prev, view: 'game', turn: Math.random() < 0.5 ? 0 : 1 }));
    return true;
  }, [state.players]);

  const movePlayer = useCallback((steps: number) => {
    setState(prev => {
      const activePlayer = prev.players[prev.turn];
      const newStep = calculateNewPosition(activePlayer.step, steps);

      return {
        ...prev,
        players: prev.players.map(p =>
          p.id === activePlayer.id ? { ...p, step: newStep } : p
        )
      };
    });
  }, []);

  const endTurn = useCallback(() => {
    setState(prev => ({
      ...prev,
      turn: prev.turn === 0 ? 1 : 0,
      isRolling: false
    }));
  }, []);

  const setIsRolling = useCallback((rolling: boolean) => {
    setState(prev => ({ ...prev, isRolling: rolling }));
  }, []);

  const checkTile = useCallback((landingStep: number): TaskEventData | 'win' | null => {
    const activePlayer = state.players[state.turn];
    const opponent = state.players[state.turn === 0 ? 1 : 0];

    if (landingStep === 48) {
      return 'win';
    }

    if (landingStep !== 0 && landingStep === opponent.step) {
      const theme = state.themes.find(t => t.id === activePlayer.themeId);
      const task = theme?.tasks[Math.floor(Math.random() * theme.tasks.length)] || '';

      return {
        type: 'collision',
        initiatorPlayerId: activePlayer.id,
        executorPlayerId: opponent.id,
        title: '亲密追尾',
        subtitle: `任务来自「${theme?.name || ''}」`,
        icon: 'handshake',
        color: 'text-yellow-400',
        task,
        taskSourceId: activePlayer.themeId || ''
      };
    }

    const tileType = state.boardMap[landingStep];

    if (tileType === 'lucky') {
      const theme = state.themes.find(t => t.id === activePlayer.themeId);
      const task = theme?.tasks[Math.floor(Math.random() * theme.tasks.length)] || '';

      return {
        type: 'lucky',
        initiatorPlayerId: activePlayer.id,
        executorPlayerId: opponent.id,
        title: '幸运时刻',
        subtitle: `任务来自「${theme?.name || ''}」`,
        icon: 'favorite',
        color: 'text-[#FF375F]',
        task,
        taskSourceId: activePlayer.themeId || ''
      };
    }

    if (tileType === 'trap') {
      const theme = state.themes.find(t => t.id === opponent.themeId);
      const task = theme?.tasks[Math.floor(Math.random() * theme.tasks.length)] || '';

      return {
        type: 'trap',
        initiatorPlayerId: activePlayer.id,
        executorPlayerId: activePlayer.id,
        title: '意外陷阱',
        subtitle: `任务来自「${theme?.name || ''}」`,
        icon: 'lock',
        color: 'text-[#BF5AF2]',
        task,
        taskSourceId: opponent.themeId || ''
      };
    }

    return null;
  }, [state.players, state.turn, state.themes, state.boardMap]);

  const resolveTask = useCallback((task: TaskEventData, outcome: 'accept' | 'reject') => {
    setState(prev => {
      let nextPlayers = prev.players;

      if (outcome === 'reject') {
        const backSteps = Math.floor(Math.random() * 3) + 1;
        nextPlayers = prev.players.map(p => {
          if (p.id !== task.executorPlayerId) return p;

          if (task.type === 'collision') {
            return { ...p, step: 0 };
          }

          return { ...p, step: Math.max(0, p.step - backSteps) };
        });
      }

      return {
        ...prev,
        players: nextPlayers,
        turn: prev.turn === 0 ? 1 : 0,
        isRolling: false
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState({
      view: 'home',
      turn: 0,
      players: initialPlayers,
      themes: DEFAULT_THEMES,
      boardMap: generateBoardMap(),
      pathCoords: generateSpiralPath(),
      isRolling: false
    });
  }, []);

  return {
    state,
    switchView,
    selectTheme,
    startGame,
    movePlayer,
    endTurn,
    setIsRolling,
    checkTile,
    resolveTask,
    resetGame
  };
}
