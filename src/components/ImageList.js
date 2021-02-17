import React from 'react';
import ImageCard from './ImageCard';

const ImageList = () => {
  return (
    <>
      {this.props.images.map((image) => (
        <div className='column'>
          <ImageCard
            id={image.user.id}
            avatar={image.user.profile_image.small}
            user={image.user.name}
            image={image.urls.small}
            alt={image.alt_description}
            likes={image.likes}
            key={image.id}
          />
        </div>
      ))}
    </>
  );
};

export default ImageList;
