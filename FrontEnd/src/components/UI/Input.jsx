import { forwardRef } from 'react'
import React from 'react'

export const Input = forwardRef((props, ref) => {
    return (
        <input ref={ref} className='bg-zinc-800 px-3 py-2 block my-2 w-full text-white' {...props} />
      );
});

export default Input
