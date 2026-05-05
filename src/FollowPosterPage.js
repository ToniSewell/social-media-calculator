import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LikesPage.css'; // Reuse styles from LikesPage
import PageLayout from './components/PageLayout';
import ColumnCard from './components/ColumnCard';

const defaultWeights = {
  likes: 5,
  followsPoster: 5,
  hashtags: 5,
  followerLikes: 5,
  recency: 5,
  paid: 5,
};

export default function FollowPosterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const likesScore = location.state?.likesScore || 0;
  const weights = location.state?.weights || defaultWeights;
  const currentPost = location.state?.postNumber || 1;

  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [followsPoster, setFollowsPoster] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const finalScore = likesScore + score2 + score3 + score4;

  useEffect(() => {
    const binary = followsPoster === 'yes' ? 1 : 0;
    const calcScore = (weights.followsPoster / 10) * binary;
    setScore2(calcScore);
    if (followsPoster !== null) setShowToast(true);
  }, [weights.followsPoster, followsPoster]);

  return (
    <PageLayout className="likes-page follow-poster-page">
      <ColumnCard title={`Post ${currentPost}: Follow Poster`} className="builder-section">
        <div className="input-block">
          <h3>1. Importance weight for following the poster</h3>
          <div>Importance: {weights.followsPoster}/10</div>
        </div>

        <div className="input-block">
          <h3>2. Does the user follow the poster?</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="follow"
                value="yes"
                checked={followsPoster === 'yes'}
                onChange={() => setFollowsPoster('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="follow"
                value="no"
                checked={followsPoster === 'no'}
                onChange={() => setFollowsPoster('no')}
              />
              No
            </label>
          </div>
        </div>

        <div className="score-display">
          <h3>3. Calculated Score:</h3>
          <div className="score-breakdown">
            <span className="fraction">
              <span className="boxed">{weights.followsPoster}</span>
              <span className="line"></span>
              <span>10</span>
            </span>
            <span className="math-symbol">×</span>
            <span className="boxed">{followsPoster === 'yes' ? 1 : 0}</span>
            <span className="math-symbol">=</span>
            <strong>{score2.toFixed(2)}</strong>
          </div>
        </div>
      </ColumnCard>

      <ColumnCard title="Final Score Breakdown" className="score-section">
        <p>1. Number of likes = <strong>{likesScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>2. Follows poster = <strong>{score2.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>3. ... = <strong>{score3.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>4. ... = <strong>{score4.toFixed(2)}</strong></p>
        <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
      </ColumnCard>

      {showToast && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the follow poster score.<br />
            Move on to the next question when you're ready.
          </p>
          <button
            className="next-button"
            onClick={() =>
              navigate('/hashtags', {
                state: {
                  likesScore,
                  followScore: score2,
                  weights,
                  postNumber: currentPost,
                },
              })
            }
          >
            Next →
          </button>
        </div>
      )}
    </PageLayout>
  );
}
