import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const MenuItems = () => {
    // get data for use by the component
    const navigate = useNavigate();
    const { setCompany, setUser, user, company } = useContext(UserContext);

    // onclick signout button logout user and set company and user to null
    const logoutUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/logout');
            console.log(response.data);
            if (response.status === 200) {
                toast.success(`${response.data.message} ${response.data.userEmail}`);
                setUser(null);
                setCompany(null);
                navigate('/home');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error('Error logging out: ' + error.response.data.message);
            } else {
                toast.error('Error logging out: ' + error);
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
                                Get Started
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
        </div>
    );
};

export default MenuItems;
