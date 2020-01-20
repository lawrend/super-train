import React, { Component } from 'react';
import { InfoWindow, Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { MAPS_KEY } from '../config.js';
import cromlech from '../resources/cromlech.png';

export class MapsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markersDone: false,
    }
  }

  onMarkerHover = (props, marker, e) => {
    if(marker.name !== this.props.selectedProtectedArea.name) {
      this.props.setSelectedProtectedArea({name: props.name, id: props.id, lat: marker.lat, lng: marker.lng})
    }
    if (!this.props.showingInfoWindow) {
      this.props.toggleInfoWindow(true);
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.props.setSelectedProtectedArea({ name: props.name, id: props.id })
  }

  onMapClicked = (props) => {
    if (this.props.showingInfoWindow) {
      this.props.toggleInfoWindow(false)
    }
  }

  componentDidUpdate= () => {
    if(
      (this.props.selectedStLocations.length > 0)
      &&
      (
        (this.props.selectedStLocations[this.props.selectedStLocations.length -1].lat === null)
        ||
        (this.props.selectedStLocations[this.props.selectedStLocations.length -1].lat === undefined))
    )
    {
      this.props.setMarkersLoadingValue(true)
    } else {
      this.props.setMarkersLoadingValue(false)
    }

  }

  render () {
    const icon_url = {url: cromlech, scaledSize: new this.props.google.maps.Size(34, 34)};

    let markers = this.props.selectedStLocations.map(l=> { return <Marker icon={icon_url} onClick={this.onMarkerClick} onMouseover={this.onMarkerHover} lat={l.lat} lng={l.long} position={{lat: l.lat, lng: l.long}} name={l.loc} key={l.id} >
      </Marker>})

    //map styles
    const styles =
      [
        {featureType: 'poi.business',
          stylers: [
            {visibility: 'off'},
          ]
        },
        {featureType: 'all',
          stylers: [
            {saturation: -100},
          ]
        },
        {featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {'color': '#27A73A'},
            {'opacity': 1},
          ]
        },
        {featureType: 'poi.park',
          elementType: 'labels.text',
          stylers: [
            {'color': '#2C3031'},
            {'weight': .4},
          ]
        },
        {featureType: 'administrative.locality',
          elementType: 'labels.text',
          stylers: [
            {'weight': .2},
            {'color': '#3A3D36'},
          ]
        },
        {featureType: 'water',
          stylers: [
            {'color': '#6F7661'}
          ]
        },
      ]

    return (
      <div>
        <Map google={this.props.google} zoom={this.props.zoom} mapType={'terrain'} mapTypeControl={false} initialCenter={this.props.center} center={this.props.center} styles={styles} onClick={this.onMapClicked} >
          {markers}
            <InfoWindow
            visible={this.props.showingInfoWindow}
            position={{lat: this.props.selectedProtectedArea.lat, lng: this.props.selectedProtectedArea.lng}}>

            <span className={"area-name-info-window"}>
              <div><a href={'/location-detail/' + this.props.selectedProtectedArea.name}>
                  <h1>{this.props.selectedProtectedArea.name}</h1>
              </a></div>
          </span></InfoWindow>
        </Map>
      </div>
      )
}
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapsContainer)

//to make map un navigatable use gestureHandling={'none'}
