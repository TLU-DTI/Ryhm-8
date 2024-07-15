import { shuffle } from '$lib';
import MitiCardsJson from '$lib/Data/miticards.json';

import type { Category } from '..';
import type { RiskCard } from './RiskCard.svelte';

interface MitiData {
  '#': string;
  Mitigation: string;
  Category: Category;
  RND: string;
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

export class MitiCard {
  id: string;
  title: string;
  description: string;
  category: Category;
  attributes: Attributes;
  rng: boolean;
  used: boolean;

  constructor(
    id: string,
    title: string,
    description: string,
    category: Category,
    attributes: Attributes,
    rng: boolean
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.attributes = attributes;
    this.rng = rng;
    this.used = false;
  }
}

export class MitiHand {
  readonly mitiCards = MitiCardJson();

  handCards: MitiCard[] = $state([]);
  usedCards: MitiCard[] = $state([]);

  createHand(riskHand: RiskCard[], amount: number = 3) {
    this.handCards = [];

    // have 1 correct card
    riskHand.forEach((element) => {
      const foundElement = this.mitiCards.find(
        (card) =>
          card.id === element.mitigation[Math.floor(Math.random() * element.mitigation.length)]
      );

      if (foundElement) {
        this.handCards.push(foundElement);
      }
    });

    // fill in rest
    if (this.handCards.length < amount) {
      while (this.handCards.length < amount) {
        const randomIndex = Math.floor(Math.random() * this.mitiCards.length);
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
  const data = MitiCardsJson as MitiData[];

  for (let i = 0; i < data.length; i++) {
    const card = {
      id: data[i]['#'],
      rng: data[i].RND === 'RND',
      category: data[i].Category,
      title: data[i].Mitigation,
      description: data[i].Description,
      attributes: {
        scope: data[i].S,
        quality: data[i].Q,
        time: data[i].T,
        cost: data[i].C
      },
      used: false
    };
    cards.push(card);
  }

  return cards;
}
