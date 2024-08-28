import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const numberProps = ["ageThatYear", "hits", "year"];
function EditPlayer() {
  const [player, setPlayer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/players/${id}`)
      .then((res) => res.json())
      .then((data) => setPlayer(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("chagnd", typeof value);
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [name]: value,
    }));
  };

  console.log("player", player);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/players/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    })
      .then((res) => res.json())
      .then(() => {
        navigate(`/player/${id}`);
      });
  };

  if (!player) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Player</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Rank: {player.rank}</label>
        </div>
        <div>
          <label className="block">Player:</label>
          <input
            type="text"
            name="player"
            value={player.player}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Age:</label>
          <input
            type="number"
            name="ageThatYear"
            value={player.ageThatYear}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Hits:</label>
          <input
            type="number"
            name="hits"
            value={player.hits}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Year:</label>
          <input
            type="number"
            name="year"
            value={player.year}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">Bats:</label>
          <input
            type="text"
            name="bats"
            value={player.bats}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block">Bio:</label>
          <textarea
            name="bio"
            value={player.bio}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Player
        </button>
      </form>
    </div>
  );
}

export default EditPlayer;
