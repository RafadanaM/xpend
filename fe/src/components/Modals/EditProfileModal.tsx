import { FormEvent, useEffect, useRef, useState } from "react";
import { UserService } from "../../api/services/UserService";
import User from "../../interfaces/user.interface";
import { editProfileInputs } from "../../utils/formInputs";
// import useAuth from "../../utils/useAuth";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import FormInput from "../Forms/FormInput";

type EditProfileModalType = {
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  password: string;
  confirm_password: string;
};

interface EditProfileModalI {
  open: boolean;
  changeOpen: Function;
  user: User | undefined;
}

const EditProfileModal = ({ open, changeOpen, user }: EditProfileModalI) => {
  //   const { user } = useAuth();
  const currentUser = user;
  const [focused, setFocused] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [values, setValues] = useState<EditProfileModalType>({
    // first_name: user?.first_name,
    // last_name: user?.last_name,
    // email: user?.email,
    first_name: currentUser?.first_name,
    last_name: currentUser?.last_name,
    email: currentUser?.email,
    password: "",
    confirm_password: "",
  });

  let valueKeys = Object.keys(values) as (keyof EditProfileModalType)[];

  const inputs = [
    ...editProfileInputs,
    {
      id: "4",
      name: "confirm_password",
      type: "password",
      placeholder: "******************",
      label: "Confirm Password",
      pattern: values.password,
      errorMessage: "It has to be the same as your password!",
      notRequired: true,
    },
  ];

  const resetModalValue = () => {
    setValues({
      ...values,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      password: "",
      confirm_password: "",
    });
    focused.forEach((value, index) => {
      focused[index] = false;
    });
    setFocused([...focused]);
  };

  useEffect(() => {
    resetModalValue();
  }, [currentUser]);

  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    handleClose();
  });

  const handleFocus = (index: number) => {
    focused[index] = true;
    setFocused([...focused]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password === "") {
      UserService.editProfile({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      } as User)
        .then(async (_) => {
          changeOpen(false);
          resetModalValue();
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      UserService.editProfile(values as User)
        .then(async (_) => {
          changeOpen(false);
          resetModalValue();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleClose = () => {
    changeOpen(false);
    resetModalValue();
  };

  return open ? (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-60 z-50 flex justify-center items-center">
      <div
        className="bg-white md:w-11/12 md:max-w-lg w-full h-full md:h-auto z-50 py-2 flex flex-col"
        ref={modalRef}
      >
        <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
          Edit Profile
        </div>
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[valueKeys[index]]}
                onChange={onChange}
                onBlur={() => handleFocus(index)}
                focused={focused[index]}
                labelStyle="font-medium"
              />
            ))}
            <div className="flex items-center justify-between mb-3 gap-x-4">
              <button
                className="w-full bg-red-600 hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => handleClose()}
              >
                Cancel
              </button>
              <button
                className="w-full bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditProfileModal;
