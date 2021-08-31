import React, { useState, useEffect } from 'react';
import ImageLike from './ImageLike';

const UserLikes = ({ fireBaseImages, handleLike, uuid }) => {
  const [images, setImages] = useState([]);

  const getUserLikedImages = () => {
    let images = [];
    // eslint-disable-next-line array-callback-return
    fireBaseImages.map((fbImage) => {
      let like = fbImage.liked_by_user.some((id) => id === uuid);
      like &&
        images.push({
          id: fbImage.id,
          likes: fbImage.likes,
          imageURL: fbImage.image,
        });
    });
    setImages(images);
  };

  useEffect(() => {
    getUserLikedImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fireBaseImages]);

  return (
    <div>
      <div className='ui hidden divider'></div>
      <div className='ui grid'>
        {images.length ? (
          images.map(({ id, likes, imageURL }) => (
            <ImageLike
              id={id}
              likes={likes}
              image={imageURL}
              handleLike={handleLike}
              key={id}
            />
          ))
        ) : (
          <div className='ui one column center aligned'>
            <div class='ui compact message'>
              <p>You haven't liked any images yet!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLikes;
