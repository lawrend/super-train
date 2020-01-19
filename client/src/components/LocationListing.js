import React from 'react';
import {List} from 'semantic-ui-react';
import '../css/location-listing.css';

export default props => (

  <List>
    <List.Item>
      <List.Content>
        <List.Header as='a' href={'/location-detail/' + props.name} ><span className="location-listing-name">{props.name}</span></List.Header>
        <List.Description>
          <List.Icon name='marker' />
          {props.st}
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
)
