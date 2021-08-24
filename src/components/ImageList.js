import React from 'react';
import ImageCard from './ImageCard';

const ImageList = ({
  images,
  fireBaseImages,
  handleComment,
  handleLike,
  uuid,
}) => {
  let syncedImages = [];
  const syncImages = () => {
    // eslint-disable-next-line array-callback-return
    images.map((image) => {
      let match = fireBaseImages.find((fbImage) => fbImage.id === image.id);
      let liked_by_user = match?.liked_by_user.some((id) => id === uuid);
      syncedImages.push({
        id: image.id,
        user: image.user,
        alt_description: image.alt_description,
        likes: match?.likes ? match.likes : image.likes,
        urls: image.urls,
        comments: match?.comments ? match.comments : [],
        liked_by_user: liked_by_user ? liked_by_user : false,
      });
    });
  };

  syncImages();

  return (
    <>
      {syncedImages.map(
        ({
          id,
          user,
          alt_description,
          likes,
          urls,
          comments,
          liked_by_user,
        }) => (
          <div className='column'>
            <ImageCard
              id={id}
              avatar={user.profile_image.small}
              user={user.name}
              image={urls.small}
              alt={alt_description}
              likes={likes}
              imgComments={comments}
              handleComment={handleComment}
              handleLike={handleLike}
              liked_by_user={liked_by_user}
              key={id}
            />
          </div>
        )
      )}
    </>
  );
};

export default ImageList;
