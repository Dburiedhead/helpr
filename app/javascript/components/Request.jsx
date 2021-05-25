import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Map from './Map';
import ResponseForm from './ResponseForm';
import axios from 'axios';


class Request extends Component {
    
    constructor() {
        super();
        this.state = {
            request: [],
            responses: []
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

    }
    
    render() {

        return (
            <Container fluid style={{ paddingTop: '1rem', background: 'rgb(255, 255, 255)' }}>
                <Row>
                    <Col lg={4}>
                        {/* <Card>
                            <Card.Body> */}
                                <Map locator={false} marker={this.state.request}/>
                            {/* </Card.Body>
                        </Card> */}
                    </Col>
                    <Col lg={8}>
                        <Card>
                            <Card.Body>
                                <Row noGutters>
                                    <Col lg={9}>
                                    <Badge style={{color: '#fff', backgroundColor: `${this.state.request.fulfilled  === false ? "#ffa987" : "#a1ff87"}`}}>{this.state.request.fulfilled === false ? "Unfulfilled" : "Fulfilled"}</Badge>
                                        <Badge style={{color: '#fff', backgroundColor: `${this.state.request.request_type === "task" ? "#87ddff" : "#ffa987"}`}}>{this.state.request.request_type}</Badge>
                                        <h1>{this.state.request.title}</h1>
                                        <p>{this.state.request.created_at}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <small className="text-muted">{this.state.request.updated_at}</small>
                                        <Card.Link href='#'>
                                            <Image src="https://img.icons8.com/cute-clipart/344/user-female.png" roundedCircle style={{ width: '40px', margin: '0 1em' }} />
                                            <b>{this.state.request.user_id}</b>
                                        </Card.Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Container>
                            <p>{this.state.request.description}</p>
                            {/* <Button variant="primary" style={{ margin: '0.5em 0' }}>Help them</Button> */}
                            <Accordion>
                                <Card border="light">
                                    <Card.Header style={{ backgroundColor: "#ffffff" }}>
                                    <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                                    Help them
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                            { this.state.request.id && this.state.request.user_id && <ResponseForm request_id={this.state.request.id} user_id={this.state.request.user_id} />}
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Accordion>
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    }
}
  
export default Request;