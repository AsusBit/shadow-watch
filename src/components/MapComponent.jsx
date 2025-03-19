import React from 'react';
import { MapContainer, TileLayer, Marker, Popup,  useMapEvents } from 'react-leaflet';
import {Search, Hourglass, Car, Users, CheckCircle,  Skull, Lock, UserMinus, Banknote, Gavel} from 'lucide-react'
import L from 'leaflet';

// Fix the default marker icon issue from the library
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});




const statusIcons = {
    "Under Investigation": { icon: <Search color="white" />, label: "Under Investigation", color: "#eab308" },
    "Pending": { icon: <Hourglass color="white" />, label: "Pending", color: "gray" },
    "En Route": { icon: <Car color="white" />, label: "En Route", color: "blue" },
    "On Scene": { icon: <Users color="white" />, label: "On Scene", color: "red" },
    "Resolved": { icon: <CheckCircle color="white" />, label: "Resolved", color: "green" }
  };

  const crimeTypeIcons = {
    "Robbery": { icon: <Banknote color="#D32F2F" />, label: "Robbery", color: "#D32F2F" },
    "Assault": { icon: <Gavel color="#E65100" />, label: "Assault", color: "#E65100" },
    "Homicide": { icon: <Skull color="#8B0000" />, label: "Homicide", color: "#8B0000" },
    "Kidnapping": { icon: <UserMinus color="#6A1B9A" />, label: "Kidnapping", color: "#6A1B9A" },
    "Theft": { icon: <Lock color="#1565C0" />, label: "Theft", color: "#1565C0" }
  };

  const formatDateTime = (dateString) => {
    const [year, month, day, hour, minute] = dateString.split('-');
    const date = new Date(year, month-1, day, hour, minute);
    return date.toLocaleString();
  }
  
  const MapClickHandler = ({setLat, setLng, showConfirm, setShowConfirm}) => {
    useMapEvents({
      click: (e) => {
        const {lat, lng} = e.latlng;
        setLat(lat)
        setLng(lng)
        if (!showConfirm){
          setShowConfirm(true)
        }
      }
    })
    return null
  }
const MapComponent = ({crimes, markerRefs, setLat, setLng, enableSelect, showConfirm, setShowConfirm}) => {
  const position = [21.505, 56.09]; // Latitude and Longitude for the center of the map
  // what I can do is, take the lat and lng from here, and if their values have any value (from null to true) it places a marker or submits the function
  return (
    <MapContainer center={position} zoom={7} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {enableSelect && <MapClickHandler showConfirm={showConfirm} setShowConfirm={setShowConfirm} setLat={setLat} setLng={setLng}/>}
    {crimes.map((crime) => (
  <Marker ref={(el) => (markerRefs.current[crime.id] = el)} position={[crime.latitude, crime.longitude]} key={crime.id} color={'#FFF'}>
    <Popup >
      <div className="p-4">
        {/* Status Badge */}
        <div 
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-white text-sm font-medium"
          style={{ backgroundColor: statusIcons[crime.report_status]?.color }}
        >
          <span className="flex items-center">
            {statusIcons[crime.report_status]?.icon}
          </span>
          <span>{statusIcons[crime.report_status]?.label}</span>
        </div>
        
        {/* Crime Details */}
        <div className="mb-4 text-gray-700 font-exo">
          <p className="mb-2">{crime.report_details}</p>
        </div>
        
        {/* Crime Type */}
        <div 
          className="flex items-center gap-2 p-2 rounded-md text-sm"
          style={{ 
            backgroundColor: `${crimeTypeIcons[crime.crime_type]?.color}15`,
            borderLeft: `4px solid ${crimeTypeIcons[crime.crime_type]?.color}`
          }}
        >
          <span className="flex items-center">
            {crimeTypeIcons[crime.crime_type]?.icon}
          </span>
          <span className="font-medium" style={{ color: crimeTypeIcons[crime.crime_type]?.color }}>
            {crime.crime_type}
          </span>
        </div>

        <div className='my-3'>
            <span>
                {formatDateTime(crime.report_date_time)}
            </span>
        </div>


      </div>

    </Popup>

  </Marker>
))}

    </MapContainer>

  );
};

export default MapComponent;
