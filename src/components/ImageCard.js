import React, { Component } from 'react';

class ImageCard extends Component {
  render() {
    const { id, avatar, user, image, alt, likes } = this.props;
    return (
      <div className='ui raised card'>
        <div className='content'>
          {/* <div className='right floated meta'>14h</div> */}
          <img className='ui avatar image' src={avatar} alt={id} /> {user}
        </div>
        <div className='image'>
          <img src={image} alt={alt} />
        </div>
        <div className='content'>
          <span className='right floated'>
            <i className='heart outline like icon'></i>
            {likes}
          </span>
          {/* <i className='comment icon'></i>3 comments */}
        </div>
        {/* <div className='extra content'>
                <div className='ui large transparent left icon input'>
                  <i className='heart outline icon'></i>
                  <input type='text' placeholder='Add Comment...' />
                </div>
              </div> */}
      </div>
    );
  }
}

export default ImageCard;
