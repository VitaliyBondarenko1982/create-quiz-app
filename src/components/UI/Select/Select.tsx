import React, { FC, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './_Select.scss';

interface Props {
  label: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: {
    value: string;
    text: string;
  }[];
}

export const Select: FC<Props> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const htmlFor = uuidv4();

  return (
    <div className="select">
      <label htmlFor={htmlFor}>{label}</label>
      <select
        name="select"
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <option
              value={option.value}
              key={uuidv4()}
            >
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};
