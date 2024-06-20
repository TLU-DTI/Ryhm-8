import type { IMitigationCard } from '$lib/Cards/MitigationCards.svelte';
import type { IRiskCard }  from '$lib/Cards/RiskCards.svelte';
import type { IRiskLog } from '$lib/States/RiskLogState.svelte';

export interface IObjective {
  scope: number;
  quality: number;
  time: number;
  cost: number;
}

interface IManager {
  title: string;
  message: string;
  name: string;
}
export interface IGameState {
  objectives: IObjective;
  mitigationCards: IMitigationCard[];
  riskCards: IRiskCard[];
  manager: IManager[];
  logs: IRiskLog[];
  timelineStage: number; // 0 = initation, 1 = planning, 2 = execution, 3 = closing
  round: number;
  position: number;
}

export interface ISaveGame {
  save: IGameState | null;
  saveGame: (state: IGameState) => void;
  loadGame: () => IGameState | null;
  clearSave: () => void;
  updateStats: (cost: number, quality: number, scope: number, time: number) => void;
  stats: IObjective;
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
  manager: 
    {
      title: 'Big Bousman',
      message: 'erro',
      name: 'Manager'
    }
  ,
  logs: [],
  timelineStage: 0,
  round: 0
});

export function SaveGameState(): ISaveGame {
  const storageKey = 'game_save';
  //let stats: IObjective = $state() as IObjective;
  const stats: IObjective = GameState.objectives; 

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

  function updateStats(cost: number, quality: number, scope: number, time: number){
    //console.log(cost + " gamestate");
    
    stats.cost = cost;
    stats.quality = quality;
    stats.scope = scope;
    stats.time = time;

    //console.log(stats.cost + " gamestate2");
    
  }

  //const save: IGameState | null = loadGame() ?? null;

  return {
    save: save,
    saveGame,
    loadGame,
    clearSave,
    updateStats,
    get stats(){
      return stats;
    }
  };
}

export default {
  GameState,
  SaveGameState
};
