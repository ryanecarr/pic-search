import React, { Component } from 'react';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likes: props.likes,
      comment: '',
      comments: [],
    };
  }
  onLikeClick = () => {
    this.setState({
      liked: !this.state.liked,
      likes: !this.state.liked ? this.state.likes + 1 : this.state.likes - 1,
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({
      comments: [...this.state.comments, this.state.comment],
    });
  };
  render() {
    const { avatar, user, image, alt } = this.props;
    return (
      <div className='ui raised card'>
        <div className='content'>
          {/* <div className='right floated meta'>14h</div> */}
          <img className='ui avatar image' src={avatar} alt={user} /> {user}
        </div>
        <div className='image'>
          <img src={image} alt={alt} />
        </div>
        <div className='content'>
          <span className='right floated'>
            <i
              className={`heart like icon ${
                this.state.liked ? 'red filled' : 'outline'
              }`}
              onClick={this.onLikeClick}
            ></i>
            {this.state.likes}
          </span>
          <i className='comment icon'></i>
          {this.state.comments.length} comments
        </div>
        <div className='extra content'>
          <form onSubmit={this.onFormSubmit}>
            <div className='ui large transparent left icon input'>
              <i className='heart outline icon'></i>
              <input
                type='text'
                placeholder='Add Comment...'
                value={this.state.comment}
                onChange={(e) => this.setState({ comment: e.target.value })}
              />
            </div>
          </form>
          <div class='ui middle aligned divided list'>
            {this.state.comments.map((comment) => (
              <div class='item'>
                <i class='large user middle circle icon'></i>
                <div class='content'>{comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCard;
