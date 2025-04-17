import { MapContainer, TileLayer, Marker, Popup/*, Polyline */} from 'react-leaflet';
import {LatLngTuple/*, LatLngExpression*/} from 'leaflet';
import 'leaflet/dist/leaflet.css';


function Map()
{
    const position : LatLngTuple = [28.6016, -81.2005];
      /* const path : LatLngExpression[] = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.52, -0.12],
      ]; */

      return (
        <div className="h-full w-full rounded shadow-lg">
          <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Hello from London!</Popup>
            </Marker>
            {/* <Polyline positions={path} color="blue" /> */}
          </MapContainer>
        </div>
      );
}

export default Map;