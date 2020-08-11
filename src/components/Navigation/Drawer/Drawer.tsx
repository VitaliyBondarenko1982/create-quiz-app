import React, { FC } from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import './_Drawer.scss';
import {Backdrop} from "../../UI/BackDrop";

const links = [1, 2, 3];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer: FC<Props> = ({
  isOpen,
  onClose
}) => {
  return (
    <>
      {isOpen ? <Backdrop onClose={onClose} /> : null}
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
    </>
  );
};
