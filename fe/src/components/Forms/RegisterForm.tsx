import { FormEvent, useState } from "react";
import FormInput from "./FormInput";

interface RegisterFormI {
  handleChangeForm: Function;
}

type RegisterFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = ({ handleChangeForm }: RegisterFormI) => {
  const [focused, setFocused] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [values, setValues] = useState<RegisterFormType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let valueKeys = Object.keys(values) as (keyof RegisterFormType)[];

  const inputs = [
    {
      id: "0",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      label: "First Name",
      errorMessage: "Please enter your first name!",
    },
    {
      id: "1",
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      label: "Last Name",
      errorMessage: "Please enter your last name!",
    },
    {
      id: "2",
      name: "email",
      type: "email",
      placeholder: "example@mail.com",
      label: "Email",
      errorMessage: "It should be a valid email address!",
    },
    {
      id: "3",
      name: "password",
      type: "password",
      placeholder: "******************",
      label: "Password",
      pattern: "^[a-zA-Z0-9]{8,}$",
      errorMessage: "Password should atleast be 8 letters!",
    },
    {
      id: "4",
      name: "confirmPassword",
      type: "password",
      placeholder: "******************",
      label: "Confirm Password",
      pattern: values.password,
      errorMessage: "It has to be the same as your password!",
    },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFocus = (index: number) => {
    focused[index] = true;
    setFocused([...focused]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-auto mx-auto">
      <div className="w-full max-w-xs">
        <form
          className="bg-primary shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4"
          onSubmit={() => handleSubmit}
        >
          {inputs.map((input, index) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[valueKeys[index]]}
              onChange={onChange}
              onBlur={() => handleFocus(index)}
              focused={focused[index]}
            />
          ))}
          <div className="flex items-center justify-between mb-3">
            <button
              className="w-full bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="inline-block align-baseline font-bold text-xs text-white">
              Already have an account?{" "}
              <span
                className="text-accent-orange hover:text-opacity-70 cursor-pointer"
                onClick={() => handleChangeForm(true)}
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
