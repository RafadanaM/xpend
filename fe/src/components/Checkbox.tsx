import { ChangeEventHandler } from "react";

interface CheckboxI {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Checkbox = ({ checked, onChange, className = "" }: CheckboxI) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`focus:ring-0 focus:ring-offset-0 focus:text-primary ${className}`}
    />
  );
};

export default Checkbox;
