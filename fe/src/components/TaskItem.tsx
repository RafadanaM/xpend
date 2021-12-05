import { useState } from "react";
import Checkbox from "./Checkbox";

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
      <Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="ml-auto mr-2 rounded-full"
      />
    </div>
  );
};
export default TaskItem;
