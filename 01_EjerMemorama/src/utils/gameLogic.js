// Función para mezclar las cartas
export const shuffleCards = (icons) => {
  const duplicatedIcons = [...icons, ...icons];
  return duplicatedIcons
    .sort(() => Math.random() - 0.5)
    .map((icon, index) => ({
      id: index,
      icon: icon.icon,
      name: icon.name,
      isFlipped: false,
      isMatched: false
    }));
};

// Manejar el click de una carta (versión simplificada)
export const handleCardClick = (cards, clickedCard, setCards, setSelectedCards) => {
  const updatedCards = cards.map(card => 
    card.id === clickedCard.id ? { ...card, isFlipped: true } : card
  );
  
  setCards(updatedCards);
  setSelectedCards(prev => [...prev, clickedCard]);
};