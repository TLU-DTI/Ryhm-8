import type { Engine } from './engine.svelte';
import type { RiskLog } from './risklog.svelte';
import type { TurnStatus } from './turn.svelte';
import type { Notification } from './notification.svelte';
import type { RiskCard } from './Cards/RiskCard.svelte';
import type { MitiCard } from './Cards/MitiCard.svelte';

interface SaveData {
  objective: {
    scope: number;
    quality: number;
    time: number;
    cost: number;
  };
  timeline: {
    stage: number;
    round: number;
    barPos: number;
  };
  turn: {
    status: TurnStatus;
  };
  riskHand: {
    handCards: RiskCard[];
  };
  mitiHand: {
    handCards: MitiCard[];
    usedCards: MitiCard[];
  };
  logs: RiskLog[];
  notification?: Notification[];
}

export class SaveGame {
  private _engine: Engine;

  constructor(engine: Engine) {
    this._engine = engine;
  }

  save() {
    const data: SaveData = {
      objective: {
        scope: this._engine.objective.scope,
        quality: this._engine.objective.quality,
        time: this._engine.objective.time,
        cost: this._engine.objective.cost,
      },
      timeline: {
        stage: this._engine.timeline.stage,
        round: this._engine.timeline.round,
        barPos: this._engine.timeline.barPos,
      },
      turn: {
        status: this._engine.turn.status
      },
      riskHand: {
        handCards: this._engine.riskHand.handCards
      },
      mitiHand: {
        handCards: this._engine.mitihand.handCards,
        usedCards: this._engine.mitihand.usedCards,
      },
      logs: this._engine.risklog.riskLogs,
      notification: this._engine.notification.notifications,
    };

    localStorage.setItem('save', JSON.stringify(data));
  }

  load() { }
}
