import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LikesCalculator } from './LikesCalculator';
import './LikesPage.css';
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

export default function LikesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialWeights = location.state?.weights || defaultWeights;
  const initialPostNumber = location.state?.postNumber || 1;

  const [weights, setWeights] = useState(initialWeights);
  const [weightsSet, setWeightsSet] = useState(Boolean(location.state?.weights));
  const [likesScore, setLikesScore] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [currentPost, setCurrentPost] = useState(initialPostNumber);

  const finalScore = likesScore;

  useEffect(() => {
    if (likesScore > 0) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
  }, [likesScore]);

  useEffect(() => {
    if (location.state?.postNumber) {
      setCurrentPost(location.state.postNumber);
    }
    if (location.state?.weights) {
      setWeights(location.state.weights);
      setWeightsSet(true);
    }
  }, [location.state]);

  const updateWeight = (factor, value) => {
    setWeights((prev) => ({ ...prev, [factor]: Number(value) }));
  };

  return (
    <PageLayout className="likes-page">
      <div className="page-header">
        <h2>Post {currentPost}</h2>
      </div>

      {!weightsSet ? (
        <ColumnCard title="Set importance weights" className="builder-section">
          <p>Pick the importance of each factor once. These weights will apply to every post.</p>

          {Object.entries(weights).map(([factor, value]) => (
            <div key={factor} className="input-block">
              <h3>{factor.replace(/([A-Z])/g, ' $1')}</h3>
              <input
                type="range"
                min="0"
                max="10"
                value={value}
                onChange={(e) => updateWeight(factor, e.target.value)}
              />
              <div>Importance: {value}/10</div>
            </div>
          ))}

          <button className="next-button" onClick={() => setWeightsSet(true)}>
            Save weights and begin scoring
          </button>
        </ColumnCard>
      ) : (
        <>
          <ColumnCard title="Algorithm Builder: Likes" className="builder-section">
            <p>Using the saved weight: {weights.likes}/10 for likes.</p>
            <LikesCalculator weight={weights.likes} onScoreChange={setLikesScore} />
          </ColumnCard>

          <ColumnCard title="Weights Summary" className="score-section">
            <p>Weights are retained for this session and applied to every post.</p>
            <ul className="weights-list">
              <li>Likes: {weights.likes}/10</li>
              <li>Follows poster: {weights.followsPoster}/10</li>
              <li>Hashtags: {weights.hashtags}/10</li>
              <li>Follower likes: {weights.followerLikes}/10</li>
              <li>Recency: {weights.recency}/10</li>
              <li>Paid promotion: {weights.paid}/10</li>
            </ul>
            <button className="next-button" onClick={() => setWeightsSet(false)}>
              Adjust weights
            </button>
          </ColumnCard>

          {showToast && (
            <div className="toast" role="alert" aria-live="polite">
              <p>
                You’ve calculated the likes score.<br />
                Move on to the next step when you're ready.
              </p>
              <button
                className="next-button"
                onClick={() =>
                  navigate('/follow-poster', {
                    state: {
                      likesScore,
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
        </>
      )}
    </PageLayout>
  );
}
