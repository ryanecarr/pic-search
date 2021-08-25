import React, { useState, useEffect } from 'react';

const UserLikes = ({ fireBaseImages, uuid }) => {
  const [images, setImages] = useState([]);

  const getUserLikedImages = () => {
    let images = [];
    // eslint-disable-next-line array-callback-return
    fireBaseImages.map((fbImage) => {
      let like = fbImage.liked_by_user.some((id) => id === uuid);
      like && images.push(fbImage.image);
    });
    setImages(images);
  };

  useEffect(() => {
    getUserLikedImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireBaseImages]);

  return (
    <div>
      <div class='ui hidden divider'></div>
      <div className='ui grid'>
        {images.map((image) => (
          <div className='four wide column'>
            <img className='ui large bordered image' src={image} alt='image' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLikes;
