// import all relevant pieces of react-router-dom, and all components rendered by routes
import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Home from './containers/Home.js'
import FirstPage from './components/FirstPage.js';
import ErrorRoute from './components/ErrorRoute';
import SpeciesItemContainer from './containers/SpeciesItemContainer.js';
import LocationListingsContainer from './containers/LocationListingsContainer';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={FirstPage} />
        <Route path="/home" component={Home} />
        <Route path="/location-detail/:name" component={SpeciesItemContainer} />
        <Route path="/species/locations/:id/:speciesName" component={LocationListingsContainer} />
        <Route component={ErrorRoute} />
      </Switch>
        )
}
};

export default withRouter(Routes);



