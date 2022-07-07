import { ButtonHTMLAttributes } from 'react';

function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className="px-4 py-2 bg-slate-600 rounded-md text-white hover:bg-slate-700"
    >
      {children}
    </button>
  );
}

export default Button;
