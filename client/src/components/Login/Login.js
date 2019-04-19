import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './Login.css';
import * as actionTypes from '../../store/action';

class Login extends Component {

    state = {
        inputElements: {
            userName: {
                value: '', 
                type: 'text',
                name: 'userName',
                placeholder: 'Username:'
            },
            password: { 
                value: '', 
                type: 'password',
                name: 'password',
                placeholder: 'Password:'
            }
        },
        error: false,
        errorMessage: 'invalid information'
    }

    componentDidMount = () => {
        this.authenticatedUser()
    }

    onInputChange = (e) => {
        let updatedElements = this.state.inputElements[e.target.name];
        updatedElements.value = e.target.value;

        this.setState ({
            inputElements: {
                ...this.state.inputElements,
                [e.target.name]: updatedElements
            },
            error: false
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

    onKeyPress = e => {
        if(e.key === 'Enter') {
            this.onClick();
        }
    }

    authenticatedUser = () => {
        const token = 'Bearer ' + this.props.token;
        axios.get('/api/users/current', {headers: {
            Authorization: token
        }})
            .then(() => this.props.push('/'))
            .catch(err => {
                console.log(err);
            })
    }

    onClick = () => {

        if(!this.validateForm()){
            this.setState({
                ...this.state,
                error: true,
                errorMessage: 'invalid information'
            })
        }
        
        const email = this.state.inputElements.userName.value;
        const password = this.state.inputElements.password.value;

        const body = {
            email,
            password
        }

        axios.post("/api/users/login", body)
            .then(result => {
                // console.log(result.data);
                const token = result.data.token;
                console.log('token', token);
                this.props.addToken(token.split(' ')[1]);
                axios.get('/api/users/current', {headers: {
                    Authorization: token
                }})
                    .then((userData) => {
                        console.log(userData);
                        this.props.addUserData(userData.data)
                        this.props.push('/');
                    })
                    .catch(err => {
                        console.log(err);
                        console.log('something went wrong')
                    })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: true
                })
            });

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
                        onChange={e => this.onInputChange(e)}
                        onKeyPress={e => this.onKeyPress(e)} />
                </div>
                
            );
        });

        let errorElement = null;
        if(this.state.error){
            errorElement = (
                <div className='error-container'>
                    <p>Invalid Information</p>
                </div>
            )
        }

        return (
            <div className='service-form'>
                <div className='service-form-group'>
                    <h2>Login</h2>
                    {form}
                    <button className='service-submit' onClick={this.onClick}>Submit</button>
                    {errorElement}
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    token: state.token,
})

const dispatchToProps = dispatch => ({
    addUserData: (userData) => dispatch({type: actionTypes.ADD_USER_DATA, payload: userData}),
    addToken: (token) => dispatch({type: actionTypes.ADD_TOKEN, payload: token})
})

export default connect(mapStateToProps, dispatchToProps)(Login);