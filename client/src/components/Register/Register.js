import React, { Component } from 'react';
import axios from 'axios';


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

export default Register;