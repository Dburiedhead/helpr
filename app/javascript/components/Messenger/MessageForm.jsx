import React, { Component } from 'react'
import setAxiosHeaders from '../AxiosHeaders'
import { Form } from 'formsy-semantic-ui-react';
import axios from 'axios'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default class MessageForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.titleRef = React.createRef()
    this.state = {
      text: ''
    }
  }

  handleSubmit(e) {
    setAxiosHeaders()
    axios.post('/api/v1/messages', {
      message: {
        text: this.state.text,
        // conversation_id: window.location.href.match(/\d+$/)[0]
        conversation_id: this.props.conversation_id
      },
    })
      .then(response => {
        const message = response.data
        this.props.createMessage(message)
      })
      .catch(error => {
        console.log(error)
      })
      this.setState({ text: '' })
      let messageBox = document.getElementById('chat-feed')
      messageBox.scrollTop = messageBox.scrollHeight
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  
  render() {
    
    return (
      <div style={{ width: '60vw', margin: '0 auto'}}>
          <Form
            onValidSubmit={this.handleSubmit}
          >
            <Row>
              <Col md={10}>
                <Form.Input
                  name='text'
                  type="text"
                  // width={10}
                  placeholder="Write your message here..."
                  required
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </Col>
              <Col md={2}>
                <Form.Button>Send</Form.Button>
              </Col>
            </Row>
          </Form>
      </div>
    )
  }
}