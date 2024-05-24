import { useEffect, useState } from 'react';


export const Game = ({ match }) => {
  const [game, setGame] = useState(null);
  const gameId = match.params.id;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`/api/game/${gameId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch game");
        }
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error('Error fetching game', error);
      }
    };
    fetchGame();
  }, [gameId]);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      <p>Status: {game.started ? 'Started' : 'Not started'}</p>
      {/* Afficher plus d'informations sur le jeu ici */}
    </div>
  );
};

export default Game;
