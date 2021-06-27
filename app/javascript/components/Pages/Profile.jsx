import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Row, Col, Container, Form, Jumbotron } from 'react-bootstrap';
import * as Icon from 'react-feather';
import axios from 'axios'

export default class Profile extends Component {

    state = {
        user: [],
        user_responses: [],
        user_requests: []
    }

    constructor() {
        super();

        axios.get('/api/v1/users/show')
        .then(res => {
            let user = res.data
            this.setState({ user })
        })
        .catch(error => {
            console.log(error);
        });

        axios.get('/api/v1/current_user_responses/')
        .then(res => {
            let user_responses = res.data
            this.setState({ user_responses })
        })
        .catch(error => {
            console.log(error);
        });

        axios.get('/api/v1/current_user_requests/')
        .then(res => {
            let user_requests = res.data
            this.setState({ user_requests })
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Container style={{ paddingTop: '2%', background: 'rgb(255, 255, 255)' }}>
                    <Jumbotron>
                        {/* <Container> */}
                            <Row>
                                <Col>
                                    <h1>User Name</h1>
                                    <p># Requests</p>
                                    <p># Responses</p>
                                </Col>
                                <Col>
                                    <p>Avatar</p>
                                    <img data-id={this.state.user.id} src={`http://localhost:3000/${this.state.user.avatar}`} />
                                </Col>
                            </Row>
                        {/* </Container> */}
                    </Jumbotron>
                    <Row>
                        <Col md={6}>
                            <Form noValidate>
                                <Form.Group as={Row}>
                                    <Form.Label column>Your email</Form.Label>
                                    <Col style={{ display: "flex", flexDirection: "row" }}>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            // value={Cookies.get('user_email')}
                                            readOnly
                                            plaintext
                                        />
                                    </Col>
                                    <Col style={{ display: "flex", flexDirection: "row" }}>
                                        <Form.Label column>First name</Form.Label>
                                        <Form.Control
                                            name="First Name"
                                            // value={Cookies.get('user_first_name')}
                                            readOnly
                                            plaintext
                                        />
                                    </Col>
                                    <Col style={{ display: "flex", flexDirection: "row" }}>
                                        <Form.Label column>Last name</Form.Label>
                                        <Form.Control
                                            name="Last Name"
                                            // value={Cookies.get('user_last_name')}
                                            readOnly
                                            plaintext
                                        />
                                        <span style={{ paddingTop: "calc(.375rem + 1px)" }}>
                                            <a href="/users/edit"><Icon.Edit color="#4c4c4c" /></a>
                                        </span>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )

    }
}