import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, List, Button, Checkbox } from 'semantic-ui-react';
import { getStNames } from '../store/actions/locations/getLocations.js';
import {setFavoriteStates} from '../store/actions/locations/setFavoriteStates.js'


const mapStateToProps = state => ({
  stnames: state.locations.stnames,
});

const mapDispatchToProps = dispatch => ({
  getStNames() {
    dispatch(getStNames)
  },
  setFavoriteStates(favorites) {
    dispatch(setFavoriteStates(favorites))
  }
})



class StatesList extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      faves: []
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getStNames();
  }
  handleClick() {
    this.props.setFavoriteStates(this.state.faves)
  }

  handleCheckboxChange(e, data) {
    this.setState((state, props) => {
      return {faves: [...state.faves,  data.label]
      }}
    )
  }

  render() {
    console.log(this.state.faves)
    let stNames = this.props.stnames.map(state => <List.Item key={state.id}><Checkbox label={state.text} radio={true} onChange={this.handleCheckboxChange}/></List.Item>)
    return (
      <div>
        <Header fixed='top' >
          <div className="header-text">
            <a href='/home'>
              endangered
            </a>
          </div>
        </Header>
        <h2>Favorite States</h2>

        <List relaxed>

          <Grid columns={3}>
            {stNames}
          </Grid>
        </List>
        <Button onClick={this.handleClick}>Save Faves</Button>
        <Button onClick={this.handleResetClick}>Reset Favorites</Button>
      </div>
      )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StatesList);

// {props.stnames.map(state =>
// <div>{state.name}</div>
// )}

