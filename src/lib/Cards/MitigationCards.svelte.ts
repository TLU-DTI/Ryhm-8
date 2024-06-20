import MitiagateCardsJson from './mitigationcards.json';
import RiskCards from './RiskCards.svelte';

export const MitigatCardState = $state() as IMitigationCards;

export default {
  MitigatCardState,
  Cards
};

interface IMitigationCards {
  cards: ICard[];
  addCard(card: ICard): void;
  addCards(data: MitigationData[]): void;
  mitigateCardsHand: ICard[];
  createMitigateHand(amount: number): void
  addUsed(card: ICard): void;
  usedCardsHand: ICard[];
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
  const usedMitigations: ICard[] = $state([]) as ICard[];
  let mitigateCardsInHand: ICard[] = $state([]) as ICard[];

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

  function createMitigateHand(amount: number){
    mitigateCardsInHand.splice(0, mitigateCardsInHand.length);

    RiskCards.RiskCardState.riskHand.forEach(element => {
      const foundElement = cards.find(card => card.id === element.mitigation[Math.floor(Math.random() * element.mitigation.length)]);

      if(foundElement){
        mitigateCardsInHand.push(foundElement);
      }
    });

    if (mitigateCardsInHand.length < amount){
      while(mitigateCardsInHand.length < amount) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        mitigateCardsInHand.push(cards[randomIndex]);
      }
    }
    
    mitigateCardsInHand = shuffleArray(mitigateCardsInHand);
  }

  function shuffleArray<T>(array: T[]): T[] {
    // Make a copy of the array to avoid modifying the original array
    const result = array.slice();

    // Fisher-Yates shuffle algorithm
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

  function addUsed(card: ICard) {
    usedMitigations.push(card);
  }

  return {
    get cards() {
      return cards;
    },
    get mitigateCardsHand(){
      return mitigateCardsInHand;
    },
    get usedCardsHand(){
      return usedMitigations;
    },
    addCard,
    addCards,
    createMitigateHand,
    addUsed
  };
}
