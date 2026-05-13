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

    const likes = item.likes ?? 0;
    const followsPoster = item.followsPoster ? 1 : 0;
    const hashtags = item.hashtagsFollowed ?? 0;
    const followerLikes = item.followerLikes ?? 0;
    const recency = item.recencyDays ?? 0;
    const paid = item.paidPromotion ? weights.paid : 0;

    return (
      (weights.likes / 10) * likes +
      (weights.followsPoster / 10) * followsPoster +
      (weights.hashtags / 10) * hashtags +
      (weights.followerLikes / 10) * followerLikes +
      -(weights.recency / 10) * recency +
      paid
    );
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
