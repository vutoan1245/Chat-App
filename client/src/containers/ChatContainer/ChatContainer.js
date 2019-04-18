import React from 'react';
import { connect } from 'react-redux';


import './ChatContainer.css';
import Header from '../../components/Header/Header';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import * as actionTypes from '../../store/action';

const ChatContainer = props => {

    return (
        <div>
             <Header>           
                <button 
                    className="logout-button"
                    onClick={() => props.logout()}>Logout</button>
            </Header>
           <div className="chat-container">
                <ChatRoom
                    push={props.history.push} />
                {/* <SideBar /> */}
            </div>
        </div>

    )
}

const mapDispatchToProps = dispatch => ({
    logout: dispatch({type:actionTypes.REMOVE_USER_DATA})
})

export default connect(null, mapDispatchToProps)(ChatContainer);