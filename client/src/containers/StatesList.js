import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, List, Button, Checkbox } from 'semantic-ui-react';
import { getStNames } from '../store/actions/locations/getLocations.js';
import {setFavoriteStates} from '../store/actions/locations/setFavoriteStates.js'


const mapStateToProps = state => ({
  stnames: state.locations.stnames,
});

const mapDispatchToProps = dispatch => ({
  getStNames() {
    dispatch(getStNames)
  }
})

class StatesList extends Component  {
  componentDidMount() {
    this.props.getStNames();
  }

  render() {
    let stNames = this.props.stnames.map(state => <List.Item><Checkbox label={state.text} radio={true}>{state.text}</Checkbox></List.Item>)
    return (
    <div>
        <Header fixed='top' >
          <div className="header-text">
            <a href='/home'>
              endangered
            </a>
          </div>
        </Header>
        <List relaxed>
      <List.Header>
        Favorite States
      </List.Header>
      {stNames}
      </List>
    </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StatesList);

// {props.stnames.map(state =>
// <div>{state.name}</div>
// )}

