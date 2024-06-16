import RiskCardsJson from './riskcards.json';

export const RiskCardState = $state() as IRiskCards;
export const RiskCardHand = $state() as IRiskCards;

export default {
  RiskCardState,
  RiskCards,
  RiskCardHand
};

interface IRiskCards {
  riskCards: IRiskCard[];
  riskHand: IRiskCard[];
  addRiskCards(data: RiskData[]): void;
  //getHand(): IRiskCard[];
  createHand(amount: number): void;
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

export interface IRiskCard {
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

export function RiskCards(): IRiskCards {
  const riskCards: IRiskCard[] = [] as IRiskCard[];
  const cardsInHand: IRiskCard[] = $state([]) as IRiskCard[];

  addRiskCards(RiskCardsJson as RiskData[]);

  function addRiskCards(data: RiskData[]) {
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
      } as IRiskCard;
      riskCards.push(card);
    }
  }

  function createHand(amount: number){
    cardsInHand.splice(0, cardsInHand.length);
    for(let i = 0; i < amount; i++) {
      const randomIndex = Math.floor(Math.random() * riskCards.length);
      cardsInHand.push(riskCards[randomIndex]);
    }
    return cardsInHand;
  }


  return {
    get riskCards() {
      return riskCards;
    },
    get riskHand() {
      return cardsInHand;
    },
    addRiskCards,
    createHand
  };
}
