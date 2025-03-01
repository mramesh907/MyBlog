import React,{ useId} from 'react'

const Input = React.forwardRef(({
    label,
    type='text',
    className='',
    ...props
},ref) => {
    const id=useId()
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className} `}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  )
})

export default Input