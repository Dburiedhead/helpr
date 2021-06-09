import React, { Component } from 'react';
import ChatFeed from './ChatFeed';
import RoomWebSocket from './RoomWebSocket';
import axios from 'axios';
import ActionCable from 'actioncable'

const cableApp = {}
cableApp.cable = ActionCable.createConsumer("ws://localhost:3000/cable")

class Conversation extends Component {
    constructor() {
        super()
        this.state = {
            newMessage: '',
            currentConversation: {},
            conv_id: null
        }
    }
    
    componentDidMount() {

        // getRoomData()
        const conv_id = this.props.match.params.id
        this.setState({conv_id})
        axios.get(`/api/v1/conversations/${conv_id}`)
            // .then(response => response.json())
            .then(res => {
                this.setState({
                    currentConversation: {
                        room: res.data,
                        users: res.data.attributes.users,
                        messages: res.data.attributes.messages
                    }
                })
            })
    }
    // displayUsers = (users) => {
    //     return users.map( user => {
    //         return <li key={user.id}><img src={`http://localhost:3000/${user.attributes.avatar_url}`} alt={`avatar for ${user.attributes.username}`}/>{user.attributes.username}</li>
    //     })
    // }

    handleMessageInput = (event) => {
        this.setState({
            newMessage: event.target.value
        })
    }

    submitMessage = (event) => {
        event.preventDefault()

        this.setState({
            newMessage: ''
        })

        const message = {
            content: this.state.newMessage,
            // user_id: this.props.currentUser.id,
            room_id: this.state.currentConversation.conversation.id
        }

        axios.post("api/v1/messages", message)
        // .then(resp => resp.json())
        // .then(result => {
        //     let messageDiv = document.getElementById('messages')
        //     messageDiv.scrollTop = messageDiv.scrollHeight
        // })
    }

    render() {
        return (
            <div>
                { this.state.currentConversation.conversation ? (
                    <div id='conversation-show'>
                        <h1 id='conversation-header'>Welcome to the {this.state.currentConversation.conversation.attributes.title} conversation!</h1>
                        <div id='conversation-sidebar'>
                            <h3>Fellow {this.state.currentConversation.conversation.attributes.name}</h3>
                            {/* <ul id='users-list'>
                                {this.displayUsers(this.props.roomData.conversation.attributes.users.data)}
                            </ul> */}
                        </div>
                        <ChatFeed conversation={this.state.currentConversation.conversation} />
                        <form id='chat-form' onSubmit={this.submitMessage}>
                            <h3>Post a new message:</h3>
                            <textarea type='text' value={this.state.newMessage} onChange={this.handleMessageInput}></textarea>
                            <br></br>
                            <input type='submit'></input>
                        </form>
                    </div>
                ) : null}

                <RoomWebSocket
                    cableApp={cableApp}
                    // updateApp={updateAppStateRoom}
                    // getRoomData={
                    //     getRoomData
                    // }
                    roomData={this.state.currentConversation}
                />
            </div>
        )
    }
}

export default Conversation