import React from 'react';
import { PlusIcon } from "@heroicons/react/24/solid";

interface ButtonProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Button = ({setModalOpen}: ButtonProps) => {
    return (
        <button
            onClick={() => setModalOpen(true)}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
            New Project
        </button>
    );
};

export default Button;