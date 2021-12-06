interface FormInputI {
    id: string;
    name: string;
    type: string;
    placeholder: string;
    label: string;
    pattern?: string;
    errorMessage: string;
    focused: boolean;
    value: any;
    labelStyle?: string;
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
    onChange,
    onBlur,
  }: FormInputI) => {
    return (
      <div className="mb-4">
        <label className={`block text-sm mb-2 ${labelStyle}`}>{label}</label>
        <input
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          pattern={pattern}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        {focused ? (
          <span className="text-red-500 text-xs italic hidden my-1">
            {errorMessage}
          </span>
        ) : null}
      </div>
    );
  };
  
  export default FormInput;