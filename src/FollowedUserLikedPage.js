import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LikesPage.css'; // reuse existing styles
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

export default function FollowedUserLikedPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const likes = location.state?.likes || 0;
  const likesScore = location.state?.likesScore || 0;
  const followsPoster = location.state?.followsPoster || false;
  const followScore = location.state?.followScore || 0;
  const hashtagScore = location.state?.hashtagScore || 0;
  const hashtagsFollowed = location.state?.hashtagsFollowed || 0;
  const weights = location.state?.weights || defaultWeights;
  const currentPost = location.state?.postNumber || 1;
  const postHistory = location.state?.postHistory || [];

  const [followerLikeScore, setFollowerLikeScore] = useState(0);
  const [score5, setScore5] = useState(0); // placeholder
  const [numUsers, setNumUsers] = useState(0);
  const [hasInput, setHasInput] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentView, setCurrentView] = useState('bio');

  const finalScore = likesScore + followScore + hashtagScore + followerLikeScore + score5;

  const toggleView = () => {
    setCurrentView((prev) => (prev === 'bio' ? 'post' : 'bio'));
  };

  useEffect(() => {
    const calcScore = (weights.followerLikes / 10) * numUsers;
    setFollowerLikeScore(calcScore);
    setShowToast(hasInput);
  }, [weights.followerLikes, numUsers, hasInput]);

  return (
    <PageLayout className="likes-page">
      {/* Left: reusable user section */}

      {/* Middle Column */}
      <div className="column card builder-section">
        <h2>Post {currentPost}: Algorithm Builder</h2>
        <div className="input-block">
          <h3>1. Importance weight for followed-user likes</h3>
          <div>Importance: {weights.followerLikes}/10</div>
        </div>

        <div className="input-block">
          <h3>2. Number of followed users who liked the post</h3>
          <input
            type="number"
            min="0"
            max="10"
            value={numUsers}
            onChange={(e) => {
              setNumUsers(Number(e.target.value));
              setHasInput(true);
            }}
            placeholder="Enter number"
          />
        </div>

        <div className="score-display">
          <h3>3. Calculated Score:</h3>
          <div className="score-breakdown">
            <span className="fraction">
              <span className="boxed">{weights.followerLikes}</span>
              <span className="line"></span>
              <span>10</span>
            </span>
            <span className="math-symbol">×</span>
            <span className="boxed">{numUsers}</span>
            <span className="math-symbol">=</span>
            <strong>{followerLikeScore.toFixed(2)}</strong>
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
        <p>5. ... = <strong>{score5.toFixed(2)}</strong></p>
        <p className="plus">+</p>
        <p>6. ... = <strong>{score5.toFixed(2)}</strong></p>
        <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the follower-like score.<br />
            Move on to the next question when you're ready.
          </p>
          <button
            className="next-button"
            onClick={() =>
              navigate('/recency', {
                state: {
                  likes,
                  likesScore,
                  followsPoster,
                  followScore,
                  hashtagScore,
                  hashtagsFollowed,
                  followerLikeScore,
                  followerLikes: numUsers,
                  weights,
                  postNumber: currentPost,
                  postHistory,
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
