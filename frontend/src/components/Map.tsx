import { MapContainer, TileLayer, Marker, Popup, Polygon/*, Polyline */} from 'react-leaflet';
import {LatLngTuple, LatLngBoundsExpression/*, LatLngExpression*/} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
    lat: number;
    long: number;
}

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
  
  var stopPoints = getStops();

  function getStops()
  {
      var temp = localStorage.getItem('stoplist');
      var stopList : Item [] = [];
      
      if(temp != undefined && temp != null)
      {
          stopList = JSON.parse(temp);
      }

      return stopList;      
  }

  function getSelected()
  {
      var temp = localStorage.getItem('selectedPoint');

      if(temp != undefined && temp != null)
      {
        var parsedItem : Item = JSON.parse(temp);
        var selectedPoint : LatLngTuple = [parsedItem.lat, parsedItem.long];
      }
      else
        var selectedPoint : LatLngTuple = [100, 100];

      return selectedPoint;      
  }

  const renderPoint = (point : any): React.ReactNode => 
  {
    var pointPosition : LatLngTuple = [point.lat, point.long];

    if(point.lat == undefined || point.long == undefined)
    {
      console.error("Invalid point in stop list point rendering.\n")
      return(<div></div>);
    }
      
    return(
    <Marker position={pointPosition}>
      <Popup>{point.Name}</Popup>
    </Marker>
    );
  }

  var props: PropsType = 
  {
    items: stopPoints,
    renderer: renderPoint
  };

  const position : LatLngTuple = getSelected();

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
                <Popup>This is the selected point!!</Popup>
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