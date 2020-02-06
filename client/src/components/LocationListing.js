import React from 'react';
import { Link } from 'react-router-dom';
import {List} from 'semantic-ui-react';
import '../css/location-listing.css';

export default props => (

  <List>
    <List.Item>
      <List.Content>
        <Link to={'/location-detail/' + props.name}>
          <List.Header  ><span className="location-listing-name">{props.name}</span></List.Header>
        </Link>
        <List.Description>
          <List.Icon name='marker' />
          {props.st}
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
)

// as='a' href={'/location-detail/' + props.name}
