import MitiagateCardsJson from './mitigationcards.json';

export const MitigatCardState = $state() as IMitigationCards;

export default {
  MitigatCardState,
  Cards
};

interface IMitigationCards {
  cards: ICard[];
  addCard(card: ICard): void;
  addCards(data: MitigationData[]): void;
}

export interface MitigationData {
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

interface IAttributes {
  scope: number;
  quality: number;
  time: number;
  cost: number;
}

export interface ICard {
  id: string;
  title: string;
  description: string;
  category: Category;
  attributes: IAttributes;
  rng: number;
}

export type Category = 'Technical' | 'Management' | 'Commercial' | 'External';

export function Cards(): IMitigationCards {
  const cards: ICard[] = [] as ICard[];

  addCards(MitiagateCardsJson as MitigationData[]);

  function addCard(card: ICard) {
    cards.push(card);
  }

  function addCards(data: MitigationData[]) {
    for (let i = 0; i < data.length; i++) {
      const card = {
        id: data[i]['#'],
        rng: data[i].RND === 'RND' ? 1 : 0,
        category: data[i].Category,
        title: data[i].Mitigation,
        description: data[i].Description,
        attributes: {
          scope: data[i].S,
          quality: data[i].Q,
          time: data[i].T,
          cost: data[i].C
        }
      } as ICard;
      cards.push(card);
    }
  }

  return {
    get cards() {
      return cards;
    },
    addCard,
    addCards
  };
}
