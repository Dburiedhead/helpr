import React, { Component } from 'react';
import { Row, Col, Card, Button, Nav, Navbar, Badge, Image } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'


class RequestCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: ''
        }
        axios.get(`/api/v1/users/${props.user_id}}`)
            .then(res => {
                let user_name = res.data.first_name
                this.setState({ user_name })
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <Card style={{ margin: '1rem auto' }}>
                    <Card.Body style={{ padding: '0.5rem 1.25rem' }}>
                        <Row>
                            <Col className='flex-column'>
                                <small>Created : {new Date(`${this.props.created}`).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} by <a href={`/users/profile/${this.props.user_id}`}>{this.state.user_name}</a></small>
                                {this.props.updated ?
                                    <small className="text-muted">Last update : {new Date(`${this.props.updated}`).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</small>
                                    : null
                                }
                            </Col>
                            <Col xs={3} md={2} lg={3} style={{ textAlign: 'center' }}>
                                <small>{this.props.counter} Helpr</small>
                            </Col>
                            <Col xs={2} md={2} lg={2}>
                                <Nav.Item>
                                    <Badge style={{ color: '#fff', backgroundColor: `${this.props.request_type === "task" ? "#A6E1FA" : "#EF7B45"}` }}>{(this.props.request_type).toUpperCase()}</Badge>
                                </Nav.Item>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={6}>
                                    <Nav className="flex-column">
                                        <Nav.Item>
                                            <h2>
                                                {this.props.title}

                                            </h2>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Text style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical' }}>
                            {this.props.description}
                        </Card.Text>
                        <Link variant="primary" to={`/request/${this.props.id}`}>Read more</Link>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default RequestCard;