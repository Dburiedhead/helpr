import * as React from 'react';
import { Marker } from 'react-map-gl';
import { MapPin } from 'react-feather';
import axios from 'axios'


function getUserName() {
  axios.get(`/api/v1/users/${props.user_id}}`)
    .then(res => {
      let user_name = res.data.first_name
      this.setState({ user_name })
    })
    .catch(error => {
      console.log(error);
    });
}

function Markers(props) {
  const { data, onClick } = props;
  const isArray = Array.isArray(data)
  if (isArray === true) {
    return data.map((loc, index) => (
      <Marker key={index} longitude={parseFloat(loc.longitude)} latitude={parseFloat(loc.latitude)}>
        <MapPin fill={loc.request_type === 'task' ? '#A6E1FA' : '#EF7B45'} onClick={() => onClick(loc)} style={{ cursor: 'pointer' }} />
      </Marker>
    ));
  } else {
    return (
      <Marker longitude={parseFloat(data.longitude)} latitude={parseFloat(data.latitude)}>
        <MapPin fill={data.request_type === 'task' ? '#A6E1FA' : '#EF7B45'} onClick={() => onClick(data)} style={{ cursor: 'pointer' }} />
      </Marker>
    )
  }
}

export default Markers