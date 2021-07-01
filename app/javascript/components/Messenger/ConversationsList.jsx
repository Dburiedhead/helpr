import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import setAxiosHeaders from '../AxiosHeaders';


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
      <div>
        <h1>Conversations</h1>
        <ListGroup variant='flush'>
          {this.state.conversations.map(({title, id, request_id, created_at, updated_at}, index) => 
            <ListGroup.Item key={index}>
              <Link to={`/conversations/${id}`}>
                <h3>{title}</h3>
              </Link>
              <Link to={`/request/${request_id}`}>
                <Button variant="text">See reffering request</Button>
              </Link>
              <p>Requester</p>
              <p>Helpr</p>
              <p>Created : {new Date(`${created_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              <p>Updated : {new Date(`${updated_at}`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            </ListGroup.Item>
          )}
          </ListGroup>
      </div>
    )
  }
}

export default ConversationsList