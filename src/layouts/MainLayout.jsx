import React from 'react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = ({children}) => {
  return (
    <div>
        <header>
        {/* <!-- As a link --> */}
            <nav className="navbar navbar-light bg-primary">
            <div className="container">
                <Link to="/" className="navbar-brand">UnikPOS</Link>
            </div>
            </nav>
        </header>

        <main>
            <div className="container mt-3">
               {children}
            </div>
            <ToastContainer />
        </main>
    </div>
  )
}

export default MainLayout