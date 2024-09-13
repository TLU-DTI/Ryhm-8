import { areAllUnique, shuffle } from '$lib';
import MitiCardsJson from '$lib/Data/miticards.json';

import { Category } from '..';
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

export class MitiCard {
  id: string;
  title: string;
  description: string;
  category: Category[];
  attributes: Attributes;
  rng: boolean;
  used: boolean;

  color: string = $state('#43466e');;

  constructor(id: string, title: string, description: string, category: Category[], attributes: Attributes, rng: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.attributes = attributes;
    this.rng = rng;
    this.used = false;

    if (this.category[0] === "Technical") {
      this.color = '#3e97ff';
    } else if (this.category[0] === "Management") {
      this.color = '#38963b';
    } else if (this.category[0] === "Commercial") {
      this.color = '#f07d3a';
    } else if (this.category[0] === "External") {
      this.color = '#a152ad';
    }
  }
}

export class MitiHand {
  readonly mitiCards = MitiCardJson();

  _handCards: MitiCard[] = $state([]);
  get handCards(): MitiCard[] {
    return this._handCards;
  }
  set handCards(cards: MitiCard[]) {
    this._handCards = []

    for (const card of cards) {
      this._handCards.push(new MitiCard(card.id, card.title, card.description, card.category, card.attributes, card.rng));
    }
  }

  _usedCards: MitiCard[] = $state([]);
  get usedCards(): MitiCard[] {
    return this._usedCards;
  }
  set usedCards(cards: MitiCard[]) {
    this._usedCards = []

    for (const card of cards) {
      this._usedCards.push(new MitiCard(card.id, card.title, card.description, card.category, card.attributes, card.rng));
    }
  }

  createHand(riskHand: RiskCard[], amount: number = 3) {
    this.handCards = [];

    this.createCards(riskHand);
    while (this.isValid() === false) {
      this.createCards(riskHand);
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

  isValid() {
    let ids = [];
    for (const card of this.handCards) {
      ids.push(card.id);
    }

    return areAllUnique(ids);
  }

  createCards(riskHand: RiskCard[]) {
    this.handCards = [];

    outer: for (const risk of riskHand) {
      if (risk.mitigation?.length) {
        const randomIndex = Math.floor(Math.random() * risk.mitigation.length);

        for (const miti of this.mitiCards) {
          if (miti.id === risk.mitigation[randomIndex]) {
            this.handCards.push(miti);
            continue outer;
          }
        }
      }
    }
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
      used: false,
    };
    cards.push(new MitiCard(card.id, card.title, card.description, card.category, card.attributes, card.rng));
  }

  return cards;
}
