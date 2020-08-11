import React, {ChangeEvent, FC} from 'react';
import cx from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import './_Input.scss';

interface Props {
  type: string;
  label: string;
  value: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  valid: boolean;
  touched: boolean;
  shouldValidate: boolean;
}

function isInvalid(valid: boolean, touched: boolean, shouldValidate: boolean): boolean {
  return !valid && shouldValidate && touched;
}

export const Input: FC<Props> = ({
  type,
  label,
  value,
  name,
  onChange,
  errorMessage,
  valid,
  touched,
  shouldValidate,
}) => {
  const inputType = type || 'text';
  const htmlFor = uuidv4();

  return (
    <div className={cx('input', { invalid: isInvalid(valid, touched, shouldValidate) })}>
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
        name={name}
        onChange={onChange}
      />
      <span className="input__message">
        { isInvalid(valid, touched, shouldValidate) ? errorMessage || 'Enter valid value' : null}
      </span>
    </div>
  );
};
