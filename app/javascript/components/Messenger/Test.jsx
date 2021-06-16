import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import ActionCable from 'actioncable'
import setAxiosHeaders from '../AxiosHeaders';
import WebSocket from './WebSocket'

const cableApp = {}
cableApp.cable = ActionCable.createConsumer("ws://localhost:3000/cable");

class Test extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newMessage: '',
            currentConversation: {},
            conversation: {},
            isConversationLoaded: false,
        }

        axios.get(`/api/v1/conversations/${props.match.params.id}`)
        .then(res => {
            console.log('get conversation')
            let conversation = res.data
            this.setState({ conversation, isConversationLoaded: true})
          })
        .catch(error => {
            console.log(error);
        });

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
                conversation_id: this.state.conversation.id
            }
            setAxiosHeaders()
            axios.post("/api/v1/messages", data)
                .then(result => {
                    // this.props.createMessage(todoItem)
                    let messageDiv = document.getElementById('messages')
                    messageDiv.scrollTop = messageDiv.scrollHeight
                    event.target.reset()
                })
        }
        // axios.get(`/api/v1/conversations/${props.match.params.id}`)
        //     .then(res => {
        //         console.log('getting conv data')
        //         let conversation = res.data
        //         let users_ids = []
        //         users_ids.push(res.data.helpr_id, res.data.requester_id)
        //         this.setState({
        //             conversation,
        //             // currentConversation: {
        //             //     conversation_id: res.data.id,
        //             //     users: users_ids,
        //             //     messages: res.data.messages
        //             // },
        //             isConversationLoaded: true
        //         })
        //     })
    }

    getData = (id) => {

        axios.get(`/api/v1/conversations/${id}`)
            .then(res => {
                console.log('getting conv data')
                // let conversation = res.data
                let users_ids = []
                users_ids.push(res.data.helpr_id, res.data.requester_id)
                this.setState({
                    // conversation,
                    currentConversation: {
                        conversation_id: res.data.id,
                        users: users_ids,
                        messages: res.data.messages
                    },
                    isConversationLoaded: true
                })
            })
    }

    updateConvData = (newConv) => {
        console.log('updating conv data')
        this.setState({
            currentConversation: {
                conversation_id: newConv.id,
                users: newConv.users,
                messages: newConv.messages
            }
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
                        {/* <ChatFeed conversation={this.state.conversation} /> */}
                        <div id='chat-feed'>
                            <h3>Chat Feed:</h3>
                            <div id='messages'>
                                { this.state.isConversationLoaded ? <ListGroup variant='flush'>
                                    {/* {this.state.conversation.messages ?  */}
                                        {this.state.conversation.messages.map(({id, text, user_id, created_at}, index) => {
                                            // const avatar = this.whichAvatar(message)
                                            <ListGroup.Item key={index}>{text} - {user_id} - {new Date (`${created_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} </ListGroup.Item>
                                        })}
                                     {/* : 
                                        <h3>This conversation has no messages yet - be the first to post!</h3>
                                    } */}
                                </ListGroup> : <p>No messages yet</p>}
                            </div>
                        </div>
                        <form id='chat-form' onSubmit={this.submitMessage}>
                            <h3>Post a new message:</h3>
                            <textarea type='text' value={this.state.newMessage} onChange={this.handleMessageInput}></textarea>
                            <br></br>
                            <input type='submit'></input>
                        </form>
                    </div>
                ) : null}
                {
                    this.state.isConversationLoaded ?
                        <WebSocket
                            cableApp={cableApp}
                            updateApp={this.updateConvData}
                            getRoomData={this.getData}
                            roomData={this.state.currentConversation}
                        />
                        : null

                }
                {/* <WebSocket/> */}
            </div>
        )
    }
}

export default Test