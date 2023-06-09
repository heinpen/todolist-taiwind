import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { TaskState } from "../../types/types";
import { RootState } from "../../redux/store/store";
import EmptyState from "./EmptyState";
import ListContent from "./ListContent";
import AddTaskModal from "./AddTaskModal";
import Button from "./Button";

const Todolist = () => {

    const listLength = useSelector((state: RootState) => state.todoList.originalList.length);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);


    return (
        <>
            {listLength === 0 ?
                <EmptyState>
                    <Button setOpen={setAddModalOpen}/>
                </EmptyState> :
                <>
                    <ListContent {...{setEditModalOpen}}/>
                    <div className="flex justify-center mt-6">
                        <Button setModalOpen={setAddModalOpen}/>
                    </div>
                </>
            }
            <AddTaskModal open={addModalOpen} setOpen={setAddModalOpen}/>
        </>
    );
};

export default Todolist;