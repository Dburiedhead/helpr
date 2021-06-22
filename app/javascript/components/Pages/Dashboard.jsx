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
        <Button variant="secondary" onClick={() => handleShow(req)}>Edit</Button>
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

function handleDeleteResponse(id) {
    console.log(id, 'deleted')
    setAxiosHeaders()
    axios.delete(`/api/v1/responses/${id}`).then(res => {
      console.log('Response deleted', res);
      if (res.status == 204) {
        window.location.reload();
      }
    })
      .catch(error => {
        console.log(error);
      });
}

function handleEditResponse(id) {
    console.log(id, 'edit response func to be finished')
    // setAxiosHeaders()
    // axios.patch(`/api/v1/responses/${id}`).then(res => {
    //   console.log('Activity deleted', res)
    // }, window.location.reload())
    //   .catch(error => {
    //     console.log(error);
    //   });
}

class Dashboard extends Component {

    state = {
        user_requests: [],
        user_responses: []
    }

    constructor() {
        super();
        // setAxiosHeaders();
        axios.get('/api/v1/current_user_request/').then(res => {
            let user_requests = res.data
            this.setState({ user_requests })
        })
            .catch(error => {
                console.log(error);
            });
        axios.get('/api/v1/current_user_response/').then(res => {
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
                <h1>Put a loader, if res is not empty show tables</h1>
                <Tabs
                    id="controlled-tab"
                    defaultActiveKey='requests'
                >
                    <Tab eventKey="requests" title="My Requests">
                        { this.state.user_requests.length > 0 ?
                            <Table borderless responsive>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Last update</th>
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
                                            fulfilled,
                                            latitude,
                                            longitude,
                                            updated_at,
                                        }, index) =>
                                        <tr key={index}>
                                            <td>{new Date(created_at).toLocaleDateString()}</td>
                                            <td>{request_type}</td>
                                            <td>{title}</td>
                                            <td>{fulfilled}</td>
                                            <td>{description}</td>
                                            <td>{updated_at !== created_at? new Date(updated_at).toLocaleDateString() : 'The request haven\'t been updated'}</td>
                                            <td><a href={`/request/${id}`}>See request page</a></td>
                                            <td>
                                                <EditRequestModal
                                                    key={id}
                                                    id={id}
                                                    description= {description}
                                                    title= {title}
                                                    request_type= {request_type}
                                                    latitude= {latitude}
                                                    longitude= {longitude}
                                                />
                                            </td>
                                            <td>
                                                Ask for validation + Delete only after a messaeg is sent to helprzs' messenger <br/>
                                                <Button variant="link" onClick={() => handleDeleteRequest(id)}>Delete</Button>
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
                        { this.state.user_responses.length > 0 ?
                            <Table borderless responsive>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Request</th>
                                        <th>Message</th>
                                        <th>Request page</th>
                                        <th>Last update</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.user_responses.map((
                                        {
                                            id,
                                            message,
                                            request_id,
                                            created_at,
                                            updated_at,
                                            selected,
                                        }, index) =>
                                        <tr key={index}>
                                            <td>{new Date(created_at).toLocaleDateString()}</td>
                                            <td>{selected === true ? 'selected' : 'not selected'}</td>
                                            <td>{request_id}</td>
                                            <td>{message}</td>
                                            <td><Link to={`/request/${request_id}`}>See reffering request</Link></td>
                                            <td>{updated_at !== created_at ? new Date(updated_at).toLocaleDateString() : 'The response haven\'t been updated'}</td>
                                            <td>
                                                <Button variant="link" onClick={() => handleEditResponse(id)}>Edit</Button>
                                            </td>
                                            {/* <td>
                                                Ask for validation + Delete only if setto unfulfilled and sent a notification in requester's messenger <br/>
                                                <Button variant="link" onClick={() => handleDeleteResponse(id)}>Delete</Button>
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

export default Dashboard;