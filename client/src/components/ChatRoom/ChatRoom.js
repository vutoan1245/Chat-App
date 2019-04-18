import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import axios from 'axios';

import './ChatRoom.css';

// const url = 'http://localhost:5000';

class ChatRoom extends Component {
    state = {
        inputMessage: '',
        socket: null,
        conversation: []
    }

    componentDidMount = () => {
        this.authenticatedUser();

        this.state.socket.on('conversation', conversation => {
            console.log(conversation);
            this.setState({
                ...this.state,
                conversation
            })
        })
        this.state.socket.on('message', message => {
            console.log(message);
            if(message.name) {
                const updateConversation = this.state.conversation;
                updateConversation.unshift(message);
                this.setState({
                    ...this.state,
                    conversation: updateConversation
                })
            }
        })
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

    componentWillMount = () => {
        const socket = io.connect('/?token=' + this.props.token, () => {
            console.log('success');
        });

        this.setState({
            ...this.state,
            socket
        })
    }

    onInputChange = e => {
        this.setState({
            ...this.state,
            inputMessage: e.target.value
        })
    }

    onKeyPress = e => {
        if(e.key === 'Enter') {
            this.onClick();
        }
    }

    onClick = () => {
        this.state.socket.emit('message', {
            message: this.state.inputMessage,
            userID: this.props.userData.id
        })

        this.setState({
            ...this.state,
            inputMessage: ''
        })
    }

    render() {

        let conversationElement = null;

        if(this.state.conversation){
            conversationElement = this.state.conversation.map((data, index) => {
                return (
                    <div className="chat-message" key={index}>
                        <div className="avatar"><img alt=""/></div>
                        <div className="chat-message-content">
                            <span className="chat-message-author">{data.name}</span>
                            <p className="chat-message-message">{data.message}</p>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div className="page">
                <div className="chat-body scroll-hijack">
                    {conversationElement}
                </div>
                <div className="chat-footer relative">
                    <div className="message-form" action="">
                        <input 
                            type="text" 
                            className="post-input" 
                            placeholder="Your Text..."
                            value={this.state.inputMessage}
                            onChange={e => this.onInputChange(e)}
                            onKeyPress={e => this.onKeyPress(e)} />
                        <button
                            className="post-button"
                            onClick={this.onClick} >Submit</button>
                    </div>
                </div>
            </div>
        )
        
    }
}

const mapStateToProps = state => ({
    token: state.token,
    userData: state.userData,
    isAuthenticated: state.isAuthenticated
})
export default connect(mapStateToProps, null)(ChatRoom);
