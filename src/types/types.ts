export type TaskState = {
    id: number;
    name: string;
    isDone: boolean;
    priority: string;
}


export interface ModalProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export type PriorityMapTypes = {
    [key: string]: number;
}

export type SortFunctionsTypes = {
    [key: string]: (a: TaskState, b: TaskState) => number;
}