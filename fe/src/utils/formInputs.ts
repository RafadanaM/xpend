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
