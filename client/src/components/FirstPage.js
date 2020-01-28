import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { getLocations } from '../store/actions/locations/getLocations.js';
import { connect } from 'react-redux';
import '../css/first-page.css';


const mapStateToProps = state => ({
  loading: state.locations.loading,
})

const mapDispatchToProps = dispatch => ({
  locationGetter() {
    return dispatch(getLocations)
  },
})

class FirstPage extends Component {

  componentDidMount () {
    this.props.locationGetter()
  }

  render() {
    if (this.props.loading){
      return (
        <div className="landing-page">
          <div className="landing-page-text-div">
            <div className="landing-page-text" >
              end anger ed
            </div>
            <div className="waiting-text">
              please wait...
            </div>
          </div>
        </div>
        )
    } else {
      return (
        <div className="landing-page">
          <div className="landing-page-text-div">
            <Link className="landing-page-text" to="/home">
              end anger ed
            </Link>
          </div>
        </div>
        )}
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);

