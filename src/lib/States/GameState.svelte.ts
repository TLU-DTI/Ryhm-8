import type { ICard } from '$lib/Cards/MitigationCards.svelte';
import type { IRiskCard }  from '$lib/Cards/RiskCards.svelte';
import type { IRiskLog } from '$lib/States/RiskLogState.svelte';

interface IObjective {
  scope: number;
  quality: number;
  time: number;
  cost: number;
}

interface IManager {
  name: string;
  message: string;
}
export interface IGameState {
  objectives: IObjective;
  mitigationCards: ICard[];
  riskCards: IRiskCard[];
  manager: IManager;
  logs: IRiskLog[];
  timelineStage: number; // 0 = initation, 1 = planning, 2 = execution, 3 = closing
  round: number;
}

export interface ISaveGame {
  save: IGameState | null;
  saveGame: (state: IGameState) => void;
  loadGame: () => IGameState | null;
  clearSave: () => void;
}

export const GameState = $state<IGameState>({
  objectives: {
    scope: 100,
    quality: 100,
    time: 100,
    cost: 100
  },
  mitigationCards: [],
  riskCards: [],
  manager: [
    {
      name: 'Big Bousman',
      message: 'erro'
    }
  ],
  logs: [],
  timelineStage: 0,
  round: 0
});

export function SaveGameState(): ISaveGame {
  const storageKey = 'game_save';

  let save: IGameState | null = null;

  function saveGame(state: IGameState) {
    const parsedData = JSON.stringify(state);
    localStorage.setItem(storageKey, parsedData);
  }

  function loadGame(): IGameState | null {
    const gameLoadData = localStorage.getItem(storageKey);
    if (gameLoadData) {
      const parsedData = JSON.parse(gameLoadData);
      return parsedData;
    } else {
      return null;
    }
  }

  function clearSave() {
    localStorage.removeItem(storageKey);
    save = null;
  }

  //const save: IGameState | null = loadGame() ?? null;

  return {
    save: save,
    saveGame,
    loadGame,
    clearSave
  };
}

export default {
  GameState,
  SaveGameState
};
