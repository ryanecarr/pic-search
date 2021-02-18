import React from 'react';
import ImageCard from './ImageCard';

const ImageList = (props) => {
  return (
    <>
      {props.images.map(({ id, user, alt_description, likes, urls }) => (
        <div className='column'>
          <ImageCard
            avatar={user.profile_image.small}
            user={user.name}
            image={urls.small}
            alt={alt_description}
            likes={likes}
            key={id}
          />
        </div>
      ))}
    </>
  );
};

export default ImageList;
