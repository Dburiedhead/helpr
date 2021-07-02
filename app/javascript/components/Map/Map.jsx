import React, { useState, useRef } from 'react'; // eslint-disable-next-line import/no-webpack-loader-syntax
import MapGL, { Popup, NavigationControl, ScaleControl, GeolocateControl, Layer, Source } from 'react-map-gl' // eslint-disable-next-line import/no-webpack-loader-syntax
import Geocoder from "react-map-gl-geocoder";
import Button from 'react-bootstrap/Button';
import Markers from './Markers';

function setFeatures() {
    for (var x = -120; x < 120; x += 20) {
        for (var y = -80; y < 80; y += 10) {
            features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [x, y]
                },
                properties: {
                    'marker-color': '#000',
                    'marker-symbol': 'star-stroked',
                    title: [x, y].join(',')
                }
            });
        }
    }
}

let features = []

const layerSource = {
type: 'FeatureCollection',
features: features,
};

const aLayer = {
    id: 'myLayer',
    type: 'circle'
};

const ApiKey = 'pk.eyJ1IjoiZHNvb2phIiwiYSI6ImNra3dob2dwYjFkbzkycG1zNG55NnZzd2IifQ.ZCGuAjiuGCyjlezqMyn5VA'

const geolocateStyle = {
        top: 0,
        left: 0,
        margin: 10
    };

const style = {
    width: '100%',
    height: '50vh',
}

const navStyle = {
        top: 72,
        left: 0,
        padding: '10px'
    };

    const scaleControlStyle = {
        bottom: 36,
        left: 0,
        padding: '10px'
    };


export default function Map(props, { parentCallback }) {

    const [popupInfo, setPopupInfo] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 15
    });

    const mapRef = useRef();
    const layerRef = useRef();
    const geocoderContainerRef = useRef();

    return (
        <div ref={geocoderContainerRef}>
            <MapGL
                mapboxApiAccessToken={ApiKey}
                mapStyle="mapbox://styles/mapbox/satellite-v9"
                {...viewport}
                {...style}
                onViewportChange={viewport => setViewport(viewport)}
                ref={mapRef}
                onInteractionStateChange= {props.show_results === true ?
                        function() {
                            let inBounds = [];
                            let map = mapRef.current.getMap();
                            let bounds = map.getBounds();
                            props.marker.forEach(marker => {
                                let coordinates = [marker.longitude, marker.latitude]
                                if (bounds.contains(coordinates)) {
                                    inBounds.push(marker)
                                }
                            });
                            props.parentCallback(inBounds)
                        }

                    : console.log('no interaction with the results is required by the parent component')}
            >
                <Source id="my-data" type="geojson" data={layerSource}>
                    <Layer ref={layerRef} {...aLayer} />
                </Source>

                {props.locator === true ?
                    <GeolocateControl
                        style={geolocateStyle}
                        auto
                        fitBoundsOptions={{maxZoom: 15}}
                        showAccuracyCircle={false}
                        onViewportChange={setViewport}
                    />
                    : null
                }
                {props.search === true ?
                    <Geocoder mapRef={mapRef} mapboxApiAccessToken={ApiKey} containerRef={geocoderContainerRef} position='bottom-right' />
                    : null
                }
                {props.marker ? 
                    <Markers data={props.marker} onClick={setPopupInfo} />
                    : null
                }

                {popupInfo && (
                    <Popup
                        tipSize={15}
                        offsetLeft={10}
                        anchor="bottom"
                        longitude={parseFloat(popupInfo.longitude)}
                        latitude={parseFloat(popupInfo.latitude)}
                        closeOnClick={true}
                        closeButton={true}
                        onClose={setPopupInfo}
                    >
                        <small>{`${popupInfo.title}`} <br />
                            {`${popupInfo.request_type} - Created ${popupInfo.created_at} by ${popupInfo.user_id} `} <br />
                            {`${popupInfo.description}`} <br />
                        </small>
                        <Button href={`/request/${popupInfo.id}`} target="_blank">Fulfill</Button>
                    </Popup>
                )}
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </MapGL>
            <small>Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small>
        </div>
    )
}