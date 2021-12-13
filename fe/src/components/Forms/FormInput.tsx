interface FormInputI {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label?: string;
  pattern?: string;
  errorMessage?: string;
  focused?: boolean;
  value: any;
  labelStyle?: string;
  inputStyle?: string;
  divStyle?: string;
  notRequired?: boolean;
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
  inputStyle = "appearance-none border rounded w-full py-2 px-3 leading-tight border-secondary text-gray-700 shadow focus:outline-none focus:shadow-outline",
  divStyle = "mb-4 w-full ",
  notRequired = false,
  onChange,
  onBlur,
}: FormInputI) => {
  return (
    <div className={`${divStyle}`}>
      <label className={`block text-sm mb-2 ${labelStyle}`}>{label}</label>
      {type === "textarea" ? (
        <textarea
          required
          className={inputStyle}
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
        <>
          {notRequired ? (
            <input
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
          ) : (
            <input
              required
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
        </>
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
