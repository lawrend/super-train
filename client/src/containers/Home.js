import React, { Component } from 'react';
import LeftSideMenu from './LeftSideMenu.js';
import MapsContainer from './MapsContainer.js';
import { setSelectedProtectedArea } from '../store/actions/locations/setSelectedProtectedArea.js';
import { setMapCenter, setMapZoom } from '../store/actions/maps/getMap.js'
import { toggleInfoWindow } from '../store/actions/maps/toggleInfoWindow.js'
import { setMarkersLoadingValue } from '../store/actions/maps/setMarkersLoadingValue.js'
import { getStNames } from '../store/actions/locations/getLocations.js';
import { setSelectedSt, getSelectedStLocations } from '../store/actions/locations/setSelectedLocation.js';
import { connect } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import '../css/header.css';

const USA_CENTER = {lat: 36.8097343, lng: -91.5556199};
const HIGH_ZOOM = 5;

class Home extends Component {
  constructor(props) {
    super(props)
    this.resetMap = this.resetMap.bind(this);
  }

  resetMap() {
    this.props.zoomSetter(HIGH_ZOOM);
    this.props.centerSetter(USA_CENTER);
    this.props.selectedStSetter(null);
    this.props.selectedStLocationsGetter(null);
  }

  componentDidMount() {
    this.props.stNamesGetter();
  }

  render() {
    return (
      <div>
        <Header fixed='top' >
          <div className="header-text">
            endangered
          </div>
        </Header>

        <LeftSideMenu resetMap={this.resetMap} />
        <div className='maps homepage'>
          <MapsContainer
          zoom={this.props.zoom}
          center={this.props.center}
          selectedStLocations={this.props.selectedStLocations}
          selectedProtectedArea={this.props.selectedProtectedArea}
          setSelectedProtectedArea={this.props.protectedAreaSelector}
          showingInfoWindow={this.props.showingInfoWindow}
          toggleInfoWindow={this.props.toggleInfoWindow}
          setMarkersLoadingValue={this.props.setMarkersLoadingValue}
        />
            <Divider />
          </div>
        </div>
        )
  }
}

const mapStateToProps = (state) => ({
  selectedStLocations: state.locations.selectedStLocations,
  selectedProtectedArea: state.locations.selectedProtectedArea,
  zoom: state.maps.zoom,
  center: state.maps.center,
  showingInfoWindow: state.maps.showingInfoWindow,
})

const mapDispatchToProps = dispatch => ({
  protectedAreaSelector(area) {
    return dispatch(setSelectedProtectedArea(area))
  },
  zoomSetter(zoom) {
    return dispatch(setMapZoom(zoom))
  },
  centerSetter(center) {
    return dispatch(setMapCenter(center))
  },
  stNamesGetter() {
    return dispatch(getStNames)
  },
  selectedStSetter(loc) {
    return dispatch(setSelectedSt(loc))
  },
  selectedStLocationsGetter(st) {
    return dispatch(getSelectedStLocations(st))
  },
  toggleInfoWindow(val) {
    return dispatch(toggleInfoWindow(val))
  },
  setMarkersLoadingValue(val) {
    return dispatch(setMarkersLoadingValue(val))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);


