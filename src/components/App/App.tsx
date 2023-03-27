import { useState } from 'react'

import './App.css'
import Layout from "../Layout/Layout";
import Todolist from "../Todolist/Todolist";

function App() {

    return (
        <Layout name="Todolist">
            <Todolist/>
        </Layout>
    )
}

export default App;
