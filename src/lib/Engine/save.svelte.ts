import type { Engine } from './engine.svelte';
import type { RiskLog } from './risklog.svelte';
import type { TurnStatus } from './turn.svelte';
import type { Notification } from './notification.svelte';
import type { RiskCard } from './Cards/RiskCard.svelte';
import type { MitiCard } from './Cards/MitiCard.svelte';

class SaveData {
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
  notification: Notification[];

  constructor(
    objective: { scope: number; quality: number; time: number; cost: number },
    timeline: { stage: number; round: number; barPos: number },
    turn: { status: TurnStatus },
    riskHand: { handCards: RiskCard[] },
    mitiHand: { handCards: MitiCard[]; usedCards: MitiCard[] },
    logs: RiskLog[],
    notification: Notification[]
  ) {
    this.objective = objective;
    this.timeline = timeline;
    this.turn = turn;
    this.riskHand = riskHand;
    this.mitiHand = mitiHand;
    this.logs = logs;
    this.notification = notification;
  }
}

export class SaveGame {
  private _engine: Engine;

  constructor(engine: Engine) {
    this._engine = engine;
  }

  save() {
    const data = {};
  }

  load() {}
}
