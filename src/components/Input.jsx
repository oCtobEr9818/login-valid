import { forwardRef } from "react";

const Input = forwardRef(
  (
    { id, type, value, onChange, label, errors, errorsMessage, autoFocus },
    ref
  ) => {
    return (
      <div className="mb-4 relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          autoComplete="off"
          autoFocus={autoFocus}
          ref={ref}
          className="
          w-full
          py-3
          px-5
          rounded-md
          border
        border-[#dadee6]
          bg-transparent
          text-base text-body-color
          outline-none
          transition-all duration-300 ease-in-out
          focus:border-blue-600
          peer
        "
        />
        <label
          htmlFor={id}
          className="
          absolute top-2 left-3 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-100 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-4 pointer-events-none
        "
        >
          {label}
        </label>

        <div className="text-left py-1">
          {errors && (
            <span className="text-red-400 text-sm m-2 p-2">
              {errorsMessage}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
