import { shuffle } from '$lib';
import MitiCardsJson from '$lib/Data/miticards.json';

import type { Category } from '..';
import type { RiskCard } from './RiskCard.svelte';

interface MitiData {
  '#': string;
  Mitigation: string;
  Category: string;
  RND?: string;
  S: number;
  Q: number;
  T: number;
  C: number;
  Description: string;
}

interface Attributes {
  scope: number;
  quality: number;
  time: number;
  cost: number;
}

export interface MitiCard {
  id: string;
  title: string;
  description: string;
  category: Category[];
  attributes: Attributes;
  rng: boolean;
  used: boolean;
}

export class MitiHand {
  readonly mitiCards = MitiCardJson();

  handCards: MitiCard[] = $state([]);
  usedCards: MitiCard[] = $state([]);

  createHand(riskHand: RiskCard[], amount: number = 3) {
    this.handCards = [];

    // have 1 correct card
    loop:
    for (const risk of riskHand) {
      for (const miti of this.mitiCards) {
        if (!risk.mitigation) return;

        for (const id of risk.mitigation) {
          if (miti.id === id) {
            this.handCards.push(miti);
            break loop;
          }
        }
      }
    }

    // fill in rest
    if (this.handCards.length < amount + riskHand.length) {
      outer: while (this.handCards.length < amount + riskHand.length) {
        const randomIndex = Math.floor(Math.random() * this.mitiCards.length);

        // no duplicate
        for (const card of this.handCards) {
          if (card.id === this.mitiCards[randomIndex].id) {
            continue outer
          }
        }

        this.handCards.push(this.mitiCards[randomIndex]);
      }
    }

    this.handCards = shuffle(this.handCards);
  }

  addUsed(card: MitiCard) {
    card.used = true;
    card.attributes.cost = 0;
    card.attributes.quality = 0;
    card.attributes.scope = 0;
    card.attributes.time = 0;
    this.usedCards.push(card);
  }
}

function MitiCardJson(): MitiCard[] {
  const cards: MitiCard[] = [];
  const data: MitiData[] = MitiCardsJson;

  for (let i = 0; i < data.length; i++) {
    const card = {
      id: data[i]['#'],
      rng: data[i].RND === 'RND',
      category: data[i].Category.split(' & ') as Category[],
      title: data[i].Mitigation,
      description: data[i].Description,
      attributes: {
        scope: data[i].S,
        quality: data[i].Q,
        time: data[i].T * -1,
        cost: data[i].C * -1
      },
      used: false
    };
    cards.push(card);
  }

  return cards;
}
