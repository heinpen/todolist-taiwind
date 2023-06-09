import './ListContent.css';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ModalProps, TaskState } from "../../types/types";
import { RootState } from "../../redux/store/store";
import { sort, updateCheck } from "../../redux/slices/todoSlice";
import Task from "./Task";

interface ListContentProps {
    setOpen: ModalProps['setOpen'];
}

const ListContent = ({setOpen}: ListContentProps) => {

    const dispatch = useDispatch();

    const isSorted = useSelector((state: RootState) => state.todoList.sortSettings.isSorted);

    const originalList = useSelector((state: RootState) => state.todoList.originalList);

    const sortedList = useSelector((state: RootState) => state.todoList.sortedList);

    const handleSort = () => {
        dispatch(sort());
    }

    const list = isSorted ? sortedList : originalList;

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(originalList)); // save to local storage
    }, [originalList])

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    onClick={handleSort}
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
                                    onClick={handleSort}
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
                            <tbody className="bg-white divide-y divide-gray-200">
                            {list.map((task: TaskState) => (
                                <Task {...{task}}></Task>
                            ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListContent;