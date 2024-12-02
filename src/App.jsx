import './App.css';

import ButtonComp from './components/ButtonComp';
import { useContext, useState } from 'react';
import { CountContext } from './context/count/CountContext';
import { UserContext } from './context/user/UserContext';
import HeaderComp from './components/HeaderComp';
import Form from './components/Form';

function App() {
    const { count } = useContext(CountContext);
    const { user } = useContext(UserContext);

    return (
        <main
            className="app"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                backgroundColor: user ? '#024d1021' : '#4d020221',
                padding: '.5em',
            }}
        >
            <HeaderComp />
            <ButtonComp text="add" />
            {count}

            <Form />

            {user && (
                <div className="alert">You are now logged in as {user} !!!</div>
            )}
        </main>
    );
}

export default App;
