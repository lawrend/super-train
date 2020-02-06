import React, {Component} from 'react';

class FavoriteStateItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      voteTotal: 0,
    }
  }

  handleButtonClick = () => {
    this.setState({
      voteTotal: this.state.voteTotal + 1
    })
  }

  render() {
    return (
      <div>
        <h3>
          <button type='button' onClick={this.handleButtonClick} />{this.props.name} {this.state.voteTotal}
        </h3>

      </div>

      )
  }
}

export default FavoriteStateItem;
