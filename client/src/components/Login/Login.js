import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './Login.css';
import * as actionTypes from '../../store/action';

class Login extends Component {

    state = {
        inputElements: {
            email: {
                value: '', 
                type: 'text',
                name: 'email',
                placeholder: 'Email:'
            },
            password: { 
                value: '', 
                type: 'password',
                name: 'password',
                placeholder: 'Password:'
            }
        },
        
    }

    onInputChange = (e) => {
        let updatedElements = {
            ...this.state.inputElements[e.target.name],
        };
        updatedElements.value = e.target.value;

        this.setState ({
            inputElements: {
                ...this.state.inputElements,
                [e.target.name]: updatedElements
            }
        });
    }

    validateForm = () => {

        let result = true;

        const formElementsArray = [];
        for( let key in this.state.inputElements ) {
            formElementsArray.push(
                this.state.inputElements[key]
            );
        }

        formElementsArray.forEach(element => {
            if (element.value === '') {
                result = false;
                let updateElement = element;
                this.setState({
                    inputElements: {
                        ...this.state.inputElements,
                        [element.name]: updateElement
                    }
                })
            }
        })

        return result;
    }

    onClick = () => {
        const email = this.state.inputElements.email.value;
        const password = this.state.inputElements.password.value;

        const body = {
            email,
            password
        }

        axios.post("/api/users/login", body)
            .then(result => {
                console.log(result.data);
                const token = result.data.token;
                this.props.addToken(token.split(' ')[1]);
                axios.get('/api/users/current', {headers: {
                    Authorization: token
                }})
                    .then((userData) => {
                        this.props.addUserData(userData.data)
                        this.props.push('/');
                    })
            })
            .catch(err => console.log(err));

    }

    render() {
        const formElementsArray = [];
        for( let key in this.state.inputElements ) {
            formElementsArray.push({
                id: key,
                config: this.state.inputElements[key]
            });
        }

        const form = formElementsArray.map(element => {
            return(
                <div className='group-input' key={element.id}>
                    <p>{element.config.placeholder}</p>
                    <input 
                        key={element.id}
                        type={element.config.type}
                        name={element.config.name}
                        value={element.config.value} 
                        onChange={e => this.onInputChange(e)} />
                </div>
                
            );
        });

        return (
            <div className='service-form'>
                <div className='service-form-group'>
                    <h2>Add Service</h2>
                    {form}
                    <button className='service-submit' onClick={this.onClick}>Submit</button>

                </div>
            </div>
        );
    };
}

const dispatchToProps = dispatch => ({
    addUserData: (userData) => dispatch({type: actionTypes.ADD_USER_DATA, payload: userData}),
    addToken: (token) => dispatch({type: actionTypes.ADD_TOKEN, payload: token})
})

export default connect(null, dispatchToProps)(Login);