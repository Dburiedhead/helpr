import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';


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
  
  // componentDidMount() {

  // }

  handleSubscribe = (event) => {
    const conversation_id = event.target.id
    this.state.currentUser ? (this.postFirstMessage(conversation_id)) : (alert('You must be logged in to subscribe to a room.'))
  }

  postFirstMessage = (convId) => {
    window.history.pushState(null, null, `/conversations/${conv.title}/${convId}`)
    const message = {
      // content: `${this.state.currentUser.attributes.username} has joined this room!`,
      // user_id: this.state.currentUser.id,
      conversation_id: convId
    }
    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.post('/api/v1/messages/', message).then(res => {
      if (res.request.status === 201) {
        alert('Message sent !');
        this.areaForm.reset();
      }
    })
      .catch(err => console.log(err))
    // fetch("http://localhost:3000/messages", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json"
    //     },
    //     body: JSON.stringify({message: message})
    // })
    // .then(res => res.json())
    // .then(result => {
    //     console.log(result)
    // })
  }

  render() {
    return (
      <div>
        <h1>Conversations</h1>
        {/* { this.state.conversations.length > 0 ? */}
          {this.state.conversations.map(({title, id}, index) => 
            <div key={index}>
              <h3>{title}</h3>
              {/* { usersRooms && usersRooms.some( userusersConversationsRoom => usersConversations.id === parseInt(conv.id) ) ? ( */}
              <Link to={`/conversations/${id}`}><Button variant='primary'>Enter</Button></Link>
              {/* ) : ( */}
              {/* <Link to={`/conversations/conversation/${conv.id}`}><button id={conv.id} onClick={this.handleSubscribe}>Subscribe</button></Link> */}
              {/* ) } */}
            </div>
          )}
          {/* :
          <h3>You don't have any conversation</h3>
        } */}
      </div>
    )
  }
}

export default ConversationsList