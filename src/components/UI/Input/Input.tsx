import React, { FC } from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import './_Input.scss';

interface Props {
  type: string;
  label: string;
  value: string;
  onChange?: () => void;
  errorMessage?: string;
}

export const Input: FC<Props> = ({
  type,
  label,
  value,
  onChange,
  errorMessage,
}) => {
  const inputType = type || 'text';
  const htmlFor = uuidv4();

  return (
    <div className={cx('input', { invalid: false })}>
      <label
        htmlFor="{htmlFor}"
        className="input__label"
      >
        {label}
      </label>
      <input
        className="input__field"
        type={inputType}
        id={htmlFor}
        value={value}
        onChange={onChange}
      />
      <span className="input__message">
        { false ? errorMessage || 'Enter valid value' : null}
      </span>
    </div>
  );
};
