import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import { retrieveLeaderboard } from "../api/leaderboardAPI";
import type { UserData } from "../interfaces/UserData";
import type { LeaderboardData } from "../interfaces/LeaderboardData";
import ErrorPage from "./ErrorPage";
import UserList from '../components/Users';
import auth from '../utils/auth';
import Module from '../components/Module';
import Leaderboard from "../components/Leaderboard";
import TextToSpeech from "../components/TextToSpeech";

const Home = () => {

    const [users, setUsers] = useState<UserData[]>([]);
    const [board, setBoard] = useState<LeaderboardData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [isModuleOpen, setIsModuleOpen] = useState(true);
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);


    const toggleModule = () => {
        setIsModuleOpen(!isModuleOpen);
    };

    const toggleLeaderboard = () => {
        setIsLeaderboardOpen(!isLeaderboardOpen);
    };

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
            fetchBoard();
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

    const fetchBoard = async () => {
        try {
            const data = await retrieveLeaderboard();
            setBoard(data)
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
                    <>
                        <UserList users={users} />
                        <button 
                            className="btn btn-primary mt-3" 
                            type="button"
                            onClick={toggleLeaderboard} 
                        >
                            {isLeaderboardOpen ? 'Hide Leaderboard' : 'Show Leaderboard'}
                        </button>
                        {isLeaderboardOpen && <Leaderboard board={board} />} {/* Render the Leaderboard component */}
                    </>
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
