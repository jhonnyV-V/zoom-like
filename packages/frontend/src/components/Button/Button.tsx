import React from 'react';

export enum Sizes {
  xs = 'text-xs',
  sm = 'text-sm',
  lg = 'text-lg',
  xl = 'text-xl',
  xl2 = 'text-2xl',
  xl3 = 'text-3xl',
  xl4 = 'text-4xl',
}

export interface ButtonProps {
  size?: Sizes;
  text: string;
  onClick: VoidFunction;
}

const Button: React.FC<ButtonProps> = ({
  text = '',
  size = Sizes.xl2,
  onClick = () => console.log('click'),
}) => {
  return (
    <div>
      <button
        type="button"
        className={`my-6 rounded-full bg-[#183942] px-2 py-2 ${size} text-white shadow-md transition-all hover:bg-[#1e6072]`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
