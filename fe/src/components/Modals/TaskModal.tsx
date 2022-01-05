import { FormEvent, useState } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import FormInput from "../Forms/FormInput";
import { taskInputs } from "../../utils/formInputs";
import { TaskService } from "../../api/services/TaskService";
import Task from "../../interfaces/task.interface";
import BaseModal from "./BaseModal";
import useForm from "../../utils/useForm";

interface TaskModalI {
  onCancel: Function;
  setTasks: Function;
  task: Task | undefined;
}

type TaskModalType = {
  title: string;
  description: string;
  amount: number;
};

export const TaskModal = ({ onCancel, setTasks, task }: TaskModalI) => {
  const handleCallback = () => {
    if (task) {
      TaskService.editTask(
        formData.title,
        formData.description,
        +formData.amount,
        task.id
      ).then(({ data }) => {
        setTasks((prevState: Task[]) =>
          prevState.map((task) => {
            if (task.id === data.id) {
              return { ...data, transacations: task.transactions };
            }
            return task;
          })
        );
      });
    } else {
      TaskService.createTask(
        formData.title,
        formData.description,
        +formData.amount
      )
        .then(({ data }) => {
          setTasks((prevState: Task[]) => [...prevState, data]);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    onCancel(false);
  };

  const { formData, focused, handleFocus, handleChange, onSubmit } =
    useForm<TaskModalType>(
      {
        title: task ? task.title : "",
        description: task ? task.description : "",
        amount: task ? task.amount : 0,
      },
      handleCallback
    );

  let valueKeys = Object.keys(formData) as (keyof TaskModalType)[];

  return (
    <BaseModal onCancel={() => onCancel}>
      <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
        <span>{task ? "Edit Task" : "New Task"}</span>
        <CloseIcon
          className="-mx-4 w-4 h-4 cursor-pointer"
          onClick={() => onCancel(false)}
        />
      </div>
      <div className="px-8 py-4">
        <form onSubmit={onSubmit}>
          {taskInputs.map((input, index) => (
            <FormInput
              key={input.id}
              {...input}
              value={formData[valueKeys[index]]}
              onChange={handleChange}
              onBlur={() => handleFocus(index)}
              focused={focused[index]}
              labelStyle="font-medium"
            />
          ))}
          <div className="flex items-center justify-between mb-3 gap-x-4">
            <button
              className="w-full bg-red-600 hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => onCancel(false)}
            >
              Cancel
            </button>
            <button
              className="w-full bg-accent-orange hover:bg-opacity-90 hover:text-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};
