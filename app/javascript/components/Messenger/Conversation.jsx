import React, { Component } from 'react';
import ChatFeed from './ChatFeed';
import RoomWebSocket from './RoomWebSocket';
import axios from 'axios';
import ActionCable from 'actioncable'
import setAxiosHeaders from '../AxiosHeaders';

const cableApp = {}
cableApp.cable = ActionCable.createConsumer("ws://localhost:3000/cable")


class Conversation extends Component {

    getRoomData = (id) => {
        axios.get(`api/v1/conversations/${id}`)
            // .then(response => response.json())
            .then(res => {
                this.setState({
                    currentConversation: {
                        room: res.data,
                        users: res.data.users,
                        messages: res.data.messages
                    }
                })
            })
    }
    
    updateAppStateRoom = (newRoom) => {
        this.setState({
            currentConversation: {
                room: newRoom.room.data,
                users: newRoom.users,
                messages: newRoom.messages
            }
        })
      }

    constructor() {
        super()
        this.state = {
            newMessage: '',
            currentConversation: {},
            conversation:{},
            conv_id: null
        }
    }
    
    componentDidMount() {
        const conv_id = this.props.match.params.id
        this.setState({conv_id})

        axios.get(`/api/v1/conversations/${conv_id}`)
        .then(res => {
            let conversation = {}
            let users_ids =[]
            users_ids.push(res.data.helpr_id, res.data.requester_id)
            this.setState({ conversation,
                currentConversation: {
                    room: res.data.id,
                    users: users_ids,
                    messages: res.data.messages
                }
            })
        })

        this.getRoomData(conv_id)
        
        cableApp.conversation = cableApp.cable.subscriptions.create({
            channel: 'ConversationsChannel',
            conversations: conv_id
        }, 
        {
            received: (updatedConversation) => {
                this.updateAppStateRoom(updatedConversation)
            }
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

        const data = {
            text: this.state.newMessage,
            // user_id: this.props.currentUser.id,
            conversation_id: this.state.conversation.id
        }
        setAxiosHeaders()

        axios.post("/api/v1/messages", data)
        // .then(resp => resp.json())
        .then(result => {
            let messageDiv = document.getElementById('messages')
            messageDiv.scrollTop = messageDiv.scrollHeight
        })
    }

    render() {
        return (
            <div>
                { this.state.conversation ? (
                    <div id='conversation-show'>
                        <h1 id='conversation-header'>Welcome to the {this.state.conversation.title} conversation!</h1>
                        <div id='conversation-sidebar'>
                            <h3>Fellow {this.state.conversation.title}</h3>
                            {/* <ul id='users-list'>
                                {this.displayUsers(this.props.roomData.conversation.attributes.users.data)}
                            </ul> */}
                        </div>
                        <ChatFeed conversation={this.state.conversation}/>
                        <form id='chat-form' onSubmit={this.submitMessage}>
                            <h3>Post a new message:</h3>
                            <textarea type='text' value={this.state.newMessage} onChange={this.handleMessageInput}></textarea>
                            <br></br>
                            <input type='submit'></input>
                        </form>
                    </div>
                ) : null}

                {/* <RoomWebSocket
                    cableApp={cableApp}
                    // updateApp={updateAppStateRoom}
                    // getRoomData={
                    //     getRoomData
                    // }
                    roomData={this.state.conversation}
                /> */}
            </div>
        )
    }
}

export default Conversation