import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import FormInput from "../Forms/FormInput";
import { taskInputs } from "../../utils/formInputs";
import BaseModal from "./BaseModal";
import useForm from "../../utils/useForm";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTaskById } from "../../features/tasks/tasksSlice";
import { useState } from "react";
import ModalButton from "../Buttons/ModalButton";
import { updateTask, addNewTask } from "../../features/tasks/tasks.thunks";

type TaskFormModalType = {
  title: string;
  description: string;
  amount: number;
};

interface TaskModalI {
  onCancel: Function;
  taskId: number | undefined;
}

export const TaskModal = ({ onCancel, taskId }: TaskModalI) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector((state) =>
    taskId ? selectTaskById(state, taskId) : undefined
  );

  const handleCallback = async () => {
    try {
      setLoading(true);
      if (selectedTask) {
        dispatch(updateTask({ id: selectedTask.id, ...formData }));
      } else {
        await dispatch(addNewTask(formData)).unwrap();
      }
      setLoading(false);
      onCancel();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const { formData, focused, handleFocus, handleChange, onSubmit } =
    useForm<TaskFormModalType>(
      {
        title: selectedTask ? selectedTask.title : "",
        description: selectedTask ? selectedTask.description : "",
        amount: selectedTask ? selectedTask.amount : 0,
      },
      handleCallback
    );

  let valueKeys = Object.keys(formData) as (keyof TaskFormModalType)[];

  return (
    <BaseModal onCancel={() => onCancel()}>
      <div className="py-2 w-full border-b-2 px-8 font-semibold text-xl border-accent-grey flex justify-between">
        <span>{selectedTask ? "Edit Task" : "New Task"}</span>
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
            <ModalButton
              color="cancel"
              disabled={loading}
              onClick={() => onCancel()}
              type="button"
            >
              Cancel
            </ModalButton>
            <ModalButton color="normal" disabled={loading} type="submit">
              Save
            </ModalButton>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};
