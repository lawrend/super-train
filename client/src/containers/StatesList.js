import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Button, Checkbox } from 'semantic-ui-react';
import FavoriteStateItem from '../components/FavoriteStateItem.js';
import { getStNames } from '../store/actions/locations/getLocations.js';
import {resetFavoriteStates, updateFavoriteStates} from '../store/actions/locations/setFavoriteStates.js'

const mapStateToProps = state => ({
  stnames: state.locations.stnames,
  favorites: state.locations.favorites
});

const mapDispatchToProps = dispatch => ({
  getStNames() {
    dispatch(getStNames)
  },
  updateFavoriteStates(favorites) {
    dispatch(updateFavoriteStates(favorites))
  },
  resetFavoriteStates() {
    dispatch(resetFavoriteStates)
  }

})

class StatesList extends Component  {

  constructor(props) {
    super(props)
    this.state = {
      faves: []
    }
    // this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    // this.handleResetClick = this.handleResetClick.bind(this)
  }

  componentDidMount() {
    this.props.getStNames();
  }

  handleClick = () => {
    this.props.updateFavoriteStates(this.state.faves)
  }
  // handleClick() {
  //   this.props.updateFavoriteStates(this.state.faves)
  // }

  handleResetClick = () => {
    this.props.resetFavoriteStates();
    this.setState(() => {
      return {faves: []}
    })

  }
  // handleResetClick() {
  //   this.setState(() => {
  //     return {faves: []}
  //   })
  // }


  handleCheckboxChange = (e, data) => {
    if(data.checked === false ) {
      this.setState({ faves: this.state.faves.filter(name => name !== data.label)})
    } else {
      this.setState((state, props) => {
        return {faves: [...state.faves,  data.label]}
      })
    }
  }

  render() {
    let stNames = this.props.stnames.map(state => <Grid.Column key={state.id}><Checkbox label={state.text}  onChange={this.handleCheckboxChange} defaultChecked={state.favorite}/></Grid.Column>)

    //displays favorites as those in local component state
    let faves = this.state.faves.map(fave => <FavoriteStateItem name={fave} />)

    //displays favorites as those in application level state
    let applicationFaves = this.props.favorites.map(favorite => <FavoriteStateItem name={favorite.name} />);
    return (
      <div>
        <Header fixed='top' >
          <div className="header-text">
            <a href='/home'>
              endangered
            </a>
          </div>
        </Header>
        <h2>States</h2><br />

        <Grid container columns={4} divided textAlign='left'>
          {stNames}
        </Grid>
        <Button onClick={this.handleClick}>Update Favorites</Button>
        <Button onClick={this.handleResetClick}>Reset Favorites</Button>
        <Grid container columns={2}>
          <Grid.Column>
            <h2>
              New Favorites
            </h2>
            {faves}
          </Grid.Column>
          <Grid.Column>
            <h2>
              Favorites
            </h2>
            {applicationFaves}
          </Grid.Column>
        </Grid>
      </div>
      )
}
}
export default connect(mapStateToProps, mapDispatchToProps)(StatesList);

// {props.stnames.map(state =>
// <div>{state.name}</div>
// )}

