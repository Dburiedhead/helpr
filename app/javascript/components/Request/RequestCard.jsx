import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import { BrowserRouter as Router, Link } from 'react-router-dom'


class RequestCard extends Component {
    render() {
        return (
            <div>
                <Card style={{ margin: '1rem auto' }}>
                    <Row>
                        <Col className='flex-column'>
                            <small>Created : {this.props.created}</small>
                            <small className="text-muted">Last update : {this.props.updated}</small>
                        </Col>
                        <Col>
                            <h2 style={{ textAlign: 'right' }}>
                                <Nav.Item><Badge style={{color: '#fff', backgroundColor: `${this.props.fulfilled === false ? "#ffa987" : "#a1ff87"}`}}>{this.props.fulfilled === false ? "Unfulfilled" : "Fulfilled"}</Badge></Nav.Item>

                            </h2>
                        </Col>
                    </Row>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                {/* <Navbar> */}
                                    <Col xs={6}>
                                        <Nav className="flex-column">
                                            <Nav.Item>
                                                <Badge style={{color: '#fff', backgroundColor: `${this.props.request_type === "task" ? "#87ddff" : "#ffa987"}`}}>{this.props.request_type}</Badge>
                                                {this.props.title}
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                {/* </Navbar> */}
                            </Row>
                        </Card.Title>
                        <Card.Text style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical' }}>
                            Request Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, con
                            {this.props.description}
                        </Card.Text>
                        <Link variant="primary" to={`/request/${this.props.id}`}>Read more</Link>
                    </Card.Body>
                    <Card.Body>
                        <Row>
                            <Col xs={3} md={2} lg={3} style={{ textAlign: 'center' }}>
                                <small>#</small><br/>
                                <small>Helprz</small>
                            
                            </Col>
                            <Col xs={6} md={6} lg={6}>
                                <small>Location - {this.props.latitude} - {this.props.longitude}</small>
                            </Col>
                            <Col xs={3} md={4} lg={3}>
                                <Link as={Card.Link} to='#' style={{ float: 'right' }}>
                                    <Image src="https://img.icons8.com/cute-clipart/344/user-female.png" roundedCircle style={{ width: '30px', margin: '0 0.5em' }} />
                                    <small>{this.props.user_id}</small>
                                </Link>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default RequestCard;