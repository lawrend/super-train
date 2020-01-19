import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import StatesDropdown from './StatesDropdown.js';

export default class LeftSideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home',
    }
  }

  //auto binds the this
  handleItemClick = (e) => this.props.resetMap()

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical fixed='left' inverted >
        <Menu.Item
        active={activeItem === 'home'}
        name='All United States'
        onClick={this.handleItemClick}
      />
          <Menu.Item
          name='locations'
          active={activeItem === 'locations'}
        >
            <StatesDropdown  />
          </Menu.Item>
        </Menu>
        )
}
}

