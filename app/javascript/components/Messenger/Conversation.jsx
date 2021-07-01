import React, { Component } from 'react';
import axios from 'axios';
import ActionCable from 'actioncable'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatFeed from "./ChatFeed";
import MessageForm from "./MessageForm";

class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            conversation: {}
        };
        this.getData = this.getData.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.cableApp = {}
        this.cableApp.cable = ActionCable.createConsumer('ws://localhost:3000/cable')
        this.updateApp = this.updateApp.bind(this)
    }

    componentDidMount() {
        this.getData();
        this.createSubscription()
        let messageBox = document.getElementById('chat-feed')
        messageBox.scrollTop = messageBox.scrollHeight
    }

    getData() {
        axios.get(`/api/v1/conversations/${this.props.match.params.id}`)
            .then(response => {
                let messages = response.data.messages;
                let conversation = response.data
                this.setState({ messages, conversation });
            })
            .catch(error => {
                console.log(error);
            });
    }

    createMessage(message) {
        const messages = [message, ...this.state.messages];
        this.setState({ messages });
    }

    updateApp = message => {
        console.log('updated with this new message', message)
        this.setState({ messages: [...this.state.messages, message] })
        console.log(this.state.messages)
    }

    createSubscription = () => {
        this.cableApp.room = this.cableApp.cable.subscriptions.create({
            channel: 'MessagesChannel',
            room: this.props.match.params.id
        },
            {
                received: (data) => {
                    this.updateApp(data.message)
                }
            })
    }

    render() {
        return (
            <div style ={{ padding: '0 2rem' }}>
                <Row>
                    <Col md={8}>
                        <Row>
                            {this.state.messages ? (
                                <ChatFeed messages={this.state.messages} getData={this.getData} />
                            ) : <h3>There're no messages in this conversation regarding {this.state.conversation.title}</h3>}
                        </Row>
                        <Row>
                            <MessageForm createMessage={this.createMessage} conversation_id={this.state.conversation.id} />
                        </Row>
                    </Col>
                    <Col md={4}>
                            <div id='conversation-show'>
                                <h1 id='conversation-header'>Reffering request : {this.state.conversation.title}</h1>
                                <div id='conversation-sidebar'>
                                    <h3>Requester</h3>
                                    <h3>Helpr</h3>
                                </div>


                            </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default Conversation