import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import setAxiosHeaders from '../AxiosHeaders'

class ResponseForm extends Component {

    state = {
        request_id: '',
        request_data: ''
    }

    constructor(props) {
        super();
        axios.get(`/api/v1/requests/${props.request_id}`)
        .then(res => {
            let request_data = res.data
            this.setState({ request_data })
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleSubmit = () => {
        
        // const csrfToken = document.querySelector('[name=csrf-token]').content
        // axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
        setAxiosHeaders()
        const data = {
            title: this.state.request_data.title,
            requester_id: this.state.request_data.user_id,
            request_id: this.props.request_id
        };

        axios.post('/api/v1/conversations', data)
        .then(res => {
            if (res.status === 200) {
                window.location.href = '/conversations';
            }
        }
        )
        .catch(err => console.log(err))

    };

    render() {
        return (
            <Col>
                <h2>Start a conversation with {this.props.user_id}</h2>
                <Button onClick={this.handleSubmit}>Join the room</Button>
            </Col>
        )
    }
}

export default ResponseForm;