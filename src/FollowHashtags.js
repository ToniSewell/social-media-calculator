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
  
export default function FollowHashtagsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const likesScore = location.state?.likesScore || 0;
  const followScore = location.state?.followScore || 0;
  const weights = location.state?.weights || defaultWeights;
  const currentPost = location.state?.postNumber || 1;
  const postHistory = location.state?.postHistory || [];

  const [hashtagScore, setHashtagScore] = useState(0);
  const [score4, setScore4] = useState(0); // Placeholder for future use
  const [numHashtagsFollowed, setNumHashtagsFollowed] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const finalScore = likesScore + followScore + hashtagScore + score4;

  useEffect(() => {
    const calcScore = (weights.hashtags / 10) * numHashtagsFollowed;
    setHashtagScore(calcScore);
    setShowToast(numHashtagsFollowed > 0);
  }, [weights.hashtags, numHashtagsFollowed]);

  return (
    <PageLayout className="likes-page">
 
<div className="column card builder-section">
        <h2>Post {currentPost}: Algorithm Builder - Hashtags</h2>

        <div className="input-block">
          <h3>1. Importance weight for hashtags</h3>
          <div>Importance: {weights.hashtags}/10</div>
        </div>

        <div className="input-block">
          <h3>2. How many hashtags does the user follow from the post?</h3>
          <input
            type="number"
            min="0"
            max="10"
            value={numHashtagsFollowed}
            onChange={(e) => setNumHashtagsFollowed(Number(e.target.value))}
          />
        </div>

        <div className="score-display">
          <h3>3. Calculated Score:</h3>
          <div className="score-breakdown">
            <span className="fraction">
              <span className="boxed">{weights.hashtags}</span>
               <span className="line"></span>
               <span>10</span>
             </span>
             <span className="math-symbol">×</span>
             <span className="boxed">{numHashtagsFollowed}</span>
             <span className="math-symbol">=</span>
             <strong>{hashtagScore.toFixed(2)}</strong>
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
         <p>4. ... = <strong>{score4.toFixed(2)}</strong></p>
         <p className="plus">+</p>
         <p>5. ... = <strong>{score4.toFixed(2)}</strong></p>
         <p className="plus">+</p>
         <p>6. ... = <strong>{score4.toFixed(2)}</strong></p>
         <h3>Final Score: <span className="final-score">{finalScore.toFixed(2)}</span></h3>
       </div>
 
       {/* Toast */}
       {showToast && (
         <div className="toast" role="alert" aria-live="polite">
           <p>
             You’ve calculated the hashtag follow score.<br />
             Move on to the next question when you're ready.
           </p>
           <button
             className="next-button"
             onClick={() =>
               navigate('/liked-by-followed-users', {
                 state: {
                   likesScore,
                   followScore,
                   hashtagScore,
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