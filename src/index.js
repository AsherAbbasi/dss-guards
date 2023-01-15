import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "jspdf-autotable";
import App from './App';
import reportWebVitals from './reportWebVitals'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
    <Suspense>
      
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={true}
            pauseOnHover={true}
        >
        </ToastContainer>
    </Suspense>
    <ProSidebarProvider>
    <App />
    </ProSidebarProvider>
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
