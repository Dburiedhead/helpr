import React, { useState, useRef } from 'react';
import MapGL, { Popup, NavigationControl, ScaleControl, GeolocateControl, Layer, Source } from 'react-map-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax
// import mapboxgl from "!mapbox-gl";
import Geocoder from "react-map-gl-geocoder";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
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


export default function Map(props) {

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
                onInteractionStateChange={ function() {
                    let inBounds = [];
                    let map = mapRef.current.getMap();
                    let bounds = map.getBounds();
                    // console.log(bounds)
                    props.marker.forEach(marker => {
                        let coordinates = [marker.longitude, marker.latitude]
                        if (bounds.contains(coordinates)) {
                            inBounds.push(marker.id)
                        }
                    });
                    console.log(inBounds)
                }}
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
                <Markers data={props.marker} onClick={setPopupInfo} />

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
                        <p>{`${popupInfo.title} - ${popupInfo.user_id}`} <br />
                            {`${popupInfo.request_type} - Created ${popupInfo.created_at}`} <br />
                            {`Go to request page${popupInfo.id} - Fulfill${popupInfo.user_id}`}
                        </p>
                        <Button href={`/request/${popupInfo.id}`} target="_blank">Fulfill</Button>
                    </Popup>
                )}
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </MapGL>
            <p>Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </div>
    )
}