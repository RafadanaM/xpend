import { FormEvent, useState } from "react";

const useForm = <T>(value: T, callback: () => void) => {
  const [formData, setFormData] = useState<typeof value>(value);
  const [focused, setFocused] = useState<boolean[]>(
    Object.keys(value).map(() => false)
  );

  const handleFocus = (index: number) => {
    focused[index] = true;
    setFocused([...focused]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback();
  };

  return { formData, focused, handleFocus, handleChange, onSubmit, resetForm };
};

export default useForm;
