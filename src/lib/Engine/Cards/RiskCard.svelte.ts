import { randomInt, shuffle } from '$lib';
import RiskCardsJson from '$lib/Data/riskcards.json';
import type { Attributes, Category } from '..';
import { enable_auto_lose } from '../setting.svelte';

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

export class RiskCard {
  id!: string;
  title!: string;
  description!: string;
  category!: Category;
  subcategory?: string;
  attributes!: Attributes;
  mitigation?: string[];
  gameStage!: GameStage;
  timeout?: number;
  impact?: number;
  probability!: number;

  get probabilityText() {
    if (this.probability === undefined) {
      return 'None';
    }

    if (this.probability > 66) {
      return 'High';
    } else if (this.probability > 33) {
      return 'Medium';
    } else {
      return 'Low';
    }
  }

  get probabilityNumber() {
    if (this.probability === undefined) {
      return 0;
    }

    if (this.probability > 66) {
      return 3;
    } else if (this.probability > 33) {
      return 2;
    } else {
      return 1;
    }
  }

  get impactNumber() {
    if (this.impact === undefined) {
      return 0;
    }

    if (this.impact > 15) {
      return 3;
    } else if (this.impact > 9) {
      return 2;
    } else {
      return 1;
    }
  }

  get compinedImpactProbability() {
    return this.impactNumber * this.probabilityNumber;
  }

  constructor(data: RiskData) {

    this.id = data['#'];
    this.title = data.Risk;
    this.description = data.Description;
    this.category = data.Category as Category;
    this.subcategory = data['Sub-category'];
    this.attributes = {
      scope: data.S || 0,
      quality: data.Q || 0,
      time: data.T ? data.T! * -1 : 0,
      cost: data.C ? data.C! * -1 : 0
    };
    this.mitigation = data.Mitigation ? data.Mitigation?.split(',').map((x) => x.trim()) : [];
    this.gameStage = {
      initation: !!data.I,
      planning: !!data.P,
      execution: !!data.E,
      closing: !!data.X
    };
  }
}

export class RiskHand {
  readonly riskCards = RiskCardJson();

  handCards: RiskCard[] = $state([]);

  usedCards: RiskCard[] = $state([]);

  RISKCARD_TIMEOUT_ROUNDS = 3;

  // less chance
  AUTOLOSE_RISKCARD_CHANCE_MULTIPLIER = 20;

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

    const maxLoop = 100;
    let iter = 0;

    this.loopCards(amount!, filteredCards);
    while (this.isValid() === false) {
      if (iter++ > maxLoop) {
        this.loopCards(amount!, filteredCards, true);
      } else {
        this.loopCards(amount!, filteredCards);
      }
    }

    this.handCards = shuffle(this.handCards);
  }

  loopCards(amount: number, filteredCards: RiskCard[], useUsedCards = false) {
    outer: while (this.handCards.length < amount!) {
      const randomIndex = Math.floor(Math.random() * filteredCards.length);
      const randomChance = randomInt(0, 100);

      const currentCard = filteredCards[randomIndex];

      if (useUsedCards === false) {
        for (const usedCard of this.usedCards) {
          if (usedCard.id === currentCard.id) {
            continue outer
          }
        }
      }

      for (const card of this.handCards) {
        if (card.id === currentCard.id) {
          continue outer
        }
      }

      // X## riskcards have scope -100
      if (currentCard.attributes.scope === -100) {
        if (enable_auto_lose === true) {
          const random = randomInt(0, this.AUTOLOSE_RISKCARD_CHANCE_MULTIPLIER);

          if (random === 0) {
            currentCard.probability = 100;
            this.handCards.push(currentCard);
            continue outer
          } else {
            continue outer
          }
        } else {
          continue outer
        }
      }

      currentCard.probability = randomChance;
      currentCard.impact = -(currentCard.attributes.scope) + -(currentCard.attributes.quality) + -(currentCard.attributes.cost) + -(currentCard.attributes.time);
      this.handCards.push(currentCard);
    }
  }

  isValid() {
    const a = [];

    for (const card of this.handCards) {
      if (card.attributes.scope === -100) {
        return true;
      }

      a.push(card.mitigation);
    }

    const b: string[] = ["", "", "", ""];

    let result = false;

    outer: for (const x1 of a[0]!) {
      b[0] = x1;
      result = true;

      if (a[1] !== undefined) {
        inn1: for (const x2 of a[1]) {
          if (b.includes(x2)) {
            result = false;
            continue inn1;
          }
          b[1] = x2;
          result = true;

          if (a[2] !== undefined) {
            inn2: for (const x3 of a[2]) {
              if (b.includes(x3)) {
                result = false;
                continue inn2;
              }
              b[2] = x3;
              result = true;

              if (a[3] !== undefined) {
                inn3: for (const x4 of a[3]) {
                  if (b.includes(x4)) {
                    result = false;
                    continue inn3;
                  }
                  b[3] = x4;
                  result = true;
                  break outer;
                }
              }
              break outer;
            }
          }
          break outer;
        }
      }
      break outer;
    }

    return result;
  }
}

function RiskCardJson(): RiskCard[] {
  const cards: RiskCard[] = [];
  const data: RiskData[] = RiskCardsJson;

  for (let i = 0; i < data.length; i++) {
    const card = new RiskCard(data[i])

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
