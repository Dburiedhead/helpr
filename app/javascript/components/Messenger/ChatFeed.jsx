import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export default class ChatFeed extends Component {

    render() {
        // const { messages } = this.props
        return (
            <Card style={{ width: '60vw', height: '80vh', margin: '0 auto'}}>
                <Card.Body id='chat-feed' style={{ overflowY: 'scroll', height: '50vh' }}>
                    <ListGroup variant='flush'>
                        {this.props.messages.map(({ id, text, user_id, created_at }, index) => 
                            <ListGroup.Item key={index}>{text} - {user_id} - {new Date(`${created_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}