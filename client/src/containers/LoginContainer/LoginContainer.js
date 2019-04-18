import React from 'react';

import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';

const LoginContainer = props => {
    return (
        <div>
            <Header>
                <div>
                    <button 
                        className="service-button"
                        onClick={() => props.history.push('/login')}>Login</button>
                    <button 
                        className="service-button"
                        onClick={() => props.history.push('/register')}>Register</button>
                </div>
            </Header>
            <Login 
                push={props.history.push} />
        </div>
    )
}

export default LoginContainer;