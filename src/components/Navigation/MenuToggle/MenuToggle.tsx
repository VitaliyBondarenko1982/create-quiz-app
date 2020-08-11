import React, {FC} from 'react';
import cx from 'classnames';
import './_MenuToggle.scss';

interface Props {
  onToggle: () => void;
  isOpen: boolean;
}

export const MenuToggle: FC<Props> = ({
  onToggle,
  isOpen,
}) => {
  return (
    <i
      className={cx(
        'menu-toggle fa', {
          'fa-times open': isOpen,
          'fa-bars': !isOpen,
        },
      )}
      onClick={onToggle}
    />
  );
};
