import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LikesPage.css'; // reuse shared styles
import PageLayout from './components/PageLayout';
import UserSection from './components/UserSection';

const defaultWeights = {
  likes: 5,
  followsPoster: 5,
  hashtags: 5,
  followerLikes: 5,
  recency: 5,
  paid: 5,
};

export default function RecencyPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const likes = location.state?.likes || 0;
  const likesScore = location.state?.likesScore || 0;
  const followsPoster = location.state?.followsPoster || false;
  const followScore = location.state?.followScore || 0;
  const hashtagScore = location.state?.hashtagScore || 0;
  const followerLikeScore = location.state?.followerLikeScore || 0;
  const followerLikes = location.state?.followerLikes || 0;
  const hashtagsFollowed = location.state?.hashtagsFollowed || 0;
  const weights = location.state?.weights || defaultWeights;
  const currentPost = location.state?.postNumber || 1;
  const postHistory = location.state?.postHistory || [];

  const [recencyScore, setRecencyScore] = useState(0);
  const [minutesAgo, setMinutesAgo] = useState(0);
  const [hasInput, setHasInput] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentView, setCurrentView] = useState('bio');

  // need to check the correctness of this
  // maybe it should instead be -recencyScore.. 
  const finalScore = likesScore + followScore + hashtagScore + followerLikeScore + recencyScore;

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'bio' ? 'post' : 'bio'));
  };

  // let's edit this to be correct
  useEffect(() => {
    const calcScore = -(weights.recency / 10) * minutesAgo;
    setRecencyScore(calcScore);
    setShowToast(hasInput);
  }, [weights.recency, minutesAgo, hasInput]);

  return (
    <PageLayout className="likes-page">

      {/* Middle Column */}
      <div className="column card builder-section">
        <h2>Post {currentPost}: Algorithm Builder - Recency</h2>

        <div className="input-block">
          <h3>1. Importance weight for recency</h3>
          <div>Importance: {weights.recency}/10</div>
        </div>

        <div className="input-block">
          <h3>2. How many days ago was the post uploaded?</h3>
          <input
            type="number"
            min="0"
            placeholder="Enter number of days"
            value={minutesAgo}
            onChange={(e) => {
              setMinutesAgo(Number(e.target.value));
              setHasInput(true);
            }}
          />
        </div>

        <div className="score-display">
          <h3>3. Calculated Score:</h3>
          <div className="score-breakdown">
            <span>( - </span>
            <span className="fraction">
              <span className="boxed">{weights.recency}</span>
              <span className="line"></span>
              <span>10</span>
            </span>
            <span>) × </span>
            <span className="boxed">{minutesAgo}</span>
            <span className="math-symbol"> = </span>
            <strong>{recencyScore.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="column card score-section">
        <h2>Final Score Breakdown</h2>
        <p>1. Number of likes = <strong>{likesScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>2. Follows poster = <strong>{followScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>3. Follows hashtags = <strong>{hashtagScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>4. Followed users liked = <strong>{followerLikeScore.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>5. Recency = <strong>{recencyScore.toFixed(2)}</strong></p>
        <hr />
        <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the recency score.<br />
            Move on to the next question when you're ready.
          </p>
          <button
            className="next-button"
            onClick={() =>
              navigate('/paid-promotion', {
                state: {
                  likes,
                  likesScore,
                  followsPoster,
                  followScore,
                  hashtagScore,
                  hashtagsFollowed,
                  followerLikeScore,
                  followerLikes,
                  recencyScore,
                  recencyDays: minutesAgo,
                  weights,
                  postNumber: currentPost,
                  postHistory,
                }
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
