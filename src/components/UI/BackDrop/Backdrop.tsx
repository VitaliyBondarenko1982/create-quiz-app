import React, { FC } from 'react';
import './_Backdrop.scss';

interface Props {
  onClose: () => void;
}

export const Backdrop: FC<Props> = ({ onClose }) => {
  return (
    <div
      className="backdrop"
      onClick={onClose}
    />
  );
};
