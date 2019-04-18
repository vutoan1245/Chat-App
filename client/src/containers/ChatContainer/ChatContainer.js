import React from 'react';

import './ChatContainer.css';
import Header from '../../components/Header/Header';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import SideBar from '../../components/SideBar/SideBar';

const ChatContainer = props => {
    return (
        <div>
           <Header />
           <div className="chat-container">
                <ChatRoom
                    push={props.history.push} />
                {/* <SideBar /> */}
            </div>
        </div>

    )
}

export default ChatContainer;