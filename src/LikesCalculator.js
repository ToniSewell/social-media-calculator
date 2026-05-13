import React, { useState, useEffect } from 'react';
import './LikesCalculator.css';

export function LikesCalculator({ weight = 0, onScoreChange }) {
  const [likes, setLikes] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const calcScore = likes === null ? 0 : (weight / 10) * likes;
    setScore(calcScore);
    onScoreChange(calcScore, likes !== null, likes === null ? 0 : likes);
  }, [weight, likes, onScoreChange]);

  return (
    <div className="likes-calculator">
      <h2>1. Importance weight for number of likes</h2>
      <div className="slider-label">Importance: {weight}/10</div>

      <h2>2. How many likes does the post have?</h2>
      <input
        className="number-input"
        type="number"
        placeholder="Enter number"
        value={likes === null ? '' : likes}
        onChange={(e) =>
          setLikes(e.target.value === '' ? null : Number(e.target.value))
        }
      />

      <h3>3. Calculated score:</h3>
      <div className="score-breakdown">
        <span className="fraction">
          <span className="boxed top">{weight}</span>
          <span className="line"></span>
          <span className="bottom">10</span>
        </span>
        <span className="math-symbol">×</span>
        <span className="boxed">{likes}</span>
        <span className="math-symbol">=</span>
        <strong>{score.toFixed(2)}</strong>
      </div>
    </div>
  );
}