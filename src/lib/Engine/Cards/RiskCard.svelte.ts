import { shuffle } from '$lib';
import RiskCardsJson from '$lib/Data/riskcards.json';
import type { Attributes, Category } from '..';

interface RiskData {
  '#': string;
  Risk: string;
  Category: Category;
  'Sub-category': string;
  S: number;
  Q: number;
  T: number;
  C: number;
  I?: number;
  P?: number;
  E?: number;
  X?: number;
  Mitigation: string;
  Description: string;
}

interface GameStage {
  initation: boolean;
  planning: boolean;
  execution: boolean;
  closing: boolean;
}

export class RiskCard {
  id: string;
  title: string;
  description: string;
  category: Category;
  subcategory: string;
  attributes: Attributes;
  mitigation: string[];
  gameStage: GameStage;

  constructor(
    id: string,
    title: string,
    description: string,
    category: Category,
    subcategory: string,
    attributes: Attributes,
    mitigation: string[],
    gameStage: GameStage
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.subcategory = subcategory;
    this.attributes = attributes;
    this.mitigation = mitigation;
    this.gameStage = gameStage;
  }
}

export class RiskHand {
  readonly riskCards = RiskCardJson();

  handCards: RiskCard[] = $state([]);

  createHand(amount: number, stage: number) {
    this.handCards = [];

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

    for (let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * filteredCards.length);
      this.handCards.push(filteredCards[randomIndex]);
    }

    this.handCards = shuffle(this.handCards);
  }
}

function RiskCardJson(): RiskCard[] {
  const cards: RiskCard[] = [];
  const data = RiskCardsJson as RiskData[];

  for (let i = 0; i < data.length; i++) {
    const card = {
      id: data[i]['#'],
      title: data[i].Risk,
      description: data[i].Description,
      category: data[i].Category,
      subcategory: data[i]['Sub-category'],
      attributes: {
        scope: data[i].S,
        quality: data[i].Q,
        time: data[i].T,
        cost: data[i].C
      },
      mitigation: data[i].Mitigation ? data[i].Mitigation.split(', ') : [],
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
