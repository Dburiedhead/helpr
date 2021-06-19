import React from 'react';
import ReactDOM from 'react-dom'
import { Row, Col, Container, Form, Jumbotron } from 'react-bootstrap';
import * as Icon from 'react-feather';
// import Cookies from 'js-cookie'

export default function Profile() {
    return (
        <Container style={{ paddingTop: '2%', background: 'rgb(255, 255, 255)' }}>
            <Row>
                <Col md={10}>
                    <Jumbotron>
                        <Container>
                            <h1>User Name</h1>
                            <p># Requests</p>
                            <p># Responses</p>
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
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
    )
}