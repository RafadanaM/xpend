import { FormEvent, useRef, useState } from "react";
import useOutsideAlerter from "../../utils/useOutsideAlerter";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import FormInput from "../Forms/FormInput";
import { taskInputs } from "../../utils/formInputs";
import { TaskService } from "../../api/services/TaskService";
import Task from "../../interfaces/task.interface";

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
  const [focused, setFocused] = useState<boolean[]>([false, false, false]);

  const [values, setValues] = useState<TaskModalType>({
    title: task ? task.title : "",
    description: task ? task.description : "",
    amount: task ? task.amount : 0,
  });

  let valueKeys = Object.keys(values) as (keyof TaskModalType)[];

  const modalRef = useRef(null);
  useOutsideAlerter(modalRef, () => {
    onCancel(false);
  });

  const handleFocus = (index: number) => {
    focused[index] = true;
    setFocused([...focused]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      TaskService.editTask(
        values.title,
        values.description,
        +values.amount,
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
      TaskService.createTask(values.title, values.description, +values.amount)
        .then(({ data }) => {
          setTasks((prevState: Task[]) => [...prevState, data]);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    onCancel(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full md:max-h-screen lg:overflow-auto md:overflow-scroll bg-gray-700 bg-opacity-60 z-50 flex justify-center items-center">
      <div
        className="bg-white md:w-10/12 md:mt-auto lg:mt-0 lg:w-11/12 lg:max-w-lg w-full h-full md:h-auto z-50 py-2 flex flex-col"
        ref={modalRef}
      >
        <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
          <span>{task ? "Edit Task" : "New Task"}</span>
          <CloseIcon
            className="-mx-4 w-4 h-4 cursor-pointer"
            onClick={() => onCancel(false)}
          />
        </div>
        <div className="px-8 py-4">
          <form onSubmit={handleSubmit}>
            {taskInputs.map((input, index) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[valueKeys[index]]}
                onChange={onChange}
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
      </div>
    </div>
  );
};
