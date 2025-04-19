import { MapContainer, TileLayer, Marker, Popup, Polygon/*, Polyline */} from 'react-leaflet';
import {LatLngTuple, LatLngBoundsExpression/*, LatLngExpression*/} from 'leaflet';
import 'leaflet/dist/leaflet.css';


function Map()
{
    const position : LatLngTuple = [28.6016, -81.2005];
      /* const path : LatLngExpression[] = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.52, -0.12],
      ]; */

      const bounds: LatLngBoundsExpression = [
        [28.590814194772776, -81.20725051378662], // Southwest corner
        [28.611654822136117, -81.18757949435675]  // Northeast corner
      ];
      

      const outsideBoundsArea : any = [

        [
          [28.64840202840334, -81.26488475758394],
          [28.52485540175175, -81.26488475758394],
          [28.52485540175175, -81.11457124982738],
          [28.64840202840334, -81.11457124982738],
          [28.64840202840334, -81.26488475758394]
        ],
        [
          [28.590814194772776, -81.20725051378662], // SW
          [28.611654822136117, -81.20725051378662], // NW
          [28.611654822136117, -81.18757949435675], // NE
          [28.590814194772776, -81.18757949435675], // SE
          [28.590814194772776, -81.20725051378662]  // SW
        ]

      ];

      return (
        <div className="h-full w-full rounded-md">
          <MapContainer center={position} zoom={16} minZoom={15} maxZoom={18} scrollWheelZoom={true} 
            maxBounds={bounds} maxBoundsViscosity={1} className="h-full w-full rounded-md z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>UCF!</Popup>
            </Marker>
            {/* <Polyline positions={path} color="blue" /> */}
            <Polygon
              positions={outsideBoundsArea}
              color="grey"
              weight={1}
              fillColor="grey"
              fillOpacity={0.5}
            />
            
          </MapContainer>
        </div>
      );
}

export default Map;