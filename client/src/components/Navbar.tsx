import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import Module from './Module';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [isModuleOpen, setIsModuleOpen] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const toggleModule = () => {
    setIsModuleOpen(!isModuleOpen);
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div className='display-flex justify-space-between align-center py-2 px-5 mint-green'>
      <h1>Authentication Review</h1>
      <div>
        {!loginCheck ? (
          <>
            <button className='btn' type='button' onClick={toggleModule}>
              {isModuleOpen ? 'Close Module' : 'Open Module'}
            </button>
            {isModuleOpen && <Module />} {/* Conditionally render the Module component */}
          </>
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
    </div>
  );
};

export default Navbar;