import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import ShowCrimes from "./ShowCrime";
import { data } from "./DemoData";
function LeafletMap() {
  const dataa = data;
  return (
    <div style={{ width: '50rem', height: '50rem' }}>
      <MapContainer center={[28.535517, 77.391029]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ShowCrimes data={data} />
      </MapContainer>
    </div>
  )
}
export default LeafletMap
