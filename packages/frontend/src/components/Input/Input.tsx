import React from 'react';

export interface InputProps {
  labelClass?: string;
  label?: string;
  inputClass?: string;
  id?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange(event: any): VoidFunction;
}

const Input: React.FC<InputProps> = ({
  labelClass = '',
  inputClass = '',
  id = '',
  placeholder = '',
  name = '',
  label = '',
  value = '',
  onChange,
}) => {
  return (
    <div>
      {Boolean(label) && (
        <label
          className={`mb-2 block text-sm font-bold text-gray-700 ${labelClass}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${inputClass}`}
        id={id}
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
