import React, { useState, useEffect } from 'react';
import { Card, techIcons } from './Card';
import { shuffleCards, handleCardClick } from '../utils/gameLogic';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Jugador 1', moves: 0, pairs: 0, isActive: true },
    { id: 2, name: 'Jugador 2', moves: 0, pairs: 0, isActive: false }
  ]);
  const [gameWon, setGameWon] = useState(false);
  const [winner, setWinner] = useState(null);
  const [blockBoard, setBlockBoard] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2 && !blockBoard) {
      const currentPlayerIndex = players.findIndex(p => p.isActive);
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].moves += 1;

      const isMatch = selectedCards[0].name === selectedCards[1].name;

      if (isMatch) {
        // Hay match - actualizar cartas y pares
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === selectedCards[0].id || card.id === selectedCards[1].id
              ? { ...card, isMatched: true }
              : card
          )
        );
        updatedPlayers[currentPlayerIndex].pairs += 1;
        
        // Verificar si el juego terminó
        const allMatched = cards.filter(c => !c.isMatched).length === 2;
        if (allMatched) {
          setGameWon(true);
          determineWinner(updatedPlayers);
        }
        
        setSelectedCards([]);
      } else {
        // No hay match - bloquear tablero y preparar cambio de turno
        setBlockBoard(true);
        setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === selectedCards[0].id || card.id === selectedCards[1].id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setSelectedCards([]);
          setBlockBoard(false);
          
          // Cambiar turno después de voltear las cartas
          setPlayers(prevPlayers => 
            prevPlayers.map(player => ({
              ...player,
              isActive: !player.isActive
            }))
          );
        }, 1000);
      }

      setPlayers(updatedPlayers);
    }
  }, [selectedCards]);

  const determineWinner = (players) => {
    if (players[0].pairs > players[1].pairs) {
      setWinner(players[0]);
    } else if (players[1].pairs > players[0].pairs) {
      setWinner(players[1]);
    } else {
      setWinner(players[0].moves < players[1].moves ? players[0] : players[1]);
    }
  };

  const startNewGame = () => {
    setCards(shuffleCards(techIcons));
    setSelectedCards([]);
    setPlayers([
      { id: 1, name: 'Jugador 1', moves: 0, pairs: 0, isActive: true },
      { id: 2, name: 'Jugador 2', moves: 0, pairs: 0, isActive: false }
    ]);
    setGameWon(false);
    setWinner(null);
    setBlockBoard(false);
  };

  const onCardClick = (card) => {
    if (!blockBoard && !card.isFlipped && !card.isMatched && selectedCards.length < 2) {
      handleCardClick(cards, card, setCards, setSelectedCards);
    }
  };

  const currentPlayer = players.find(p => p.isActive);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl mb-8 text-white font-bold">
          MEMORAMA PROGRAMACION
        </h1>

        {gameWon ? (
          <div className="text-white mb-8 animate-pulse">
            <h2 className="text-3xl mb-4">¡{winner.name} Gana!</h2>
            <p className="mb-2">Con {winner.pairs} parejas y {winner.moves} movimientos</p>
            <div className="mb-4">
              <h3 className="text-xl">Resultados:</h3>
              {players.map(player => (
                <p key={player.id}>
                  {player.name}: {player.pairs} parejas, {player.moves} movimientos
                </p>
              ))}
            </div>
            <button 
              onClick={startNewGame}
              className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Jugar de Nuevo
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center gap-8 mb-4">
              {players.map(player => (
                <div 
                  key={player.id} 
                  className={`p-4 rounded-lg ${player.isActive ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
                >
                  <h3>{player.name}</h3>
                  <p>Pares: {player.pairs}</p>
                  <p>Movimientos: {player.moves}</p>
                  {player.isActive && <p className="font-bold">¡Turno Actual!</p>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {cards.map(card => (
                <Card
                  key={card.id}
                  icon={card.icon}
                  isFlipped={card.isFlipped}
                  isMatched={card.isMatched}
                  onClick={() => onCardClick(card)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;