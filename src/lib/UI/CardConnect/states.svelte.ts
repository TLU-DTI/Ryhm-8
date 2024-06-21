interface CardState {
  selectedActionCardId: number | null;
  selectedHandCardId: number | null;
  cardConnections: { actionCardId: number; handCardId: number }[];
}

const initialCardState: CardState = {
  selectedActionCardId: null,
  selectedHandCardId: null,
  cardConnections: []
};

function getStoredState(): CardState {
  if (typeof localStorage !== 'undefined') {
    const storedState = localStorage.getItem('cardState');
    if (storedState) {
      try {
        return JSON.parse(storedState);
      } catch (e) {
        console.error('Error parsing cardState from localStorage', e);
      }
    }
  }
  return initialCardState;
}

export const cardState = $state<CardState>(getStoredState());

if (typeof localStorage !== 'undefined') {
  localStorage.setItem('cardState', JSON.stringify(cardState));
}
