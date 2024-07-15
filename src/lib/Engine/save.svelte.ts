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

interface Expiry {
  expiry: number;
}

export class SaveGame {
  private _engine: Engine;

  get status() {
    return !!localStorage.getItem('save')
  }

  readonly SAVETIME = 1000 * 60 * 60; // 1 hour

  constructor(engine: Engine) {
    this._engine = engine;
  }

  save() {
    const data: SaveData & Expiry = {
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

      expiry: new Date().getTime() + this.SAVETIME
    };

    localStorage.setItem('save', JSON.stringify(data));
  }

  load() {
    const data = localStorage.getItem('save')

    if (!data) {
      return;
    }

    const parsedData: SaveData & Expiry = JSON.parse(data);
    if (new Date().getTime() > parsedData.expiry) {
      this.clear();
      return;
    }

    this._engine.objective.scopeTo = parsedData.objective.scope;
    this._engine.objective.qualityTo = parsedData.objective.quality;
    this._engine.objective.timeTo = parsedData.objective.time;
    this._engine.objective.costTo = parsedData.objective.cost;
    this._engine.timeline.stage = parsedData.timeline.stage;
    this._engine.timeline.round = parsedData.timeline.round;
    this._engine.timeline.barPosTo = parsedData.timeline.barPos;
    this._engine.turn.status = parsedData.turn.status;
    this._engine.riskHand.handCards = parsedData.riskHand.handCards;
    this._engine.mitihand.handCards = parsedData.mitiHand.handCards;
    this._engine.mitihand.usedCards = parsedData.mitiHand.usedCards;
    this._engine.risklog.riskLogs = parsedData.logs;
    this._engine.notification.notifications = parsedData.notification;
  }

  clear() {
    localStorage.removeItem('save');
  }
}
