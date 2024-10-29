import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';
import Module from '../components/Module';

import TextToSpeech from "../components/TextToSpeech";

const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [isModuleOpen, setIsModuleOpen] = useState(true);


    const toggleModule = () => {
        setIsModuleOpen(!isModuleOpen);
    };

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data)
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            <TextToSpeech/>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <h1>
                            Login to view all your friends!
                        </h1>
                    </div>
                ) : (
                    <UserList users={users} />
                )}
            <div>
                {!loginCheck ? (
                    isModuleOpen && <Module onClose={toggleModule} />
                ) : (
                <button
                    className='btn'
                    type='button'
                    onClick={() => {
                    auth.logout();
                    }}
                >
                    Logout
                </button>
                )}
            </div>
        </>
    );
};

export default Home;
