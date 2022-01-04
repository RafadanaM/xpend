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
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
          onChange={onChange}
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
