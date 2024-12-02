import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user/UserContext';

function Form() {
    const { user, setUser } = useContext(UserContext);
    const [userInput, setUserInput] = useState('');

    const handleLogIn = (e) => {
        e.preventDefault();
        if (!userInput) {
            alert('Please a valid name enter your name');
            return;
        }
        setUserInput('');
        setUser(userInput);
    };

    const handleLogOut = () => {
        setUser(null);
    };

    return (
        <div>
            <h2>Account</h2>
            <form className="login-form" onSubmit={handleLogIn}>
                {user ? (
                    <button type="button" onClick={handleLogOut}>
                        Log Out
                    </button>
                ) : (
                    <>
                        <input
                            type="text"
                            value={userInput}
                            placeholder="Enter your name"
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button type="submit">Log In</button>
                    </>
                )}
            </form>
        </div>
    );
}

export default Form;
