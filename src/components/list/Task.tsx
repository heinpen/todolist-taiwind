import { FC, useRef, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { todoSLiceActions } from '../../redux/todo/todo-slice';
import { TaskState } from '../../types/types';
import { capitalizeFirstLetter } from '../../utils/utils';

interface TaskProps {
  handleModalOpen: (task: TaskState) => void;
  task: TaskState;
  provided: DraggableProvided;
}

const Task: FC<TaskProps> = ({ task, handleModalOpen, provided }) => {
  const { updateCheck } = todoSLiceActions;
  const [cellExpanded, setCellExpanded] = useState(false);
  const elementRef = useRef(null);

  const dispatch = useDispatch();

  const handleCheckbox = (id: string, isDone: boolean) => {
    dispatch(updateCheck({ id, isDone }));
  };

  const handleCellClick = () => {
    setCellExpanded(!cellExpanded);
  };

  return (
    <tr
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {capitalizeFirstLetter(task.priority)}
      </td>

      <td
        ref={elementRef}
        onClick={handleCellClick}
        className={`px-6 py-4 text-sm font-medium text-gray-900 ellipsis ${
          cellExpanded ? '' : 'whitespace-nowrap'
        }`}
      >
        {task.name}
      </td>

      <td className="px-6 py-4 whitespace-nowrap w-[100px] max-w-[100px]">
        {task.isDone ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            done
          </span>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            pending
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          id="comments"
          aria-label="is the task done"
          defaultChecked={task.isDone}
          name="comments"
          type="checkbox"
          onChange={() => handleCheckbox(task.id, !task.isDone)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="text-indigo-600 hover:text-indigo-900"
          onClick={() => handleModalOpen(task)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default Task;
