import React, { FC } from 'react';
import cx from 'classnames';
import './_Button.scss';

interface Props {
  disabled: boolean;
  buttonType: string;
  onClick: () => void;
}

export const Button: FC<Props> = ({
  buttonType,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx('button', buttonType)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
