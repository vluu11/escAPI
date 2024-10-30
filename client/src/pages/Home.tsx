import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveLeaderboard } from "../api/leaderboardAPI";
import type { LeaderboardData } from "../interfaces/LeaderboardData";
import ErrorPage from "./ErrorPage";
import auth from '../utils/auth';
import Module from '../components/Module1';
import Leaderboard from "../components/Leaderboard";
import TextToSpeech from "../components/TextToSpeech";
import ThreeScene from "../components/ThreeScene";

const Home = () => {
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
            fetchBoard(); // Only fetch the board now
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

    const fetchBoard = async () => {
        try {
            const data = await retrieveLeaderboard();
            setBoard(data);
        } catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            <TextToSpeech />
            {/* Always render Module for login/registration when not logged in */}
            {!loginCheck && isModuleOpen && <Module onClose={toggleModule} />}
            
            {loginCheck && (
                <>
                    {/* Remove UserList Component */}
                    <button 
                        className="btn btn-primary mt-3" 
                        type="button"
                        onClick={toggleLeaderboard} 
                    >
                        {isLeaderboardOpen ? 'Hide Leaderboard' : 'Show Leaderboard'}
                    </button>
                    {isLeaderboardOpen && <Leaderboard board={board} />} {/* Render the Leaderboard component */}
                    <button
                        className='btn'
                        type='button'
                        onClick={() => {
                            auth.logout();
                        }}
                    >
                        Logout
                    </button>
                </>
            )}
            <ThreeScene loginCheck={loginCheck} />
        </>
    );
};

export default Home;