import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Map from '../Map/Map';
import ResponseForm from './ResponseForm';
import EditRequest from './EditRequest';
import axios from 'axios';
import setAxiosHeaders from '../AxiosHeaders';

function handleDeleteRequest(id) {
    console.log(id, 'deleted')
    setAxiosHeaders()
    axios.delete(`/api/v1/requests/${id}`).then(res => {
      console.log('Activity deleted', res)
    }, window.location.reload())
      .catch(error => {
        console.log(error);
      });
}

function EditRequestModal(req) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={() => handleShow(req)}>Edit</Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditRequest
                id = {req.id}
                description= {req.description}
                title= {req.title}
                request_type= {req.request_type}
                latitude= {req.latitude}
                longitude= {req.longitude}
            />
          </Modal.Body>
        </Modal>
      </>
    );
}

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

        axios.get(`/api/v1/current_user_request`).then(res => {
            let current_user_request = res.data
            this.setState({ current_user_request })
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleFulfilled = (id) => {
        alert("Are you sure you want to set this request to fulfilled ? This action can\'t be reversed");
        const data = {
            fulfilled: true
        }
        console.log("request is", id, "data is set to ", data);
        setAxiosHeaders()
        axios.put(`/api/v1/requests/${id}`, data)
        .then(res => {
          console.log(res)
        })
        // ,
        // window.location.reload())
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
                        { this.state.current_user_request && this.state.current_user_request.some(curr_user_req => curr_user_req.user_id === this.state.request.user_id) ?
                            <div>
                                <EditRequestModal
                                    key={this.state.request.id}
                                    id={this.state.request.id}
                                    description= {this.state.request.description}
                                    title= {this.state.request.title}
                                    request_type= {this.state.request.request_type}
                                    latitude= {this.state.request.latitude}
                                    longitude= {this.state.request.longitude}
                                />
                                {this.state.request.fulfilled == true ?
                                    null
                                    :
                                    <Button variant="link" onClick={() => this.handleFulfilled(this.state.request.id)}>Set to fulfill</Button>
                                }
                                <Button variant='danger' onClick={() => handleDeleteRequest(this.state.request.id)}>
                                    Delete
                                </Button>
                            </div>
                        :
                            <Container>
                                <p>{this.state.request.description}</p>
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
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}
  
export default Request;