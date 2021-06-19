import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapGL, {NavigationControl, GeolocateControl} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import RequestForm from './RequestForm'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MAPBOX_TOKEN ='pk.eyJ1IjoiZHNvb2phIiwiYSI6ImNra3dob2dwYjFkbzkycG1zNG55NnZzd2IifQ.ZCGuAjiuGCyjlezqMyn5VA'

const style = {
    width: '90%',
    height: '80vh',
};

const geolocateStyle = {
  top: 0,
  left: 0,
  margin: 10
};

class NewRequest extends Component {
    state = {
        viewport: {
            latitude: 48.856614,
            longitude: 2.3522219,
            zoom: 15
        },
        requestLat: null,
        requestLong: null
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
        console.log(result.result.place_name, result.result.center[1], result.result.center[0]);
        let requestLat = result.result.center[1]
        let requestLong = result.result.center[0]
        console.log(requestLat, requestLong)
        this.setState({requestLat, requestLong})
      }
    
      render() {
        return (
          <Row style={{ margin: "1em auto" }}>
            <Col>
              <div ref={this.containerRef}>
                  <MapGL
                      ref={this.mapRef}
                      { ...style }
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
            <RequestForm key={ this.state.requestLat } latitude={this.state.requestLat} longitude={this.state.requestLong}/>
          </Row>
        );
      }
    }
  
export default NewRequest;