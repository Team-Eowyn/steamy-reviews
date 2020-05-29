/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React from 'react';

import {
  FilterBar,
  FilterMenu,
  ReviewType,
  ReviewTypeTitle,
  ReviewTypeMenu,
  ReviewTypeContent,
  Label,
} from './styles/FilterBar.jsx';

const ReviewFilter = (props) => {
  const { review, changeView } = props;

  const handleChange = (e) => {
    const view = e.target.value;
    changeView(view);
  };

  if (review === null) {
    return (
      <span className="empty" />
    );
  }

  return (
    <FilterBar>
      <FilterMenu>
        <ReviewType>
          <ReviewTypeTitle>
            Review Type
          </ReviewTypeTitle>
          <ReviewTypeMenu>
            <ReviewTypeContent>
              <input type="radio" name="review_type" value="all" id="review_type_all" onChange={handleChange} />
              <Label>
                {`All (${review.game_reviews})`}
              </Label>
              <br />
              <input type="radio" name="review_type" value="positive" id="review_type_positive" onChange={handleChange} />
              <Label>
                {`Positive (${review.rating - 1})`}
              </Label>
              <br />
              <input type="radio" name="review_type" value="negative" id="review_type_negative" onChange={handleChange} />
              <Label>
                {`Negative (${review.game_reviews - review.rating + 1})`}
              </Label>
              <br />
            </ReviewTypeContent>
          </ReviewTypeMenu>
        </ReviewType>
      </FilterMenu>
    </FilterBar>
  );
};

export default ReviewFilter;
