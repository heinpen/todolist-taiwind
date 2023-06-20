import { ChangeEventHandler, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useDispatch } from "react-redux";
import  { todoSLiceActions } from "../../redux/slices/todoSlice";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { ModalTypes, TaskState } from "../../types/types";
import Modal, { ModalProps } from './Modal';
import { AppDispatch } from '../../redux/store/store';

interface ModalContainerProps extends ModalTypes {
    isEditModal?: boolean;
    task?: TaskState | null;
}

const ModalContainer = ({isOpen, setOpen, isEditModal, task}: ModalContainerProps) => {

    const { add, deleteTask, update } = todoSLiceActions;

    const cancelButtonRef = useRef(null);
    const initialTaskData = {priority: 'High', name: '', id: ''}
    // console.log(initialTaskData, 'initialTaskData')
    const taskData = useRef(initialTaskData);
    if(isEditModal && task) taskData.current = {...task};
    const dispatch = useDispatch();

    const buttonName = isEditModal ? 'Edit' : 'Add';
    const defaultInputValue = isEditModal && task ? task.name : '';
    const [error, setError] = useState(false);

    const handleTaskInput: ModalProps["handleTaskInput"] = (e) => {
        taskData.current.name = e.target.value;
        setError(false);
    }

    const handleSelectedPriority: ModalProps["handleSelectedPriority"] = (e) => {
        taskData.current.priority = e.target.value;
    }

    const getSelectedPriority = (priority: string): TaskState["priority"] => {
        const selectedValue = priority.toLowerCase();
        if (selectedValue === "high" || selectedValue === "normal" || selectedValue === "low") {
            // Valid priority value selected
            return selectedValue;
        } else {
            // Invalid priority value selected
            return "high";
        }
    }

    const handleAddTask = () => {
        if (taskData.current.name === '') setError(true);
        else {
        
            const newTask = {
                id : isEditModal && task ? task.id : Math.random().toString(),
                priority: getSelectedPriority(taskData.current.priority),
                name: taskData.current.name
            }
            if (taskData.current.priority === '') taskData.current.priority = 'High';
            if(isEditModal) {
                dispatch(update(newTask));
            } else {
                dispatch(add(newTask));

            }
            setOpen(false);
        }
    }

    const handleDeleteTask = () => {
        if(!task) return;
        dispatch(deleteTask(task.id));
        setOpen(false);
    }

    const children = isEditModal ? 
    (
        
            <button
            onClick={handleDeleteTask}
            type="submit"
            className="mr-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Delete
        </button>
            
       
    ) : null;

    return (
        <Modal {...{
            handleAddTask, 
            handleTaskInput, 
            isOpen, 
            setOpen, 
            error, 
            cancelButtonRef, 
            handleSelectedPriority,
            defaultInputValue,
            buttonName}}>
            {children}
            </Modal>
    )
}
export default ModalContainer;