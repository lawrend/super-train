import React, { Component } from 'react';
import LocationListing from '../components/LocationListing.js';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { getAllLocationsForSpecies } from '../store/actions/species/getAllLocationsForSpecies.js';

const mapStateToProps = state => ({
  species_locations: state.species.species_locations,
})

const mapDispatchToProps = dispatch => ({
  speciesLocationsGetter(id) {
    return dispatch(getAllLocationsForSpecies(id))
  },
});

class LocationListingsContainer extends Component {
  constructor(props) {
    super(props)
    this.speciesId = this.props.match.params.id;
    this.speciesName = this.props.match.params.speciesName;
  }

  componentDidMount() {
    this.props.speciesLocationsGetter(this.speciesId)
  }

  render() {
    console.log("species locations: " + this.props.species_locations)
    let species_locations =
      this.props.species_locations.map(l => <LocationListing name={l.loc} id={l.id} key={l.id} st={l.st} />)
    return(
      <div>
        <Header fixed='top' >
          <div className="header-text">
            <a href='/home'>
              endangered
            </a>
          </div>
        </Header>


        <h2 className={'species-name'}>Areas That Protect the {this.speciesName}</h2>
        {species_locations}
      </div>
      )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationListingsContainer);
