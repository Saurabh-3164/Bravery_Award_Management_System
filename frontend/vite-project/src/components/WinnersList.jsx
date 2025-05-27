import React, { useEffect, useState } from "react";
import "./WinnersList.css";

const WinnersList = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/winners") // adjust if hosted differently
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch winners");
        }
        return res.json();
      })
      .then((data) => {
        setWinners(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading winners...</p>;
  if (error) return <p>Error: {error}</p>;
  if (winners.length === 0) return <p>No winners found yet.</p>;

  return (
    <div className="winners-container">
      <h2>🏅 Bravery Award Winners</h2>
      <div className="winners-grid">
        {winners.map((winner, index) => (
          <div key={index} className="winner-card">
            <h3>{winner.name}</h3>
            <p><strong>Age:</strong> {winner.age}</p>
            <p><strong>Category:</strong> {winner.recommended_category}</p>
            <p className="story">{winner.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinnersList;
