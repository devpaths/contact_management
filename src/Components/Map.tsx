import { Marker, Popup } from "react-leaflet";
import L, { Icon } from 'leaflet';
import React from "react";
import markerIcon from '../img/marker_icon.png';

interface CountryInfo {
  _id: string;
  lat: number;
  long: number;
  country: string;
  active: number;
  recovered: number;
  deaths: number;
}

interface MapProps {
  countriesData: CountryInfo[];
}

const Map: React.FC<MapProps> = ({ countriesData }) => {
  const customMarker: Icon = L.icon({
    iconUrl: markerIcon,
    iconSize: [20, 25],
    iconAnchor: [15, 30]
  });

  return (
    <div>
      {countriesData?.map((country: CountryInfo) => (
        <Marker
          icon={customMarker}
          key={country._id}
          position={[country.lat, country.long]}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>
                Active Cases: {country.active} <br />
                Recovered Cases: {country.recovered} <br />
                Deaths: {country.deaths}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default Map;
