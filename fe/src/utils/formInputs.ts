export const transactionInputs = [
  {
    id: "0",
    name: "title",
    type: "text",
    placeholder: "Title",
    label: "Title",
    errorMessage: "Title must not be empty!",
  },
  {
    id: "1",
    name: "description",
    type: "textarea",
    placeholder: "Description",
    label: "Description",
    errorMessage: "Description must not be empty!",
  },
  {
    id: "2",
    name: "amount",
    type: "number",
    placeholder: "1000",
    label: "Amount",
    errorMessage: "Amount must be a number!",
  },
  {
    id: "3",
    name: "date",
    type: "datetime-local",
    placeholder: "",
    label: "Date & Time",
    errorMessage: "Date & Time cannot be empty!",
  },
];

export const loginInputs = [
  {
    id: "0",
    name: "email",
    type: "email",
    placeholder: "example@mail.com",
    label: "Email",
  },
  {
    id: "1",
    name: "password",
    type: "password",
    placeholder: "******************",
    label: "Password",
  },
];

export const registerInputs = [
  {
    id: "0",
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    label: "First Name",
    pattern: "^[a-zA-Z0-9]{2,}$",
    errorMessage: "Should contain atleast 2 characters!",
  },
  {
    id: "1",
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    label: "Last Name",
    pattern: "^[a-zA-Z0-9]{2,}$",
    errorMessage: "Should contain atleast 2 characters!",
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
    pattern:
      "^((?=.*[0-9])|(?=.*[a-zA-Z0-9_]+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{6,20}$",
    errorMessage:
      "Password should contain 6-20 letters (atleast 1 upper case, 1 lower case, and 1 number or special character)!",
  },
];

export const editProfileInputs = [
  {
    id: "0",
    name: "first_name",
    type: "text",
    placeholder: "First Name",
    label: "First Name",
    pattern: "^[a-zA-Z0-9]{2,}$",
    errorMessage: "Should contain atleast 2 characters!",
  },
  {
    id: "1",
    name: "last_name",
    type: "text",
    placeholder: "Last Name",
    label: "Last Name",
    pattern: "^[a-zA-Z0-9]{2,}$",
    errorMessage: "Should contain atleast 2 characters!",
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
    name: "previous_password",
    type: "password",
    placeholder: "******************",
    label: "Previous Password",
    errorMessage: "Please enter your previous password!",
  },
  {
    id: "4",
    name: "new_password",
    type: "password",
    placeholder: "******************",
    label: "New Password",
    pattern:
      "^((?=.*[0-9])|(?=.*[a-zA-Z0-9_]+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{6,20}$",
    errorMessage:
      "Password should contain 6-20 letters (atleast 1 upper case, 1 lower case, and 1 number or special character)!",
  },
];

export const taskInputs = [
  {
    id: "0",
    name: "title",
    type: "text",
    placeholder: "Title",
    label: "Title",
    errorMessage: "Title must not be empty!",
  },
  {
    id: "1",
    name: "description",
    type: "textarea",
    placeholder: "Description",
    label: "Description",
    errorMessage: "Description must not be empty!",
  },
  {
    id: "2",
    name: "amount",
    type: "number",
    placeholder: "1000",
    label: "Amount",
    errorMessage: "Amount must be a number!",
  },
];

export const searchInputs = [
  {
    id: "0",
    name: "searchText",
    type: "text",
    placeholder: "Title or description",
    required: false,
    inputStyle:
      "appearance-none border rounded w-full px-2 py-1 leading-tight border-secondary text-gray-700 shadow focus:outline-none focus:shadow-outline text-xs md:text-sm",
    divStyle: "mb-2 md:flex-grow",
  },
  {
    id: "1",
    name: "searchDate",
    type: "month",
    placeholder: "",
    required: false,
    inputStyle:
      "appearance-none border rounded w-full px-2 py-1 leading-tight border-secondary text-gray-700 shadow focus:outline-none focus:shadow-outline text-xs md:text-sm",
    divStyle: "mb-2",
  },
];
