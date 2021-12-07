import { FormEvent, useState } from "react";
import { UserService } from "../../api/services/UserService";
import { registerInputs } from "../../utils/formInputs";
// import useAuth from "../../utils/useAuth";
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
  // const { register } = useAuth();
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

  const inputs = [
    ...registerInputs,
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

  let valueKeys = Object.keys(values) as (keyof RegisterFormType)[];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserService.register(
      values.firstName,
      values.lastName,
      values.email,
      values.password,
      values.confirmPassword
    ).catch((error) => {
      console.log(error.response.data.message);
    });
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
          onSubmit={handleSubmit}
        >
          {inputs.map((input, index) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[valueKeys[index]]}
              onChange={onChange}
              onBlur={() => handleFocus(index)}
              focused={focused[index]}
              labelStyle="font-bold text-white"
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
