import React from 'react';
import LeafLet from 'leaflet';
import {MapContainer,Marker,TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// @ts-ignore
delete LeafLet.Icon.Default.prototype._getIconUrl;
LeafLet.Icon.Default.mergeOptions({
    iconUrl:markerIcon.src,
    iconRetinaUrl:markerIcon2x.src,
    shadowUrl:markerShadow.src
})

interface MapProps{
    center?:number[];
}
function Map({center}:MapProps) {
  return (
    <MapContainer center={center as LeafLet.LatLngExpression || [51,-0.09]}
    zoom={center? 4:2}
    scrollWheelZoom={false}
    className='h-[30vh] rounded-lg'
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
        center && (
          <Marker position={center as LeafLet.LatLngExpression}/>
        )
      }
    </MapContainer>
  )
}

export default Map;