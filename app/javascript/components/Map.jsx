import React, { useState, useRef } from 'react';
import MapGL, { Popup, NavigationControl, ScaleControl, GeolocateControl, Layer, Source } from 'react-map-gl'
// eslint-disable-next-line import/no-webpack-loader-syntax
// import mapboxgl from "!mapbox-gl";
import Geocoder from "react-map-gl-geocoder";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Markers from './Markers';

const data = {
    // id: 'mysource',
    type: 'geojson',
    features: [
        {type: 'Feature',
        geometry: {
            type: 'Feature',
            coordinates: [
                [48.911606, 2.220036],
                [48.909669, 2.217178]
            ]}
        },

    ]
  };

  const aLayer = {
    // source: {
    //     type: "vector",
    //     url: "mapbox://mapbox.04w69w5j"
    // },
    // source: {
    //     // id: 'point',
    //     type: "geojson",
    //     features: [
    //         {type: 'Point',
    //         geometry: {
    //             type: 'Feature',
    //             coordinates: [
    //                 [48.911606, 2.220036],
    //                 [48.909669, 2.217178]
    //             ]}
    //         },
    
    //     ]
    // },
    id: 'point',
    // 'source': 'airports',
    // 'source-layer': 'ne_10m_airports',
    type: 'circle',
    paint: {
        'circle-color': '#4264fb',
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff'
    }
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

    function showCoordinates(e) {
        console.log(e.lngLat);
}

export default function Map(props) {

    const [popupInfo, setPopupInfo] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 48.856614,
        longitude: 2.3522219,
        zoom: 15
    });

    const mapRef = useRef();

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
                // onInteractionStateChange={e => {
                //     const features = mapRef.current.queryRenderedFeatures()
                //     console.log(features.map(f => f.id))}
                // }
               
            >
                {/* <Source id="my-data" type="geojson" data={data}>
                    <Layer {...aLayer} />
                </Source> */}

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