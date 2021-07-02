import React, { Component } from 'react';
import { ListGroup, Card, Row, Col } from 'react-bootstrap';

export default class ChatFeed extends Component {
    render() {
        return (
            <Card style={{ width: '60vw', height: '80vh', margin: '0 auto' }}>
                <Card.Body id='chat-feed' style={{ overflowY: 'scroll', height: '50vh' }}>
                    <ListGroup variant='flush'>
                        {this.props.messages.map(({ id, text, user_id, user_name, created_at }, index) =>
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={8}>
                                        {text}
                                    </Col>
                                    <Col md={4}>
                                        <small>
                                            {user_name == null ? user_id : user_name} - {new Date(`${created_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </small>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}