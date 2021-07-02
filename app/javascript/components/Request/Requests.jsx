import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Counter from '../Counter'
import axios from 'axios';
import Map from '../Map/Map';
import RequestCard from './RequestCard'
import { Container, Col, Row, Jumbotron, Image, Badge } from 'react-bootstrap';
import donation from '../../assets/donation.jpg'
import puzzle from '../../assets/puzzle.jpg'
import question from '../../assets/question.jpg'
import world from '../../assets/world.jpg'

class Requests extends Component {

    state = {
        user_requests: [],
        user_responses: [],
        viewportResults: [],
        isLogged: true
    }

    constructor(props) {
        super();
        axios.get(`/api/v1/requests/`)
        .then(res => {
            let user_requests = res.data
            this.setState({ user_requests })
        })
        .catch(error => {
            error.response.status == 401 ? this.setState({isLogged : false}) : console.log(error);
        });
    }

    handleResults = (res) => {
        this.setState({ viewportResults: res })
    }

    render() {
        return (
            <div>
                {this.state.isLogged == true ?
                <Container>
                    <Row>
                        <Col md={6}>
                            <Map locator={true} search={false} marker={this.state.user_requests} show_results={true} parentCallback={this.handleResults} />
                            
                        </Col>
                        <Col md={6} style={{ overflowY: 'scroll', height: '50vh' }}>
                            {this.state.viewportResults.map(({ id, title, description, latitude, longitude, request_type, user_id, fulfilled, response_counter, created_at, updated_at }, index) =>
                                <RequestCard
                                    key={index}
                                    id={id}
                                    title={title}
                                    description={description}
                                    latitude={latitude}
                                    longitude={longitude}
                                    request_type={request_type}
                                    user_id={user_id}
                                    fulfilled={fulfilled}
                                    counter={response_counter}
                                    created={created_at}
                                    updtated={updated_at}
                                    />
                            )}
                        </Col>
                        <hr/>
                    </Row>
                    <Row>
                        <Col>
                            <h2>
                                <Badge style={{ color: '#fff', backgroundColor: '#EF7B45' }}>
                                    <Counter requests={this.state.user_requests} />
                                </Badge> Unfulfilled requests
                            </h2>
                        </Col>
                    </Row>
                </Container>
                    :
                    <div className="align-items-center justify-content-center">
                        <Container className="secondary-color" style={{ paddingTop: '2%', background: 'rgb(255, 255, 255)' }}>
                            <Jumbotron fluid className="bg-transparent" style={{
                                backgroundImage: `url(${world})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right',
                                height: '50vh',
                                backgroundSize: 'contain',
                            }}>
                                <h1 className="display-4">Help people around you and get help from them</h1>
                                <Row>
                                    <Col>
                                        <Link to="/users/sign_in" className="btn btn-lg btn-primary" role="button">
                                            Sign in
                                        </Link>
                                    </Col>
                                </Row>
                            </Jumbotron>
                            <hr className="my-4" />
                            <div style={{ padding: '0 2rem' }}>
                                <Row>
                                    <Col style={{ textAlign: 'left', margin: 'auto'}}>
                                        <h2>Sometimes you need help</h2>
                                        <p>Send a request for material or task</p>
                                        <p>See responses from nearby helprs</p>
                                        <p>Chat with helprs</p>
                                        <p>Select the help you need</p>
                                        
                                    </Col>
                                    <Col md={8} className="image puzzle" style={{
                                        backgroundImage: `url(${puzzle})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'left',
                                        height: '70vh',
                                        backgroundSize: 'contain',
                                    }}> 
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8}>
                                        <Image src={donation} 
                                        style={{ width: '70rem' }}
                                        />
                                    </Col>
                                    <Col style={{ textAlign: 'left', margin: 'auto'}}>
                                        <h2>Sometimes you're the Helpr</h2>
                                        <p>See all requests for help in your area on the map</p>
                                        <p>Answer to either material or task requests</p>
                                        <p>Be someone's hero of the day</p>
                                    </Col>
                                </Row>                            

                            </div>
                        </Container>
                    </div>}
            </div>
        )
    }
}

export default Requests;