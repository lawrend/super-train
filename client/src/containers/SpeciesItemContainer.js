import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Card } from 'semantic-ui-react';
import { getSelectedStSpecies } from '../store/actions/species/setLocationSpecies.js';
import SpeciesItem from '../components/SpeciesItem';
import Waiter from '../components/Loader.js';

const mapStateToProps = state => ({
  selectedLocationSpecies: state.species.selected_location_species,
  loading: state.species.loading,
})

const mapDispatchToProps = dispatch => ({
  selectedStSpeciesGetter(name) {
    return dispatch(getSelectedStSpecies(name))
  },
});

// *****
class SpeciesItemContainer extends Component {
  constructor(props) {
    super(props)
    this.placeName = this.props.match.params.name;
    this.stName = this.props.match.params.stName;
  }

  componentDidMount() {
    this.props.selectedStSpeciesGetter(this.placeName)
  };

  render() {
    if (this.props.loading) return <Waiter />;

    let species = this.props.selectedLocationSpecies.map(s => <SpeciesItem name={s.name} id={s.id} desc={s.desc} status={s.status} imgsrc={s.imgsrc} key={s.id}/> )

    return(
      <div>
        <Header fixed='top' >
          <div className="header-text">
            <a href='/home'>
              endangered
            </a>
          </div>
        </Header>

        <div>
          <h1 className={'location-name'}>
            {this.placeName}
          </h1>
        </div>

        <Card.Group centered>
          {species}
        </Card.Group>
        <a href='/home'><div className={'home-link'}>Home</div></a>
      </div>
      )

}
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeciesItemContainer);

