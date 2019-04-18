import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


class Register extends Component {

    state = {
        inputElements: {
            firstName: {
                value: '', 
                type: 'text',
                name: 'firstName',
                placeholder: 'First Name:'
            },
            lastName: {
                value: '', 
                type: 'text',
                name: 'lastName',
                placeholder: 'Last Name:'
            },
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
        error: false,
        errorMessage: ''
        
    }

    onInputChange = (e) => {
        let updatedElements = {
            ...this.state.inputElements[e.target.name],
        };
        updatedElements.value = e.target.value;

        this.setState ({
            inputElements: {
                ...this.state.inputElements,
                [e.target.name]: updatedElements,
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

    onClick = () => {

        if(!this.validateForm()){
            this.setState({
                ...this.state,
                error: true,
                errorMessage: 'invalid input'
            })
        }
        const firstName = this.state.inputElements.firstName.value;
        const lastName = this.state.inputElements.lastName.value;
        const email = this.state.inputElements.email.value;
        const password = this.state.inputElements.password.value;

        const body = {
            name: firstName + " " + lastName,
            email,
            password
        }

        axios.post("/api/users/register", body)
            .then(data => {
                console.log(data);
                this.props.push('/login');
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    error: true
                })
            });

    }

    componentDidMount = () => {
        if(this.authenticatedUser){
            this.props.push('/');
        }
    }

    authenticatedUser = () => {
        const token = 'Bearer ' + this.props.token;
        axios.get('/api/users/current', {headers: {
            Authorization: token
        }})
            .then(() => console.log('user is authenticated'))
            .catch(err => {
                this.props.push('/login');
                console.log(err);
            })
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
                    <p>Invalid Input</p>
                </div>
            )
        }

        return (
            <div className='service-form'>
                <div className='service-form-group'>
                    <h2>Register</h2>
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

export default connect(mapStateToProps)(Register);