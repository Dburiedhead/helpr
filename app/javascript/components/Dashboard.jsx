import React, { Component, useState } from 'react';
import ReactDOM from "react-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import setAxiosHeaders from './AxiosHeaders';


function handleDelete(id) {
    console.log(id, 'deleted')
    setAxiosHeaders()
    axios.delete(`/api/v1/requests/${id}`).then(res => {
      console.log('Activity deleted', res)
    }, window.location.reload())
      .catch(error => {
        console.log(error);
      });
}


class Dashboard extends Component {

    state = {
        user_requests: [],
        user_responses: []
    }

    constructor() {
        super();
        setAxiosHeaders();
        axios.get('/api/v1/current_user_request/').then(res => {
            let user_requests = res.data
            this.setState({ user_requests })
        })
            .catch(error => {
                console.log(error);
            });
        axios.get('/api/v1/responses/').then(res => {
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
                    // onSelect={(t) => this.setState({ t })}
                    >
                    <Tab eventKey="requests" title="My Requests">
                        { this.state.user_requests.length > 0 ?
                            <Table borderless responsive>
                                <thead>
                                    <tr>
                                        <th>date</th>
                                        <th>Type</th>
                                        <th>title</th>
                                        <th>status</th>
                                        <th>description</th>
                                        <th>updated</th>
                                        <th>latitude</th>
                                        <th>longitude</th>
                                        <th>Request page</th>
                                        <th>Edit</th>
                                        <th>Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.user_requests.map((
                                        { id,
                                            date,
                                            request_type,
                                            title,
                                            created_at,
                                            description,
                                            fulfilled,
                                            updated_at,
                                            latitude,
                                            longitude
                                        }, index) =>
                                        <tr key={index}>
                                            <td>{date}</td>
                                            <td>{request_type}</td>
                                            <td>{title}</td>
                                            <td>{fulfilled}</td>
                                            <td>{description}</td>
                                            <td>{updated_at}</td>
                                            <td>{latitude}</td>
                                            <td>{longitude}</td>
                                            <td><a href={`/request/${id}`}>See request page</a></td>
                                            <td>Edit</td>
                                            <td>
                                                <Button variant="outline-danger" onClick={() => handleDelete(id)}>Delete</Button>
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
                                        <th>Requests</th>
                                        <th>Description</th>
                                        <th>Request page</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {/* <td>{props.response_date}</td>
                                            <td>{props.response_status}</td>
                                            <td>{props.request_title}</td>
                                            <td>{props.response_description}</td>
                                            <td><a href={`/request/${props.request_id}`}>See reffering request</a></td> */}
                                        <td>Unfulfill</td>
                                        <td>Delete</td>
                                    </tr>
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