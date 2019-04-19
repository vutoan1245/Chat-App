import React from 'react';

import Header from '../../components/Header/Header';
import Register from '../../components/Register/Register';

const LoginContainer = props => {
    return (
        <div>
            <Header>
                <div>
                    <button 
                        className="service-button"
                        onClick={() => props.history.push('/login')}>Login</button>
                </div>
            </Header>
            <Register 
                push={props.history.push} />
        </div>
    )
}

export default LoginContainer;