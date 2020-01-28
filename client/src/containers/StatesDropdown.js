import React, { Component } from 'react';
import { List, Divider, Dropdown } from 'semantic-ui-react';
import Waiter from '../components/Loader.js';
import { connect } from 'react-redux';
import { getSelectedStLocationsMarkers } from '../store/actions/maps/setMarkers.js';
import { getSelectedStLocations } from '../store/actions/locations/setSelectedLocation.js';
import { setSelectedProtectedArea } from '../store/actions/locations/setSelectedProtectedArea.js'
import { setSelectedStMap } from '../store/actions/maps/getMap.js'
import { toggleInfoWindow } from '../store/actions/maps/toggleInfoWindow.js'


class StatesDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStateSelected: false,
      isActive: false,
    };

    //can auto bind by form of function
    //func = () => stuff func does;
    //above form auto binds the this
    //cannot do this with functions that call two others
    this.handleStateSelection = this.handleStateSelection.bind(this);
    this.handleMouseenter = this.handleMouseenter.bind(this);
    this.handleMouseleave = this.handleMouseleave.bind(this);
  }

  // mouse enter/mouse leave sets the selected protected area, shows/hides info window
  handleMouseenter(e, value) {
    this.props.protectedAreaSelector({name: e.target.getAttribute('name'), lat: e.target.getAttribute('lat'), lng: e.target.getAttribute('lng')});
    this.props.toggleInfoWindow(true);
  }

  handleMouseleave(e, value) {
    this.props.protectedAreaSelector({name: undefined, lat: undefined, lng: undefined});
    this.props.toggleInfoWindow(false);
  }

  handleStateSelection (e, {value}) {
    if (value !== null && value !== "") {
      console.log("handle location changed tripped with value of: ", value)
      this.props.getSelectedStLocations(value)
      this.props.setSelectedStMap(value)
      this.props.markerMaker(value)
      this.props.toggleInfoWindow(false)
    } else {
      this.props.getSelectedStLocations(null)
      console.log("handle location change tripped on dropdown with null or empty")
    }
  }


  render() {
    let places = this.props.selectedStLocations.map(l =>
      <div key={l.id} className={"hover-list-things"}>
        <List.Icon name="leaf" />
        <div onMouseEnter={this.handleMouseenter} onMouseLeave={this.handleMouseleave}>
          <List.Item as='a' href={'/location-detail/' + this.props.selectedProtectedArea.name}
          content={l.loc}
          name={l.loc}
          key={l.id}
          id={l.id}
          lat={l.lat}
          lng={l.long}
          className={"hover-list-item"}
        />
          </div>
          </div>)

    // return inactive dropdown while markers loading
    if(this.props.markersLoading) return (
      <div>
        <Dropdown
        onChange={this.handleStateSelection}
        placeholder="Select State"
        fluid
        scrolling
        clearable
        options={this.props.stnames}
      />
          <Divider />
          <List >
            <List.Content>
              <Waiter />
            </List.Content>
          </List>
        </div>
        );

    return (
      <div>
        <Dropdown
        onChange={this.handleStateSelection}
        placeholder="Select State"
        fluid
        scrolling
        clearable
        options={this.props.stnames}
      />
          <Divider />
          <List >
            <List.Content>
              {places}
          </List.Content>
          </List>
          <a href='/statenames'>states list</a>
        </div>

        )
};
}

const mapStateToProps = state => ({
  selectedStLocations: state.locations.selectedStLocations,
  selectedProtectedArea: state.locations.selectedProtectedArea,
  stnames: state.locations.stnames,
  markersLoading: state.maps.markersLoading,
})

const mapDispatchToProps = dispatch => ({
  markerMaker(locs) {
    return dispatch(getSelectedStLocationsMarkers(locs))
  },
  protectedAreaSelector(area) {
    return dispatch(setSelectedProtectedArea(area))
  },
  getSelectedStLocations(value) {
    return dispatch(getSelectedStLocations(value))
  },
  setSelectedStMap(st) {
    dispatch(setSelectedStMap(st))
  },
  toggleInfoWindow(val) {
    dispatch(toggleInfoWindow(val))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(StatesDropdown);
