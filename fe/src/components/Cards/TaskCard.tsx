import TaskItem from "../TaskItem";
import BaseCard from "./BaseCard";

export const TaskCard = () => {
  return (
    <BaseCard title="Tasks">
      <div className="mt-2 text-sm w-full">
        <TaskItem />
      </div>
    </BaseCard>
  );
};
