import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Row, Col, Container, Form, Jumbotron } from 'react-bootstrap';
import axios from 'axios'
import RequestCard from '../Request/RequestCard';

export default class Profile extends Component {

    state = {
        user_data: null,
        current_user: {
            id: '',
            first_name: '',
            last_name: '',
            user_responses: [],
            user_requests: []
        }
    }

    constructor() {
        super();
        axios.get(`/api/v1/current_user_data`)
            .then(res => {
                this.setState({
                    current_user: {
                        id: res.data.id,
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        user_requests: res.data.requests,
                        user_responses: res.data.responses
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            let uid = this.props.match.params.id
            axios.get(`/api/v1/users/${uid}}`)
            .then(res => {
                let user_data = res.data
                this.setState({ user_data })
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        return (
            <div>
                <Container style={{ padding: '0 4rem', background: 'rgb(255, 255, 255)' }}>
                    <Jumbotron>
                        <Row>
                            <Col>
                                <h1>{this.state.current_user.first_name} {this.state.current_user.last_name}</h1>
                                <p>Searching help for {this.state.current_user.user_requests.length} Requests</p>
                                <p>Providing help to {this.state.current_user.user_responses.length} People</p>
                            </Col>
                        </Row>
                    </Jumbotron>
                    <Row>
                        <Col md={6}>
                            <p>Current requests</p>
                            {this.state.user_data !== null ?
                                this.state.user_data.requests.map((
                                    { id, title, description, latitude, longitude, request_type, user_id, fulfilled, response_counter, created_at, updated_at }, index) =>
                                    <RequestCard
                                        key={index}
                                        id={id}
                                        title={title}
                                        description={description}
                                        latitude={latitude}
                                        longitude={longitude}
                                        request_type={request_type}
                                        user_id={user_id}
                                        fulfilled={fulfilled}
                                        counter={response_counter}
                                        created={created_at}
                                        updtated={updated_at}
                                    />
                                )
                                :
                                this.state.current_user.user_requests.map((
                                    { id, title, description, latitude, longitude, request_type, user_id, fulfilled, response_counter, created_at, updated_at }, index) =>
                                    <RequestCard
                                        key={index}
                                        id={id}
                                        title={title}
                                        description={description}
                                        latitude={latitude}
                                        longitude={longitude}
                                        request_type={request_type}
                                        user_id={user_id}
                                        fulfilled={fulfilled}
                                        counter={response_counter}
                                        created={created_at}
                                        updtated={updated_at}
                                    />
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )

    }
}