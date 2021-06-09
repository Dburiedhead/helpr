import React, { Component } from 'react';
import ChatMessage from './ChatMessage';

class ChatFeed extends Component {
    componentDidUpdate() {
        let messageDiv = document.getElementById('messages')
        messageDiv.scrollToTop = messageDiv.scrollHeight
    }

    displayMessages = (messages) => {
        return messages.map(message => {
            // const avatar = this.whichAvatar(message)
            return <ChatMessage key={message.id} message={message}/>
        }) 
    }

    // whichAvatar = (message) => {
    //     const user = this.props.conversation.attributes.users.data.find(user => parseInt(user.id) === message.user_id )
    //     return user.attributes.avatar_url
    // }

    render() {
        return (
            <div id='chat-feed'>
                <h3>Chat Feed:</h3>
                <div id='messages'>
                    { this.props.conversation.attributes.messages ? (
                        this.displayMessages(this.props.conversation.attributes.messages)
                    ) : (
                        <h3>This conversation has no messages yet - be the first to post!</h3>
                    ) }
                </div>
            </div>
        )
    }
}

export default ChatFeed