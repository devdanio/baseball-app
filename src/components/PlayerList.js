import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import PieChart from "./StanceChart";
import AgeChart from "./AgeChart";

function PlayerList() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-row justify-between">
        <PieChart players={players} />
        <AgeChart players={players} />
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">Rank</th>
            <th className="py-2 px-4 border-b">Player</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Hits</th>
            <th className="py-2 px-4 border-b">Year</th>
            <th className="py-2 px-4 border-b">Bats</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{player.rank}</td>
              <td className="py-2 px-4 border-b">{player.player}</td>
              <td className="py-2 px-4 border-b">{player.ageThatYear}</td>
              <td className="py-2 px-4 border-b">{player.hits}</td>
              <td className="py-2 px-4 border-b">{player.year}</td>
              <td className="py-2 px-4 border-b">{player.bats}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  to={`/player/${player.id}`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  View
                </Link>
                <Link
                  to={`/player/${player.id}/edit`}
                  className="text-green-500 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PlayerList;
