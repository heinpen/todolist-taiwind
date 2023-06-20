import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { TaskState } from "../../types/types";
import { RootState } from "../../redux/store/store";
import EmptyState from "./EmptyState";
import ListContent from "./ListContent";
import AddTaskModal from "./Modal";
import Button from "./Button";
import ModalContainer from './ModalContainer';

const Todolist = () => {

    const listLength = useSelector((state: RootState) => state.todoList.originalList.length);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const taskData = {
        priority: 'High',
        name: '',
    }

    const taskToEdit = useRef<TaskState | undefined>();


    const handleEditModalOpen = (task: TaskState) => {
        taskToEdit.current = task;
      
        setEditModalOpen(true);
    }

    return (
        <>
            {listLength === 0 ?
                <EmptyState>
                    <Button setOpen={setAddModalOpen}/>
                </EmptyState> :
                <>
                    <ListContent handleModalOpen={handleEditModalOpen}/>
                    <div className="flex justify-center mt-6">
                        <Button setOpen={setAddModalOpen}/>
                    </div>
                </>
            }
            <ModalContainer isOpen={addModalOpen} setOpen={setAddModalOpen} {...{taskData}}/>
            <ModalContainer 
                isOpen={editModalOpen} 
                setOpen={setEditModalOpen}
                isEditModal={true}
                task={taskToEdit.current}
                />

        </>
    );
};

export default Todolist;