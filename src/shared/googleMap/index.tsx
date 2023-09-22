import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import locationMarker from "@assets/icons/location.png";
import axios from "axios";
import { handleFetchAddress } from "../getAddress";
import { height } from "@mui/system";
const AnyReactComponent = () => (
  <div className="text-black-100">
    <img src={locationMarker} width={30} height={30} />
  </div>
);
export default function GoogleMap({ handleMapData, addressInfo, zoom }: any) {
  const [latlng, setLatlng] = useState({
    lat: 33.6094524,
    lng: 73.032644,
  });
  const defaultProps = {
    center: {
      lat: 33.6094524,
      lng: 73.032644,
    },
    zoom: 11,
  };
  useEffect(() => {
    if (addressInfo?.lat) {
      setLatlng({
        lat: addressInfo?.lat,
        lng: addressInfo?.lng,
      });
    }
  }, [addressInfo]);
  const handleAddress = async (e: any) => {
    let _obj = {
      lat: e?.lat,
      lng: e?.lng,
    };
    setLatlng(_obj);
    let _address = await handleFetchAddress(_obj);
    handleMapData({
      delivery_address: _address,
      lat: e?.lat,
      lng: e?.lng,
    });
  };

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDjjNiKps3y27gM7TpL6cyxR01YBnvKcOQ" }}
        defaultCenter={defaultProps?.center}
        center={latlng}
        zoom={zoom}
        defaultZoom={defaultProps.zoom}
        onClick={(e: any) => handleAddress(e)}
        yesIWantToUseGoogleMapApiInternals={false}
      >
        <AnyReactComponent />
      </GoogleMapReact>
    </div>
  );
}
