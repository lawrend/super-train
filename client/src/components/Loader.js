import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

function Waiter() {
  return (
    <Segment>
    <Dimmer active >
      <Loader inverted indeterminate >loading...really</Loader>
      </Dimmer>
    </Segment>
    );
}

export default Waiter
