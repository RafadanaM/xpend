export const transactionInputs = [
  {
    id: "0",
    name: "title",
    type: "text",
    placeholder: "Transaction Title",
    label: "Text",
    errorMessage: "Title must not be empty!",
  },
  {
    id: "1",
    name: "description",
    type: "text",
    placeholder: "Description",
    label: "Description",
    errorMessage: "Description must not be empty!",
  },
  {
    id: "2",
    name: "amount",
    type: "number",
    placeholder: "100000 / -100000",
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
    errorMessage: "It should be a valid email address!",
  },
  {
    id: "1",
    name: "password",
    type: "password",
    placeholder: "******************",
    label: "Password",
    pattern: "^[a-zA-Z0-9]{8,}$",
    errorMessage: "Password should atleast be 8 letters!",
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
    pattern: "^((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{6,20}$",
    errorMessage: "Password should contain 6-20 letters (atleast 1 upper case, 1 lower case, and 1 number or special character)!",
  },
];
