import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { Label } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
import axios from 'axios';
import setAxiosHeaders from '../AxiosHeaders';

const selectOptions = [
  { value: 'task', text: 'Task' },
  { value: 'material', text: 'Material' },
];
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZHNvb2phIiwiYSI6ImNra3dob2dwYjFkbzkycG1zNG55NnZzd2IifQ.ZCGuAjiuGCyjlezqMyn5VA'

const style = {
  width: '90%',
  height: '80vh',
};

const geolocateStyle = {
  top: 0,
  left: 0,
  margin: 10
};

export default class NewRequest extends Component {
  state = {
    viewport: {
      latitude: 48.856614,
      longitude: 2.3522219,
      zoom: 15
    },
    requestLat: null,
    requestLong: null,
    description: '',
    title: '',
    request_type: '',
    latitude: null,
    longitde: null,
    showAlert: false
  };

  mapRef = React.createRef();
  ContainerRef = React.createRef();

  _onViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  _handleResult = result => {
    this.setState({
      currMarker: {
        name: result.result.place_name,
        latitude: result.result.center[1],
        longitude: result.result.center[0]
      }
    })
    let latitude = result.result.center[1]
    let longitude = result.result.center[0]
    this.setState({ latitude, longitude })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    setAxiosHeaders();
    const data = {
      description: this.state.description,
      title: this.state.title,
      request_type: this.state.request_type,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    axios.post('api/v1/requests', data)
      .then(res => {
        if (res.request.status === 201) {
          this.setState({showAlert: true})
          setTimeout(() => {
            this.setState({showAlert: false})
          }, 5000);
          this.areaForm.reset();
        }
      }
      )
      .catch(err => console.log(err))
  };

  render() {
    const errorLabel = <Label color="red" pointing />

    return (
      <Row style={{ margin: "1em auto" }}>
        <Col>
          <div ref={this.containerRef}>
            <MapGL
              ref={this.mapRef}
              {...style}
              style={{ margin: '2em auto' }}
              {...this.state.viewport}
              onViewportChange={this._onViewportChange}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            >
              <GeolocateControl
                style={geolocateStyle}
                // positionOptions={positionOptions}
                trackUserLocation
                auto
              />
              <NavigationControl
                className={'NavigationControl'}
                onViewportChange={viewport => this._onViewportChange(viewport)}
              />
              <Geocoder
                mapRef={this.mapRef}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                position='top-right'
                containerRef={this.containerRef}
                onResult={this._handleResult}
                onViewportChange={this._onViewportChange}
                marker={true}

              />
            </MapGL>
          </div>
        </Col>
        {/* { this.state.requestLat && this.state.requestLog && <RequestForm latitude={this.state.requestLat} longitude={this.state.requestLong}/> } */}
        {/* <RequestForm key={ this.state.requestLat } latitude={this.state.requestLat} longitude={this.state.requestLong}/> */}
        <Col>
          <Form
            // style={{ padding: '2vh 10vw' }}
            // onSubmit={this.handleSubmit}
            className="custom-classname-is-rendered"
            ref={(event) => { this.areaForm = event; }}
            onValidSubmit={this.handleSubmit}
          >
            <Form.Group>
              <Form.Input
                name='title'
                width={10}
                label='Title'
                placeholder='Doe'
                required
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
                validations="minLength:5"
                errorLabel={errorLabel}
                validationErrors={{ minLength: 'Please enter your request title' }}

              />
              <Form.Dropdown
                name="request_type"
                width={2}
                label="Type"
                placeholder='Please select…'
                help="This is required"
                options={selectOptions}
                required
                selection
                value={this.state.request_type}
                onChange={this.handleChange}
                errorLabel={errorLabel}
                validationError='You need to select a type'

              />

            </Form.Group>
            <Form.TextArea
              name="description"
              label="Description"
              placeholder="I need ..."
              help="Max 300 characters."
              validations="maxLength:300"
              required
              validationErrors={{
                maxLength: 'Please provide less than 300 characters.',
              }}
              errorLabel={errorLabel}
              value={this.state.description}
              onChange={this.handleChange}
            />
            <Form.Group>
              <Form.Input
                name='latitude'
                label='Latitude'
                width={5}
                // disabled
                // hidden
                required
                value={this.state.latitude}
                onChange={this.handleChange}
                errorLabel={errorLabel}
                validationError='You need to select an adress on the map to set these field'
              />
              <Form.Input
                name='longitude'
                width={5}
                label='Longitude'
                required
                // disabled
                // hidden
                value={this.state.longitude}
                onChange={this.handleChange}
                errorLabel={errorLabel}
                validationError='You need to select an adress on the map to set these field'
              />

            </Form.Group>
            <Form.Button className='submit-btn'>Submit</Form.Button>
            <Alert variant='success' show={this.state.showAlert}>
              <Alert.Heading>
                Request created!
              </Alert.Heading>
              <p>You will find answers in the chat, check regularly</p>
            </Alert>
          </Form>
        </Col>
      </Row>
    );
  }
}