import * as React from 'react';
import { Marker } from 'react-map-gl';
// import service from '../../images/service.svg'
import pin from '../../assets/placeholder.svg'
import { MapPin } from 'react-feather';
const service = "https://img-premium.flaticon.com/png/512/1133/1133579.png?token=exp=1621426038~hmac=ca75b43cf83617ee8f2900f7881d6ef7"

function Markers(props) {
  const {data, onClick} = props;
  const isArray = Array.isArray(data)
    if (isArray === true) {
    return data.map((loc, index) => (
      <Marker key={index} longitude={parseFloat(loc.longitude)} latitude={parseFloat(loc.latitude)}>
        {/* <img src={pin} width={40} alt={`request-${loc.id}-marker`} onClick={() => onClick(loc)} style={{ cursor: 'pointer' }}/> */}
        <MapPin fill={loc.request_type === 'task' ? 'rgb(135, 221, 255)' : 'rgb(255, 169, 135)'} onClick={() => onClick(loc)} style={{ cursor: 'pointer' }} />
      </Marker>
    ));
  } else {
    return (
      <Marker longitude={parseFloat(data.longitude)} latitude={parseFloat(data.latitude)}>
        {/* <img src={pin} width={40} alt={`request-${data.id}-marker`} onClick={() => onClick(data)} style={{ cursor: 'pointer' }}/> */}
        <MapPin fill={data.request_type === 'task' ? 'rgb(135, 221, 255)' : 'rgb(255, 169, 135)'} onClick={() => onClick(data)} style={{ cursor: 'pointer' }}/>
      </Marker>
    )
  }
}

export default Markers