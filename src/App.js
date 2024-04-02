import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Make sure to define the required CSS in App.css

function App() {
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'http://localhost:3000/api/scores' with your actual API endpoint
        const response = await axios.get("http://localhost:3000/api/scores");
        setGamesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {gamesData.map((game) => (
        <div key={game.gameName} className="game-container">
          <img src={game.headerUrl} alt={`${game.gameName} header`} />
          <h2>{game.gameName}</h2>
          <div className="scores-grid">
            {game.scores.map((score, index) => (
              <div key={index} className="score-card">
                <span
                  className="user-icon"
                  style={{ backgroundImage: `url(${score.iconUrl})` }}
                ></span>
                <div className="user-info" style={{ color: score.colorRgb }}>
                  <p>{score.userName}</p>
                  <p>{score.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
