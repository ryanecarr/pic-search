import React, { useState } from 'react';

const ImageCard = ({ avatar, user, image, alt, likes }) => {
  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const onLikeClick = () => {
    setLiked(!liked);
    setNumLikes(!liked ? numLikes + 1 : numLikes - 1);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    setComment('');
    setComments([...comments, comment]);
  };
  return (
    <div className='ui raised card'>
      <div className='content'>
        <img className='ui avatar image' src={avatar} alt={user} /> {user}
      </div>
      <div className='image'>
        <img src={image} alt={alt} />
      </div>
      <div className='content'>
        <span className='right floated'>
          <i
            className={`heart like icon ${liked ? 'red filled' : 'outline'}`}
            onClick={onLikeClick}
          ></i>
          {numLikes}
        </span>
        <i className='comment icon'></i>
        {comments.length} comments
      </div>
      <div className='extra content'>
        <form onSubmit={onFormSubmit}>
          <div className='ui large transparent left icon input'>
            <i className='heart outline icon'></i>
            <input
              type='text'
              placeholder='Add Comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </form>
        <div class='ui middle aligned divided list'>
          {comments.map((comment) => (
            <div class='item'>
              <i class='large user middle circle icon'></i>
              <div class='content'>{comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
