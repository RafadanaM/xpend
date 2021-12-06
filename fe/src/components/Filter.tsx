import { useState } from "react";
import { sortEnum } from "../enums";
import RadioInput from "./RadioInput";

export const Filter = () => {
  const [selectedShow, setSelectedShow] = useState(sortEnum.THIS_MONTH);
  return (
    <div className="bg-secondary rounded px-2 py-1 md:mt-10">
      <div className="flex flex-col">
        <label className="font-medium">Show:</label>
        <div className="flex items-center gap-x-2">
          {Object.values(sortEnum).map((enumValue) => (
            <RadioInput
              value={enumValue}
              selected={selectedShow}
              onChange={setSelectedShow}
              label={enumValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
