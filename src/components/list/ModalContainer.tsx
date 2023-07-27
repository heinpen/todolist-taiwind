import { ChangeEventHandler, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoSLiceActions } from '../../redux/todo/todo-slice';
import { ModalTypes, TaskState } from '../../types/types';
import { capitalizeFirstLetter, getSelectedPriority } from '../../utils/utils';
import Modal from './Modal';

interface ModalContainerProps extends ModalTypes {
  isEditModal?: boolean;
  task?: TaskState | null;
}

export interface Handlers {
  handleSelectedPriority: ChangeEventHandler<HTMLSelectElement>;
  handleTaskInput: ChangeEventHandler<HTMLTextAreaElement>;
  handleCancel: () => void;
  handleAddTask: () => void;
  handleDeleteTask: () => void;
}

const ModalContainer = ({
  isOpen,
  setOpen,
  isEditModal,
  task,
}: ModalContainerProps) => {
  const { add, deleteTask, update } = todoSLiceActions;
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const cancelButtonRef = useRef(null);

  const initialTaskData = { priority: 'High', name: '', id: '' };

  const taskData = useRef(initialTaskData);
  if (isEditModal && task) taskData.current = { ...task };

  const defaultNames = {
    defaultPriorityValue:
      isEditModal && task ? capitalizeFirstLetter(task.priority) : 'High',
    defaultInputValue: isEditModal && task ? task.name : '',
    buttonName: isEditModal ? 'Edit' : 'Add',
  };

  const handlers: Handlers = {
    handleAddTask: () => {
      if (taskData.current.name === '') {
        setError(true);
        return;
      }

      const newTask = {
        id: isEditModal && task ? task.id : Math.random().toString(),
        priority: getSelectedPriority(taskData.current.priority),
        name: taskData.current.name,
      };

      if (isEditModal) {
        dispatch(update(newTask));
      } else {
        dispatch(add(newTask));
      }
      setOpen(false);
      taskData.current = initialTaskData;
    },

    handleSelectedPriority: (e) => {
      taskData.current.priority = e.target.value;
    },

    handleTaskInput: (e) => {
      taskData.current.name = e.target.value;
      if (error) setError(false);
    },

    handleCancel: () => {
      taskData.current = initialTaskData;
      setOpen(false);
      if (error) setError(false);
    },

    handleDeleteTask: () => {
      if (!task) return;
      dispatch(deleteTask(task.id));
      setOpen(false);
    },
  };

  // Destructure the handler object and exclude handleDeleteTask
  const { handleDeleteTask, ...remainingHandlers } = handlers;

  const children = isEditModal ? (
    <button
      onClick={handleDeleteTask}
      type="submit"
      className="mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Delete
    </button>
  ) : null;

  return (
    <Modal
      {...{
        handlers: remainingHandlers,
        isOpen,
        setOpen,
        error,
        cancelButtonRef,
        defaultNames,
      }}
    >
      {children}
    </Modal>
  );
};
export default ModalContainer;
