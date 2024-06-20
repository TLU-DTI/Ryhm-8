import RiskCardsJson from './riskcards.json';

export const RiskCardState = $state() as IRiskCards;

export default {
  RiskCardState,
  Cards
};

export interface IRiskCards {
  cards: ICard[];
  addCards(data: RiskData[]): void;
}

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

interface IAttributes {
  scope: number;
  quality: number;
  time: number;
  cost: number;
}

interface gameStage {
  initation: number;
  planning: number;
  execution: number;
  closing: number;
}

export interface ICard {
  id: string;
  title: string;
  description: string;
  category: Category;
  subcategory: string;
  attributes: IAttributes;
  mitigation: string;
  gameStage: gameStage;
}

type Category = 'Technical' | 'Management' | 'Commercial' | 'External';

export function Cards(): IRiskCards {
  const cards: ICard[] = [] as ICard[];

  addCards(RiskCardsJson as RiskData[]);

  function addCards(data: RiskData[]) {
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
        mitigation: data[i].Mitigation,
        gameStage: {
          initation: data[i].I === undefined ? 0 : data[i].I,
          planning: data[i].P === undefined ? 0 : data[i].P,
          execution: data[i].E === undefined ? 0 : data[i].E,
          closing: data[i].X === undefined ? 0 : data[i].X
        }
      } as ICard;
      cards.push(card);
    }
  }
  return {
    get cards() {
      return cards;
    },
    addCards
  };
}
