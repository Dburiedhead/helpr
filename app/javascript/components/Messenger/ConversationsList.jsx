import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, ListGroup, Container, Row, Col } from 'react-bootstrap';

class ConversationsList extends Component {
  constructor() {
    super()
    this.state = {
      conversations: [],
    }
    axios.get('/api/v1/conversations/').then(res => {
      let conversations = res.data
      this.setState({ conversations })
    })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <h1>Conversations</h1>
        <ListGroup variant='flush'>
          {this.state.conversations.map(({ title, id, request_id, created_at, updated_at }, index) =>
            <ListGroup.Item key={index}>
              <Row>
                <Col md={9}>
                  <Link to={`/conversations/${id}`}>
                    <h2>{title}</h2>
                  </Link>
                  <small>Created : {new Date(`${created_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</small>
                  <small>Updated : {new Date(`${updated_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</small>
                </Col>
                <Col md={3}>
                  <Link to={`/request/${request_id}`}>
                    <Button variant="text">See reffering request</Button>
                  </Link>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    )
  }
}

export default ConversationsList