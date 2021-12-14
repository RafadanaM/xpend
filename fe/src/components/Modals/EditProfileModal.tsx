import { FormEvent, useRef, useState } from "react";
import { UserService } from "../../api/services/UserService";
import User from "../../interfaces/user.interface";
import { editProfileInputs } from "../../utils/formInputs";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import FormInput from "../Forms/FormInput";

type EditProfileModalType = {
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  previous_password: string;
  new_password: string;
  confirm_password: string;
};

interface EditProfileModalI {
  page: string;
  changeOpen: Function;
  user: User | undefined;
}

const EditProfileModal = ({ page, changeOpen, user }: EditProfileModalI) => {
  const currentUser = user;
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [values, setValues] = useState<EditProfileModalType>({
    first_name: currentUser?.first_name,
    last_name: currentUser?.last_name,
    email: currentUser?.email,
    previous_password: "",
    new_password: "",
    confirm_password: "",
  });

  let valueKeys = Object.keys(values) as (keyof EditProfileModalType)[];

  const inputs = [
    ...editProfileInputs,
    {
      id: "5",
      name: "confirm_password",
      type: "password",
      placeholder: "******************",
      label: "Confirm Password",
      pattern: values.new_password,
      errorMessage: "It has to be the same as your new password!",
      notRequired: true,
    },
  ];

  const resetModalValue = () => {
    setValues({
      ...values,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      new_password: "",
      confirm_password: "",
    });
    focused.forEach((value, index) => {
      focused[index] = false;
    });
    setFocused([...focused]);
  };

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
    if (values.new_password === "") {
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
          console.log(err.response.data.message);
          setError(err.response.data.message);
        });
    } else {
      UserService.editProfile(values as User)
        .then(async (_) => {
          changeOpen(false);
          resetModalValue();
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setError(err.response.data.message);
        });
    }
  };

  const handleClose = () => {
    changeOpen(false);
    resetModalValue();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-60 z-20 flex justify-center items-center">
      <div
        className="bg-white md:w-11/12 md:max-w-lg w-full h-full md:h-auto z-50 py-2 flex flex-col"
        ref={modalRef}
      >
        <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
          {page === "profile" ? "Edit Profile" : "Change Password"}
        </div>
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => {
              if (
                (page === "profile" &&
                  ["first_name", "last_name", "email"].includes(input.name)) ||
                (page === "password" &&
                  [
                    "previous_password",
                    "new_password",
                    "confirm_password",
                  ].includes(input.name))
              ) {
                return (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[valueKeys[index]]}
                    onChange={onChange}
                    onBlur={() => handleFocus(index)}
                    focused={focused[index]}
                    labelStyle="font-medium"
                  />
                );
              } else {
                return null;
              }
            })}
            <p className="text-red-500 text-xs italic mb-5">{error}</p>
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
  );
};

export default EditProfileModal;
