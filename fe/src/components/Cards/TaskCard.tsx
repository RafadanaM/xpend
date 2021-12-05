import TaskItem from "../TaskItem";
import BaseCard from "./BaseCard";

export const TaskCard = () => {
  return (
    <BaseCard title="Tasks" className="col-span-2 md:col-span-1">
      <div className="mt-2 text-sm w-full">
        <TaskItem />
      </div>
    </BaseCard>
  );
};
