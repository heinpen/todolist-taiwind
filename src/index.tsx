import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client';
import { router } from "./AppRouter";
import { RouterProvider } from "react-router-dom";
import './index.css'
import { store } from './redux/store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,

)
