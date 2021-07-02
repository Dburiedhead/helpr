import React, { Component } from 'react';
import { Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import setAxiosHeaders from '../AxiosHeaders'

class ResponseForm extends Component {

    state = {
        request_id: '',
        request_data: '',
        showAlert: false,
        convError: ''
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
            .catch(error => {
                if (error.response.status == 403) {
                    this.setState({showAlert: true})
                    this.setState({ convError: error.response.data })
                    setTimeout(() => {
                        this.setState({showAlert: false})
                        window.location.href = '/conversations';
                    }, 5000);
                } else {
                    console.log(error);
                }
            })

    };

    render() {
        return (
            <Col>
                <h2>Start a conversation with {this.props.user_id}</h2>
                <Button onClick={this.handleSubmit}>Join the room</Button>
                <Alert variant='warning' show={this.state.showAlert}>
                    {this.state.convError}
                </Alert>
            </Col>
        )
    }
}

export default ResponseForm;