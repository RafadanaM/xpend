import { useState } from "react";

const TaskItem = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div className="flex items-center ">
      <span className="font-bold mr-2">-</span>
      <span className={`font-medium ${isChecked ? "line-through" : ""}`}>
        Pay Rent
      </span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="ml-auto mr-2 rounded-full focus:ring-0 focus:ring-offset-0 focus:text-primary"
      />
    </div>
  );
};
export default TaskItem;
