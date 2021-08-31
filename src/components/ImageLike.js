import React, { useState, useEffect, useRef } from 'react';

const ImageLike = ({ id, likes, image, handleLike }) => {
  const [numLikes, setNumLikes] = useState(likes);
  const firstUpdate = useRef(true);

  const onRemoveClick = () => {
    setNumLikes(numLikes - 1);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      handleLike(id, numLikes, null, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numLikes]);

  return (
    <div className='ui four wide column'>
      <div className='icon-holder' onClick={onRemoveClick}>
        <i class='red times circle icon big'></i>
      </div>
      <img className='ui large bordered image shadow' src={image} alt='' />
    </div>
  );
};

export default ImageLike;
