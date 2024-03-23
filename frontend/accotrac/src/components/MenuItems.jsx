import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const MenuItems = () => {
    const navigate = useNavigate();
    const { setCompany, setUser, user } = useContext(UserContext);
    console.log('menu', user);
    const logoutUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/logout');
            console.log(response.data);
            if (response.status === 200) {
                toast.success('Successfully logged out');
                setUser(null);
                setCompany(null);
                navigate('/home');
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error('Error logging out: ' + error.response.data.error);
            } else {
                toast.error('Error logging out: ' + error.message);
            }
        }
    };


    return (
        <div>
            <ul className="float-end mul fs-7 text-white d-inline-flex flex-wrap">
                <li className="p-4">
                    <Link className="text-white fw-bold font-size-lg" to="/home">
                        Home
                    </Link>
                </li>
                {user && user.authenticated ? (
                    <>
                        <li className="p-4">
                            <Link className="text-white fw-bold font-size-lg" to={`/dashboard`}>
                                Dashboard
                            </Link>
                        </li>
                        <li className="p-4">
                            <Link className="text-white fw-bold font-size-lg" onClick={logoutUser}>
                                Sign Out
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="p-4">
                            <Link className="text-white fw-bold font-size-lg" to="/login">
                                Sign In
                            </Link>
                        </li>
                        <li className="p-4">
                            <Link className="text-white fw-bold font-size-lg" to="/signup">
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}
                <li className="p-4">
                    <Link className="text-white fw-bold font-size-lg" to="/about">
                        About US
                    </Link>
                </li>
                <li className="p-4">
                    <Link className="text-white fw-bold font-size-lg" to="/contact">
                        Contact US
                    </Link>
                </li>
            </ul>

            {/* Conditionally render components based on authentication state */}
            {user && user.authenticated === true && (
                <>
                    {/* Additional components to be displayed when authenticated */}
                </>
            )}
        </div>
    );
};

export default MenuItems;
