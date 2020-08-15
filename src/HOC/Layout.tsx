import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Drawer } from '../components/Navigation/Drawer';
import { MenuToggle } from '../components/Navigation/MenuToggle/MenuToggle';
import { AppState } from '../utils/interfaces';
import './_Layout.scss';

interface StateProps {
  isAuthenticated: boolean;
}

const LayoutTemplate: FC<StateProps> = ({ children, isAuthenticated }) => {
  const [menu, setMenu] = useState(false);

  const toggleMenuHandler = () => {
    setMenu(!menu);
  };

  const menuCloseHandler = () => {
    setMenu(false);
  };

  return (
    <div className="layout">
      <Drawer
        isOpen={menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
      />
      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={menu}
      />
      <main className="layout__main">
        {children}
      </main>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.auth.token,
});

export const Layout = connect(mapStateToProps)(LayoutTemplate);
