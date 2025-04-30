import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap/*, Polyline */} from 'react-leaflet';
import {LatLngTuple, LatLngBoundsExpression/*, LatLngExpression*/} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

interface PropsType 
{
    items: any[];
    renderer: (point: any) => React.ReactNode;
}

function Map()
{
  const [buildings, setBuilding] = useState(true);
  const [jaywalking, setJaywalking] = useState(false);
  const [grass, setGrass] = useState(false);
  
  var pts = 
  [
    {id: 1 , lat:           28.60672867347779 , lon:           -81.19661320210739 },
    {id: 2 , lat:           28.606779519897174 , lon:           -81.19673962664857 },
    {id: 3 , lat:           28.60680511136134 , lon:           -81.19677788589577 },
    {id: 4 , lat:           28.60675072949296 , lon:           -81.19676877655114 },
    {id: 5 , lat:           28.606744331624398 , lon:           -81.19684256224278 },
    {id: 6 , lat:           28.60688428491332 , lon:           -81.19695369624708 },
    {id: 7 , lat:           28.6067739217642 , lon:           -81.19703659128291 },
    {id: 8 , lat:           28.60668435158601 , lon:           -81.19711037697408 },
    {id: 9 , lat:           28.60700184553272 , lon:           -81.19687717775223 },
    {id: 10 , lat:           28.606709562988883 , lon:           -81.196870944916 }
  ]

  const renderPoint = (point : any): React.ReactNode => 
  {
    var pointPosition : LatLngTuple = [point.lat, point.lon];

    return(
    <Marker position={pointPosition}>
      <Popup>UCF!</Popup>
    </Marker>
    );
  }

  var props: PropsType = 
  {
    items: pts,
    renderer: renderPoint
  };

  const position : LatLngTuple = [28.6016, -81.2005];
    /* const path : LatLngExpression[] = [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.52, -0.12],
    ]; */

    const bounds: LatLngBoundsExpression = 
    [
      [28.590814194772776, -81.20725051378662], // Southwest corner
      [28.611654822136117, -81.18757949435675]  // Northeast corner
    ];
    

    const outsideBoundsArea : any = 
    [
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
      <div className="w-full h-full">
        <div className="w-full h-38/40 self-start border-b-2 dark:border-[#ffca09] border-[#a48100]">
          <div id="map" className="h-full w-full rounded-t-sm">
            <MapContainer center={position} zoom={16} minZoom={15} maxZoom={18} scrollWheelZoom={true} 
              maxBounds={bounds} maxBoundsViscosity={1} className="h-full w-full rounded-t-sm z-0">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>UCF!</Popup>
              </Marker>
              {props.items.map((point) => {
              return <div>{props.renderer(point)}</div>;
              })}
              {/* <Polyline positions={path} color="blue" /> */}
              <Polygon
                positions={outsideBoundsArea}
                color="#ffca09"
                opacity={.75}
                weight={2}
                fillColor="black"
                fillOpacity={0.4}
              />
              
            </MapContainer>
          </div>
        </div>
        <div className="flex w-full h-2/40 dark:bg-black/50 bg-white/50 font-bold justify-center rounded-b-md items-center">
            <input type="checkbox" value="" checked={buildings} onClick={() => setBuilding(!buildings)} className="w-5 h-5 bg-neutral-100 border-neutral-300 rounded-lg" />
            <h1 className="ml-1">Through buildings</h1>
            <input type="checkbox" value="" checked={jaywalking} onClick={() => setJaywalking(!jaywalking)} className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
            <h1 className="ml-1">Jaywalking</h1>
            <input type="checkbox" value="" checked={grass} onClick={() => setGrass(!grass)} className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
            <h1 className="ml-1">Across grass</h1>
        </div>
      </div>
    );
}

export default Map;