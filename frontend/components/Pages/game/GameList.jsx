import { useEffect, useState } from "react"

export const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch("/api/game/list");
                if (response.ok) {
                    const data = await response.json();
                    setGames(data);
                } else {
                    console.error("Failed to fatch games");
                }
            } catch (error) {
                console.error("Error fetching games", error);
            }
        };
        fetchGames();
    }, []);

    return (
        <div>
            <h2>Game List</h2>
            <ul>
                {games.map(game => (
                    <li key={game.li}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GameList;
