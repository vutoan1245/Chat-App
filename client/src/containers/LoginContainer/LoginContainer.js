import React from 'react';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';

const LoginContainer = props => {
    return (
        <div>
            <Header>
                <button 
                    className="service-button"
                    onClick={() => props.history.push('/register')}>Register</button>
            </Header>
            <Login 
                push={props.history.push} />
        </div>
    )
}

export default LoginContainer;