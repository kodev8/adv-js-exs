import { useState } from 'react';
import { UserContext } from './UserContext';

/* eslint-disable react/prop-types */

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div> {children} </div>
        </UserContext.Provider>
    );
};

export default UserContextProvider;
