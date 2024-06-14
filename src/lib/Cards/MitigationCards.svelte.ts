import MitiagateCardsJson from './mitigationcards.json';

export const MitigatCardState = $state() as ICards;

export default {
  MitigatCardState,
  Cards
};

interface ICards {
  cards: ICard[];
  addCard(card: ICard): void;
  addCards(data: MitigationData[]): void;
  getRandomCard(): ICard;
}

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

type Category = 'Technical' | 'Management' | 'Commercial' | 'External';

export function Cards(): ICards {
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

  function getRandomCard() {
    // Check if the cards list is empty
    if (cards.length === 0) {
        return null; // or handle the empty list case as needed
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * cards.length);

    // Return the card at the random index
    return cards[randomIndex];
}

  return {
    get cards() {
      return cards;
    },
    addCard,
    addCards,
    getRandomCard
  };
}
