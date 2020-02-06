import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Card } from 'semantic-ui-react';
import '../css/species.css';
import NotFound from '../resources/resize.jpeg';

export default props => (
  <Card key={props.id} className="species-card" raised={false} color='olive'><Link to={'/species/locations/' + props.id + '/' + props.name}>
      <span className={'species-image'}><Image  src={props.imgsrc==='none' ? NotFound : props.imgsrc} /></span></Link>
    <Card.Content>
      <Link to={'/species/locations/' + props.id + '/' + props.name}>
      <Card.Header >
        <h2><span className={'species-name'}>{props.name}</span></h2>
      </Card.Header>
    </Link>
      <Card.Meta>
        <span className={'status'}>{props.status}</span>
      </Card.Meta>
      <Card.Description>
        <span className={'species-description'}> {props.desc}</span>
      </Card.Description>
      <div>
        <Card.Meta >
          <a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/search?source=hp&q="+ props.name +"&oq=" + props.name}><span className={'click-for-google'}>Search the web for more</span></a>
        </Card.Meta>
      </div>
    </Card.Content>
  </Card>
)
// as='a' href={'/species/locations/' + props.id + '/' + props.name}
//
// from card header
//as='a' href={'/species/locations/' + props.id + '/' + props.name}
