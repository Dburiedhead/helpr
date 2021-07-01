import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Card, Container, Accordion, Button, Badge, Image, Modal } from 'react-bootstrap/';
import ResponseForm from './ResponseForm';
import axios from 'axios';
import { ConfirmFulfilled, ConfirmDelete, EditRequestModal } from '../Pages/Dashboard'

class Request extends Component {

    constructor() {
        super();
        this.state = {
            request: [],
            responses: [],
            current_user_request: []
        }
    }

    componentDidMount() {
        const req_id = this.props.match.params.id
        axios.get(`/api/v1/requests/${req_id}}`).then(res => {
            let request = res.data
            this.setState({ request })
        })
            .catch(error => {
                console.log(error);
            });

        axios.get(`/api/v1/current_user_requests`).then(res => {
            let current_user_request = res.data
            this.setState({ current_user_request })
        })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        return (
            <Container fluid style={{ padding: '1rem 2rem', background: 'rgb(255, 255, 255)' }}>
                <Card>
                    <Card.Body>
                        <Row noGutters>
                            <Col lg={9}>
                                <Badge style={{ color: `${this.state.request.fulfilled === false ? "#EF7B45" : "#B6EEA6"}`, backgroundColor: '#fff' }}>{this.state.request.fulfilled === false ? "Unfulfilled" : "Fulfilled"}</Badge>
                                <Badge style={{ color: '#fff', backgroundColor: `${this.state.request.request_type === "task" ? "#A6E1FA" : "#EF7B45"}` }}>{this.state.request.request_type}</Badge>
                                <h1>{this.state.request.title}</h1>
                                <p>{this.state.request.created_at}</p>
                            </Col>
                            <Col lg={3}>
                                <small className="text-muted">{new Date(`$this.state.request.updated_at`).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</small>
                                <Card.Link href='#'>
                                    <Image src="https://img.icons8.com/cute-clipart/344/user-female.png" roundedCircle style={{ width: '40px', margin: '0 1em' }} />
                                    <b>{this.state.request.user_id}</b>
                                </Card.Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {this.state.current_user_request && this.state.current_user_request.some(curr_user_req => curr_user_req.user_id === this.state.request.user_id) ?
                    <div>
                        <EditRequestModal
                            id={this.state.request.id}
                            description={this.state.request.description}
                            title={this.state.request.title}
                            request_type={this.state.request.request_type}
                            latitude={this.state.request.latitude}
                            longitude={this.state.request.longitude}
                        />
                        {this.state.request.fulfilled == true ?
                            null
                            : <ConfirmFulfilled id={this.state.request.id} />
                        }
                        <Button variant='danger' onClick={() => handleDeleteRequest(this.state.request.id)}>
                            Delete
                        </Button>
                        <ConfirmDelete id={this.state.request.id} />
                    </div>
                    :
                    <Container>
                        <Row>
                            <p>{this.state.request.description}</p>
                        </Row>
                        <Accordion>
                            <Card border="light">
                                <Card.Header style={{ backgroundColor: "#ffffff" }}>
                                    <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                                        Help them
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {this.state.request.id && this.state.request.user_id && <ResponseForm request_id={this.state.request.id} user_id={this.state.request.user_id} />}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Container>
                }
            </Container>
        )
    }
}

export default Request;