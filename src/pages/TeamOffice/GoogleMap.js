import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 55.765411,
  lng: 37.853334
};

const MapComponent = () => {
  return (
    <div className='halfWidth'>
      <div className="mapStyle" >
        <LoadScript googleMapsApiKey="AIzaSyBAhYFysO5pRYcz-lzz3BVlaQuiE4mxuJc">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapComponent;
