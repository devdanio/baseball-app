import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function PlayerDetail() {
  const [player, setPlayer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/players/${id}`)
      .then((res) => res.json())
      .then((data) => setPlayer(data));
  }, [id]);

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{player.player}</h2>
      <div className="bg-gray-100 p-4 rounded">
        <p>
          <strong>Rank:</strong> {player.rank}
        </p>
        <p>
          <strong>Age:</strong> {player.ageThatYear}
        </p>
        <p>
          <strong>Hits:</strong> {player.hits}
        </p>
        <p>
          <strong>Year:</strong> {player.year}
        </p>
        <p>
          <strong>Bats:</strong> {player.bats}
        </p>
        <p>{player.bio}</p>
      </div>
      <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
        Back to List
      </Link>
      <Link
        to={`/player/${id}/edit`}
        className="mt-4 ml-4 inline-block text-green-500 hover:underline"
      >
        Edit Player
      </Link>
    </div>
  );
}

export default PlayerDetail;
