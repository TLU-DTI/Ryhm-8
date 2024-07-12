import MitiCardsJson from '$lib/Data/miticards.json';

import type { Category } from "..";

interface MitigationData {
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
  used?: boolean;

  constructor(id: string, title: string, description: string, category: Category, attributes: Attributes, rng: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.attributes = attributes;
    this.rng = rng;
  }

}

export class MitiCardJson {
  private _cards: MitiCard[] = [];
  get cards(): MitiCard[] { return this._cards; }

  constructor() {
    this.addCards(MitiCardsJson as MitigationData[]);
  }

  addCard(card: MitiCard) { this._cards.push(card); }
  addCards(data: MitigationData[]) {
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
        }
      };

      this._cards.push(card);
    }
  }
}