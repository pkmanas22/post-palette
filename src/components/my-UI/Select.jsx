import { forwardRef, useId } from 'react'

function Select({
    options = [],
    label,
    className = "",
    ...props
}, ref) {

    const id = useId();

    return (
        <div>
            {label && <label htmlFor={id} className='inline-block mr-2 font-semibold'>{label}</label>}
            <select
                ref={ref}
                id={id}
                {...props}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select); // Another way to use forwardRef