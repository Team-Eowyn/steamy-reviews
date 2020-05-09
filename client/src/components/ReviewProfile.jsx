import React from 'react';

const ReviewProfile = (props) => {
  const { user } = props;
  return (
    <div className="leftcol">
      <div className="avatar">
        <img src={user.icon}></img>
      </div>
      <div className="username">
        {user.username}
      </div>
      <div className="num_owned_games">
        {`${user.numProducts} products in account`}
      </div>
      <div className="num_reviews">
        {`${user.numReviews} reviews`}
      </div>
    </div>
  );
};

export default ReviewProfile;