import './ListContent.css';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ModalTypes, TaskState } from "../../types/types";
import { RootState } from "../../redux/store/store";
import { todoSLiceActions } from "../../redux/slices/todoSlice";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd';

export interface ListContentProps {
    handleModalOpen: (task: TaskState) => void;
}

const ListContent = ({handleModalOpen}: ListContentProps) => {

    const { sort, sortByDrag} = todoSLiceActions;

    const dispatch = useDispatch();

    const isSorted = useSelector((state: RootState) => state.todoList.sortSettings.isSorted);

    const originalList = useSelector((state: RootState) => state.todoList.originalList);

    const sortedList = useSelector((state: RootState) => state.todoList.sortedList);


    const handlePrioritySort = () => {
        dispatch(sort('priority'));
    }

    const handleStatusSort = () => {
        dispatch(sort('status'));
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
      
        // Check if the drag was dropped outside a valid drop target
        if (!destination) {
          return;
        }
      
        // Check if the item was dropped back into its original position
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
          return;
        }
        
        dispatch(sortByDrag(result));
        
        // Perform the necessary logic based on the drag and drop result
        // Here, you can update your data or trigger any actions
      
        // Example code:
        // const draggedItem = list[source.index];
        // const newList = [...list];
        // newList.splice(source.index, 1);
        // newList.splice(destination.index, 0, draggedItem);
        // setList(newList);
      };

    const list = isSorted ? sortedList : originalList;

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(originalList)); // save to local storage
    }, [originalList])

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        onClick={handlePrioritySort}
                                    >
                                        Priority
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Task
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        onClick={handleStatusSort}
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Done
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>

                                    </th>
                                </tr>
                                </thead>

                                <Droppable droppableId="drag-1">
                                    {(provided: any) => (
                                        <tbody className="bg-white divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                                            {list.map((task: TaskState, i) => (
                                                <Draggable key={task.id} draggableId={task.id} index={i}>
                                                    {(provided: any) => (
                                                        <Task {...{task, handleModalOpen}} innerRef={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} ></Task>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>

                            </table>
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListContent;