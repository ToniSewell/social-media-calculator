import React from 'react';
import { render, screen } from '@testing-library/react';
import HistoryRail from './HistoryRail';

describe('HistoryRail score calculation', () => {
  it('recomputes totals from raw inputs using the same likes normalization as the calculator', () => {
    render(
      <HistoryRail
        postHistory={[
          {
            post: 1,
            likes: 1000,
            followsPoster: false,
            hashtagsFollowed: 0,
            followerLikes: 0,
            recencyDays: 0,
            paidPromotion: false,
          },
        ]}
        weights={{ likes: 10, followsPoster: 0, hashtags: 0, followerLikes: 0, recency: 0, paid: 0 }}
      />
    );

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('3.00')).toBeInTheDocument();
  });
});
