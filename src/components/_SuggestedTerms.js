import React, { PureComponent } from 'react';

class SuggestedTerms extends PureComponent {
  onButtonClick = (e) => {
    this.props.onClick(e.target.value, 'btn');
  };
  render() {
    const { terms } = this.props;
    for (let i = terms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [terms[i], terms[j]] = [terms[j], terms[i]];
    }
    const set = terms.slice(0, Math.floor(Math.random() * terms.length + 1));
    return (
      <div className='row'>
        {set.map((term) => (
          <button
            key={term}
            style={{ marginBottom: '5px' }}
            className='ui button'
            value={term}
            onClick={this.onButtonClick}
          >
            {`#${term}`}
          </button>
        ))}
      </div>
    );
  }
}

export default SuggestedTerms;
