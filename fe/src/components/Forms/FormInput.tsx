interface FormInputI {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label?: string;
  pattern?: string;
  errorMessage?: string;
  focused?: boolean;
  disabled?: boolean;
  value: any;
  labelStyle?: string;
  inputStyle?: string;
  divStyle?: string;
  required?: boolean;
  options?: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type?: string,
    isPositive?: boolean
  ) => void;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}

const FormInput = ({
  id,
  name,
  type,
  placeholder,
  label,
  pattern,
  errorMessage,
  focused,
  value,
  labelStyle = "",
  inputStyle = "appearance-none border rounded w-full py-2 px-3 leading-tight border-secondary text-gray-700 shadow focus:outline-none focus:shadow-outline disabled:text-black disabled:p-0 disabled:border-transparent disabled:shadow-none ",
  divStyle = "mb-4 w-full ",
  required = true,
  disabled = false,
  options,
  onChange,
  onBlur,
}: FormInputI) => {
  return (
    <div className={`${divStyle}`}>
      <label
        className={`block text-sm mb-2 ${
          disabled ? "border-b-2 py-1 border-secondary" : ""
        } ${labelStyle}`}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          disabled={disabled}
          className={`${inputStyle} resize-none`}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          rows={4}
          onChange={
            onChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>
          }
          onBlur={
            onBlur as unknown as React.ChangeEventHandler<HTMLTextAreaElement>
          }
        />
      ) : type === "radio" ? (
        <div className="flex gap-x-5">
          {options && options.map((option) => (
            <div key={option} className="form-check">
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600  mt-1 mr-2 cursor-pointer"
                type="radio"
                name={name}
                id={option}
                value={option}
                onChange={onChange}
                checked={value === option}
                disabled={disabled}
              />
              <label className="form-check-label inline-block text-gray-800">
                {option}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <input
          disabled={disabled}
          required={required}
          className={inputStyle}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          pattern={pattern}
          value={value}
          onChange={(e) => onChange(e, type, true)}
          onBlur={onBlur}
        />
      )}

      {focused && errorMessage ? (
        <span className="text-red-500 text-xs italic hidden my-1">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default FormInput;
