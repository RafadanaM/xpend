import { FormEvent, useState } from "react";
import { loginInputs } from "../../utils/formInputs";
import FormInput from "./FormInput";
import useAuth from "../../utils/useAuth";
interface LoginFormI {
  handleChangeForm: Function;
}

type LoginFormType = {
  email: string;
  password: string;
};

const LoginForm = ({ handleChangeForm }: LoginFormI) => {
  const { login, error } = useAuth();
  const [focused, setFocused] = useState<boolean[]>([false, false]);
  const [values, setValues] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  let valueKeys = Object.keys(values) as (keyof LoginFormType)[];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(values.email, values.password);
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
          className="bg-primary shadow-md rounded px-8 pt-6 pb-8 mb-4 my-4"
          onSubmit={handleSubmit}
        >
          {loginInputs.map((input, index) => (
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
          <p className="text-red-500 text-xs italic mb-5">{error}</p>
          <div className="flex items-center justify-between mb-3">
            <button
              className="w-full bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="flex items-center justify-between">
            <p className="inline-block align-baseline font-bold text-xs text-white">
              Don't have an account?{" "}
              <span
                className="text-accent-orange hover:text-opacity-70 cursor-pointer"
                onClick={() => handleChangeForm(false)}
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
