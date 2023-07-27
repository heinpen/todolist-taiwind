export type TaskState = {
  id: string;
  name: string;
  isDone: boolean;
  priority: string;
};

export interface ModalTypes {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export type PriorityMapTypes = {
  [key: string]: number;
};

export type SortFunctionsTypes = {
  [key: string]: (a: TaskState, b: TaskState) => number;
};
