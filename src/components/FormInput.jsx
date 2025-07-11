import React from "react";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
  ...rest
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-1" htmlFor={name}>
      {label}
    </label>
    <input
      className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      {...rest}
    />
  </div>
);

export default FormInput;