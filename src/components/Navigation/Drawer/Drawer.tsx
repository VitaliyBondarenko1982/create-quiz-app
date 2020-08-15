import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { Backdrop } from '../../UI/BackDrop';
import './_Drawer.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

export const Drawer: FC<Props> = ({
  isOpen,
  onClose,
  isAuthenticated,
}) => {
  const clickHandler = () => {
    onClose();
  };

  const links = [
    { to: '/', label: 'List', exact: true },
  ];

  if (isAuthenticated) {
    links.push(
      { to: '/quiz-creator', label: 'Create quiz', exact: false },
      { to: '/logout', label: 'Logout', exact: false },
    );
  } else {
    links.push(
      { to: '/auth', label: 'Authorization', exact: false },
    );
  }

  return (
    <>
      {isOpen ? <Backdrop onClose={onClose} /> : null}
      <nav className={cx('drawer', { close: !isOpen })}>
        <ul className="drawer__list">
          {links.map((link) => {
            return (
              <li className="drawer__item" key={uuidv4()}>
                <NavLink
                  to={link.to}
                  exact={link.exact}
                  activeClassName="active"
                  className="drawer__link"
                  onClick={clickHandler}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
