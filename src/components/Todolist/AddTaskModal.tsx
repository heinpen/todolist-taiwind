import { ChangeEventHandler, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useDispatch } from "react-redux";
import { add } from "../../redux/slices/todoSlice";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { ModalProps, TaskState } from "../../types/types";

const AddTaskModal = ({isOpen, setOpen}: ModalProps) => {

    const cancelButtonRef = useRef(null);
    const userData = useRef({priority: 'High', task: ''});
    const dispatch = useDispatch()

    const [error, setError] = useState(false);

    const handleTaskInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        userData.current.task = e.target.value;
        setError(false);
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
        if (userData.current.task === '') setError(true);
        else {

            if (userData.current.priority === '') userData.current.priority = 'High';

            dispatch(add({
                priority: getSelectedPriority(userData.current.priority),
                name: userData.current.task
            }));
            setOpen(false);
        }
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}
                    onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                {/*TITLE*/}
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add Task</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>


                                <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                    {/*PRIORITY*/}
                                    <div
                                        className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                            Priority
                                        </label>
                                        <select
                                            id="priority"
                                            name="priority"
                                            onChange={(e) => userData.current.priority = e.target.value}
                                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            defaultValue="High"
                                        >
                                            <option>High</option>
                                            <option>Normal</option>
                                            <option>Low</option>
                                        </select>
                                    </div>

                                    {/*TASK*/}
                                    <div
                                        className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                        <label htmlFor="task"
                                               className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Task
                                        </label>
                                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                                            <textarea
                                                id="task"
                                                name="task"
                                                onChange={handleTaskInput}
                                                rows={3}

                                                className={`max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border ${error ? "border-red-300" : "border-gray-300"} rounded-md`}
                                                defaultValue={''}
                                            />
                                            {error ?
                                                <p className="mt-2 text-sm text-red-600" id="email-error">
                                                    Please write your task.
                                                </p> :
                                                <p className="mt-2 text-sm text-gray-500">Write your task.</p>
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setOpen(false)}
                                        type="button"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddTask}
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default AddTaskModal;