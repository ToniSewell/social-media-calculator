import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LikesPage.css';
import PageLayout from './components/PageLayout';

const defaultWeights = {
  likes: 5,
  followsPoster: 5,
  hashtags: 5,
  followerLikes: 5,
  recency: 5,
  paid: 5,
};

export default function PaidPromotionPage() {
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
  const recencyScore = location.state?.recencyScore || 0;
  const recencyDays = location.state?.recencyDays || 0;
  const weights = location.state?.weights || defaultWeights;
  const currentPost = location.state?.postNumber || 1;
  const currentPostHistory = location.state?.postHistory || [];

  const [paidScore, setPaidScore] = useState(0);
  const [isPromoted, setIsPromoted] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const finalScore =
    likesScore + followScore + hashtagScore + followerLikeScore + recencyScore + paidScore;

  useEffect(() => {
    if (isPromoted === null) return;
    setPaidScore(isPromoted === 'yes' ? weights.paid : 0);
    setShowToast(true);
  }, [isPromoted, weights.paid]);

  return (
    <PageLayout className="likes-page">

      {/* Middle Column */}
      <div className="column card builder-section">
        <h2>Post {currentPost}: Algorithm Builder - Paid Promotion</h2>

        <div className="input-block">
          <h3>1. Importance weight for paid promotion</h3>
          <div>Importance: {weights.paid}/10</div>
        </div>

        <div className="input-block">
          <h3>2. Has the content paid to be promoted?</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="paid"
                value="yes"
                checked={isPromoted === 'yes'}
                onChange={() => setIsPromoted('yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="paid"
                value="no"
                checked={isPromoted === 'no'}
                onChange={() => setIsPromoted('no')}
              />
              No
            </label>
          </div>
        </div>

        <div className="score-display">
          <h3>3. Calculated Score:</h3>
          <div className="score-breakdown">
            <strong>{paidScore.toFixed(2)} points</strong>
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
        <p className="plus">+</p>
        <p>6. Paid promotion = <strong>{paidScore.toFixed(2)}</strong></p>

        <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast" role="alert" aria-live="polite">
          <p>
            You’ve calculated the final score! 🎉<br />
            Use the same weights for the next post.
          </p>
          <button
            className="next-button"
            onClick={() => {
              const newPostHistory = [
                ...currentPostHistory,
                {
                  post: currentPost,
                  likes,
                  followsPoster,
                  followScore,
                  hashtagScore,
                  hashtagsFollowed,
                  followerLikeScore,
                  followerLikes,
                  recencyScore,
                  recencyDays,
                  paidPromotion: isPromoted === 'yes',
                  score: finalScore,
                },
              ];
              navigate('/likes', {
                state: {
                  weights,
                  postNumber: currentPost + 1,
                  postHistory: newPostHistory,
                },
              });
            }}
          >
            Next Post →
          </button>
        </div>
      )}
    </PageLayout>
  );
}
