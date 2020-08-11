import React, { FC } from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import './_Drawer.scss';

const links = [1, 2, 3];

interface Props {
  isOpen: boolean;
}

export const Drawer: FC<Props> = ({
  isOpen,
}) => {
  return (
    <nav className={cx('drawer', { close: !isOpen })}>
      <ul className="drawer__list">
        {links.map((link) => {
          return (
            <li className="drawer__item" key={uuidv4()}>
              <a href="#" className="drawer__link">
                {`Link ${link}`}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
