import React, { Component } from 'react';
import axios from 'axios';
import ActionCable from 'actioncable'
import { Row, Col } from 'react-bootstrap';
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
        // document.getElementById('chat-feed').scrollTop = document.getElementById('chat-feed').scrollHeight
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
        const messages = [...this.state.messages, message];
        this.setState({ messages });
    }

    updateApp = message => {
        console.log('updated with this new message', message)
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
                            {this.state.messages.length > 0 ? (
                                <ChatFeed messages={this.state.messages} getData={this.getData} />
                            ) : <h3>There're no messages in this conversation reffering to {this.state.conversation.title}</h3>}
                        </Row>
                        <Row>
                            <MessageForm createMessage={this.createMessage} conversation_id={this.state.conversation.id} />
                        </Row>
                    </Col>
                    <Col md={4}>
                        <div id='conversation-show'>
                            <h2 id='conversation-header'>Reffering request : {this.state.conversation.title}</h2>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default Conversation