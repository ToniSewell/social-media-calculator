import React from 'react';
import ColumnCard from './ColumnCard';

export default function HistoryRail({ postHistory, weights }) {
  const scorePost = (item, weights) => {
    const isLegacy =
      item.likes == null &&
      item.followsPoster == null &&
      item.hashtagsFollowed == null &&
      item.followerLikes == null &&
      item.recencyDays == null &&
      item.paidPromotion == null;

    if (isLegacy) {
      return item.score ?? 0;
    }

    const hasRawInputs =
      item.likes != null ||
      item.followsPoster != null ||
      item.hashtagsFollowed != null ||
      item.followerLikes != null ||
      item.recencyDays != null ||
      item.paidPromotion != null;

    if (hasRawInputs) {
      const likesNormalizer = (n) => Math.log10(1 + n);
      const likes = (weights.likes / 10) * likesNormalizer(item.likes ?? 0);
      const followsPoster = (weights.followsPoster / 10) * (item.followsPoster ? 1 : 0);
      const hashtags = (weights.hashtags / 10) * (item.hashtagsFollowed ?? 0);
      const followerLikes = (weights.followerLikes / 10) * (item.followerLikes ?? 0);
      const recency = -(weights.recency / 10) * (item.recencyDays ?? 0);
      const paid = item.paidPromotion ? weights.paid : 0;

      return likes + followsPoster + hashtags + followerLikes + recency + paid;
    }

    return item.score ?? 0;
  };

  return (
    <ColumnCard title="Rated Posts" className="history-rail">
      {postHistory.length > 0 ? (
        <ul className="score-list">
          {postHistory.map((item, index) => (
            <li key={index}>
              <span>Post {item.post}</span>
              <strong>{scorePost(item, weights).toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-rail">No posts rated yet.</p>
      )}
    </ColumnCard>
  );
}
