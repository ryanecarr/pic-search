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
    if (comment !== '') {
      handleComment(id, numLikes, comment, cardImage);
      setComments([...comments, comment]);
      setComment('');
    }
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
    <div className='ui fluid card'>
      <div className='content'>
        <img className='ui avatar image' src={avatar} alt={user} /> {user}
      </div>
      <div className='image'>
        <img src={image} alt={alt} />
      </div>
      <div className='content'>
        <span className='right floated'>
          <i
            className={`large heart like icon ${
              liked ? 'red filled' : 'outline'
            }`}
            onClick={onLikeClick}
          ></i>
        </span>
        {numLikes} likes
      </div>
      <div className='content'>
        <div className='ui middle aligned list'>
          {comments.length ? comments.map((comment) => (
            <div className='item'>
              <div className='content'>
                anonymous <span className='comment'>{comment}</span>
              </div>
            </div>
          )) : '...no comments yet, be the first!'}
        </div>
        <form onSubmit={onFormSubmit}>
          <div className='ui large transparent input fluid comment'>
            <input
              type='text'
              placeholder={
                comments.length >= 5
                  ? 'Commenting disabled...'
                  : 'Add a comment...'
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength='150'
              disabled={comments.length >= 5 ? 'disabled' : ''}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageCard;
