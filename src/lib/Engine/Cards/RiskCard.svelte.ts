import { shuffle } from '$lib';
import RiskCardsJson from '$lib/Data/riskcards.json';
import type { Attributes, Category } from '..';

interface RiskData {
  '#': string;
  Risk: string;
  Category: string;
  'Sub-category'?: string;
  S?: number;
  Q?: number;
  T?: number;
  C?: number;
  I?: number;
  P?: number;
  E?: number;
  X?: number;
  Mitigation?: string;
  Description: string;
}

interface GameStage {
  initation: boolean;
  planning: boolean;
  execution: boolean;
  closing: boolean;
}

export interface RiskCard {
  id: string;
  title: string;
  description: string;
  category: Category;
  subcategory?: string;
  attributes: Attributes;
  mitigation?: string[];
  gameStage: GameStage;
  timeout?: number;
}

export class RiskHand {
  readonly riskCards = RiskCardJson();

  handCards: RiskCard[] = $state([]);

  usedCards: RiskCard[] = $state([]);

  RISKCARDTIMEOUTROUNDS = 3;

  createHand(stage: number) {
    this.handCards = [];

    for (const usedCard of this.usedCards) {
      if (usedCard.timeout === 0) {
        this.usedCards = this.usedCards.filter((card) => card.id !== usedCard.id);
      }

      usedCard.timeout! -= 1;
    }

    const amount = riskCardAmount(stage);

    let filteredCards: RiskCard[] = [];
    const stageMap = {
      1: 'initation',
      2: 'planning',
      3: 'execution',
      4: 'closing'
    };

    const currentStage = stage as keyof typeof stageMap;
    const stageKey = stageMap[currentStage];

    // get all cards that match the stage
    if (stageKey) {
      filteredCards = this.riskCards.filter(
        (card) => card.gameStage[stageKey as keyof typeof card.gameStage] === true
      );
    }

    outer: while (this.handCards.length < amount!) {
      const randomIndex = Math.floor(Math.random() * filteredCards.length);

      for (const usedCard of this.usedCards) {
        if (usedCard.id === filteredCards[randomIndex].id) {
          continue outer
        }
      }

      for (const card of this.handCards) {
        if (card.id === filteredCards[randomIndex].id) {
          continue outer
        }
      }

      this.handCards.push(filteredCards[randomIndex]);
    }

    this.handCards = shuffle(this.handCards);
  }
}

function RiskCardJson(): RiskCard[] {
  const cards: RiskCard[] = [];
  const data: RiskData[] = RiskCardsJson;

  for (let i = 0; i < data.length; i++) {
    const card = {
      id: data[i]['#'],
      title: data[i].Risk,
      description: data[i].Description,
      category: data[i].Category as Category,
      subcategory: data[i]['Sub-category'],
      attributes: {
        scope: data[i].S || 0,
        quality: data[i].Q || 0,
        time: data[i].T ? data[i].T! * -1 : 0,
        cost: data[i].C ? data[i].C! * -1 : 0
      },
      mitigation: data[i].Mitigation ? data[i].Mitigation?.split(', ') : [],
      gameStage: {
        initation: !!data[i].I,
        planning: !!data[i].P,
        execution: !!data[i].E,
        closing: !!data[i].X
      }
    };

    cards.push(card);
  }

  return cards;
}

function riskCardAmount(input: number): number | undefined {
  switch (input) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return Math.random() < 0.5 ? 1 : 2;
    case 3:
      return Math.random() < 0.5 ? 2 : 3;
    case 4:
      return Math.random() < 0.5 ? 4 : 5;
    default:
      console.error('Input must be 0, 1, 2, or 3');
  }
}
