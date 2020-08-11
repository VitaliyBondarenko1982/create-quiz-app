import React, { Component } from 'react';
import { Drawer } from '../components/Navigation/Drawer';
import { MenuToggle } from '../components/Navigation/MenuToggle/MenuToggle';
import './_Layout.scss';

interface LayoutState {
  menu: boolean;
}

export class Layout extends Component<any, any> {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState((prevState: LayoutState) => ({
      menu: !prevState.menu,
    }));
  };

  render() {
    const { menu } = this.state;

    return (
      <div className="layout">
        <Drawer
          isOpen={menu}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={menu}
        />
        <main className="layout__main">
          {this.props.children}
        </main>
      </div>
    );
  }
}
