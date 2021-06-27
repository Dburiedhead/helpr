import React, { Component, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import setAxiosHeaders from '../AxiosHeaders';
import { Link } from 'react-router-dom';
import EditRequest from '../Request/EditRequest';
import * as Icon from 'react-feather';


function EditRequestModal(req) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="secondary" onClick={() => handleShow(req)}><Icon.Edit2 color="#4c4c4c" /></Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditRequest
                        id={req.id}
                        description={req.description}
                        title={req.title}
                        request_type={req.request_type}
                        latitude={req.latitude}
                        longitude={req.longitude}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}

// function handleDeleteResponse(id) {
//     console.log(id, 'deleted')
//     setAxiosHeaders()
//     axios.delete(`/api/v1/conversations/${id}`).then(res => {
//       console.log('Response deleted', res);
//       if (res.status == 204) {
//           alert("Conversation deleted")
//         window.location.reload();
//       }
//     })
//       .catch(error => {
//         console.log(error);
//       });
// }


export default class Dashboard extends Component {
    handleDeleteRequest = (id) => {
        console.log(id, 'deleted')
        setAxiosHeaders()
        axios.delete(`/api/v1/requests/${id}`)
        .then(res => {
            console.log('Activity deleted', res)
        }, window.location.reload())
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

    handleCancelHelp = (id) => {
        alert("Are you sure you want to cancel your help ?")
        console.log(id, 'deleted')
        setAxiosHeaders()
        axios.delete(`/api/v1/conversations/${id}`)
        .then(res => {
            console.log('Help deleted', res)
        }, window.location.reload())
        .catch(error => {
            console.log(error);
        });
    }
    state = {
        user_requests: [],
        user_responses: []
    }

    constructor() {
        super();

        axios.get('/api/v1/current_user_request/')
        .then(res => {
            let user_requests = res.data
            this.setState({ user_requests })
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
    }

    render() {

        return (
            <Container>
                <Tabs
                    id="controlled-tab"
                    defaultActiveKey='requests'
                >
                    <Tab eventKey="requests" title="My Requests">
                        {this.state.user_requests.length > 0 ?
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Last update</th>
                                        <th>Type</th>
                                        <th>Title</th>
                                        <th>State</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Request page</th>
                                        <th>Edit</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.user_requests.map((
                                        {
                                            id,
                                            request_type,
                                            title,
                                            created_at,
                                            description,
                                            request_status,
                                            fulfilled,
                                            latitude,
                                            longitude,
                                            updated_at,
                                        }, index) =>
                                        <tr key={index}>
                                            <td>{new Date(created_at).toLocaleDateString()}</td>
                                            <td>{updated_at !== created_at ? new Date(updated_at).toLocaleDateString() : new Date(created_at).toLocaleDateString()}</td>
                                            <td>{request_type}</td>
                                            <td>{title}</td>
                                            <td>{request_status}</td>
                                            <td>
                                                {fulfilled == true ?
                                                        <Button variant="text" disabled>Fulfilled</Button>
                                                        :
                                                        <Button variant="link" onClick={() => this.handleFulfilled(id)}>Click to fulfill</Button>
                                                    }
                                            </td>
                                            <td>{description}</td>
                                            <td><a href={`/request/${id}`}><Icon.Eye color="#4c4c4c" /></a></td>
                                            <td>
                                                <EditRequestModal
                                                    key={id}
                                                    id={id}
                                                    description={description}
                                                    title={title}
                                                    request_type={request_type}
                                                    latitude={latitude}
                                                    longitude={longitude}
                                                />
                                            </td>
                                            <td>
                                                Ask for validation + Delete only after a messaeg is sent to helprzs' messenger <br />
                                                <Button variant="link" onClick={() => this.handleDeleteRequest(id)}><Icon.Trash2 color="#4c4c4c" /></Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            :
                            <h2>You haven't posted any request yet</h2>
                        }
                    </Tab>
                    <Tab eventKey="responses" title="My responses">
                        {this.state.user_responses.length > 0 ?
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Last update</th>
                                        <th>Selected to fulfill the request</th>
                                        <th>Request</th>
                                        <th>Request page</th>
                                        <th>Conversation</th>
                                        {/* <th>Cancel Help</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.user_responses.map((
                                        {
                                            id,
                                            request_id,
                                            created_at,
                                            updated_at,
                                            selected,
                                        }, index) =>
                                        <tr key={index}>
                                            <td>{new Date(created_at).toLocaleDateString()}</td>
                                            <td>{updated_at !== created_at ? new Date(updated_at).toLocaleDateString() : new Date(created_at).toLocaleDateString()}</td>
                                            <td>{selected === true ? 'Yes' : 'No'}</td>
                                            <td>{request_id}</td>
                                            <td><Link to={`/request/${request_id}`}><Icon.Eye color="#4c4c4c" /></Link></td>
                                            <td>
                                                <Link to={`/conversations/${id}`}><Icon.MessageCircle color="#4c4c4c" /></Link>
                                            </td>
                                            {/* <td>
                                                {this.state.user_requests.find( req => req.id == request_id).fulfilled ?
                                                    // <Button variant="text" disabled>Request is already Fulfilled</Button>
                                                    // :
                                                    // <Button variant="primary" onClick={() => this.handleCancelHelp(id)}>Click to fulfill</Button>
                                                    console.log("request is fulfilled", request_id)
                                                    :
                                                    console.log("request is unfulfilled", request_id)
                                                }
                                            </td> */}
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            :
                            <h2>You haven't answered to any request yet</h2>
                        }
                    </Tab>
                </Tabs>

            </Container>
        )
    }
}