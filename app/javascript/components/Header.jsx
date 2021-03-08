import React from 'react'
import { Link } from "react-router-dom";

export default function Header(props) {
    const { user, isLoggedIn, handleLogout } = props;
    return <nav className="bg-white py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">

            <div className="flex justify-between items-center">
                <a href="#" className="font-bold text-xl text-indigo-600">Poll App</a>
                <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                    <i className="fas fa-bars"></i>
                </button>
            </div>

            <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                {isLoggedIn ? (<div>
                    <Link to="/" className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">Home</Link>
                    <Link to="/poll" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Add Poll</Link>
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>) : (
                    <div>
                        <Link to="/" className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">Home</Link>

                        <Link className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300" to="/login">Log In</Link>
                        <Link className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1" to="/signup">Sign Up</Link>
                    </div>
                )}

            </div>
        </div>
                    <br/>
    </nav>
}