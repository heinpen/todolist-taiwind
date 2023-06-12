import React from 'react';
import Todolist from "../../components/Todolist/Todolist";
import Layout from "../../components/Layout/Layout";

const TodoPage = () => {
    return (
        <Layout name="Todolist">
            <Todolist/>
        </Layout>
    );
};

export default TodoPage;
