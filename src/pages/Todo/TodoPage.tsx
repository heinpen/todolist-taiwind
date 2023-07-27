import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/list/Button';
import EmptyState from '../../components/list/EmptyState';
import ModalContainer from '../../components/list/ModalContainer';
import TaskList from '../../components/list/TaskList';
import { RootState } from '../../redux/store/store';
import { TaskState } from '../../types/types';

const Todolist = () => {
  const listLength = useSelector(
    (state: RootState) => state.todoList.originalList.length,
  );

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const taskData = {
    priority: 'High',
    name: '',
  };

  const taskToEdit = useRef<TaskState | undefined>();

  const handleEditModalOpen = (task: TaskState) => {
    taskToEdit.current = task;

    setEditModalOpen(true);
  };

  return (
    <Layout name="Todo list">
      {listLength === 0 ? (
        <EmptyState>
          <Button setOpen={setAddModalOpen} />
        </EmptyState>
      ) : (
        <>
          <TaskList handleModalOpen={handleEditModalOpen} />
          <div className="flex justify-center mt-6">
            <Button setOpen={setAddModalOpen} />
          </div>
        </>
      )}
      <ModalContainer
        isOpen={addModalOpen}
        setOpen={setAddModalOpen}
        {...{ taskData }}
      />
      <ModalContainer
        isOpen={editModalOpen}
        setOpen={setEditModalOpen}
        isEditModal={true}
        task={taskToEdit.current}
      />
    </Layout>
  );
};

export default Todolist;
