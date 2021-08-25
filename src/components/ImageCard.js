import React, { useState, useEffect, useRef } from 'react';

const ImageCard = ({
  id,
  avatar,
  user,
  image,
  alt,
  likes,
  liked_by_user,
  imgComments = [],
  handleComment,
  handleLike,
}) => {
  const [liked, setLiked] = useState(liked_by_user);
  const [numLikes, setNumLikes] = useState(likes);
  const [comment, setComment] = useState('');
  const [cardImage, setCardImage] = useState(image);
  const [comments, setComments] = useState(imgComments);
  const firstUpdate = useRef(true);

  const onLikeClick = () => {
    setLiked(!liked);
    setNumLikes(!liked ? numLikes + 1 : numLikes - 1);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleComment(id, numLikes, comment, cardImage);
    setComments([...comments, comment]);
    setComment('');
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      handleLike(id, numLikes, comment, cardImage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked]);

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
        <div className='ui middle aligned divided list'>
          {comments.map((comment) => (
            <div className='item'>
              <i className='large user middle circle icon'></i>
              <div className='content'>{comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
