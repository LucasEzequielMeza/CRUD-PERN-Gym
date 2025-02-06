import { forwardRef } from 'react';
import React from 'react';

export const Select = forwardRef(({ options, ...props }, ref) => {
  return (
    <select ref={ref} className='bg-zinc-800 px-3 py-2 block my-2 w-full text-white' {...props}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default Select;
