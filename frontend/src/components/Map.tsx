import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline} from 'react-leaflet';
import {LatLngTuple, LatLngBoundsExpression, LatLngExpression} from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import deselectImage from "../assets/deselect-marker-icon2.png";
import {createGraph, dijkstra} from '../graphing/Dijkstra.ts';

interface Item 
{
  key:string;
  Name: string;
  Abbreviation: string;
  Entrances: any [];
}

interface PropsType 
{
  items: any[];
  renderer: (point: any) => React.ReactNode;
}

interface PathPropsType 
{
  items: number[][];
  renderer: (path: any) => React.ReactNode;
}

const createColoredIcon = (color: string) => 
{
  return L.divIcon({
    className: 'colored-marker', 
    html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
    iconSize: [10, 10], 
    iconAnchor: [5, 5],
    popupAnchor: [0, -10]
  });
};

function Map()
{
  var initPoint : LatLngTuple = [10, 10];
  var paths: number[][] = [];

  const [buildings, setBuilding] = useState(true);
  const [jaywalking, setJaywalking] = useState(false);
  const [grass, setGrass] = useState(false);
  const [parking, setParking] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(initPoint);
  
  var stopPoints = getStops();
  
  const customIcon = createColoredIcon("red");

  // Retrieve graph data
  var data = createGraph(buildings, jaywalking, grass, parking);
  var pointMap = data.pointMap;

  var totalDistance = 0;
  // Calculate 
  for(var i = 0; i < stopPoints.length - 1; i++)
  {
    var result = dijkstra(data.graph, stopPoints[i].Entrances[0].id, stopPoints[i + 1].Entrances[0].id);
    
    if(result.distances.get(stopPoints[i + 1].Entrances[0].id) != undefined)
      totalDistance += result.distances.get(stopPoints[i + 1].Entrances[0].id)!;

    paths.push(result.path);
    console.log("Result: " + result.path);
  }

  localStorage.setItem("graphData", JSON.stringify(
  {
    distanceMi: (totalDistance! * .621371),
    distanceKm : totalDistance
  }));
  //paths = data.pathnum;
  /* if(result.path.length == 0)
    alert("Locations inacessible to each other."); */

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
      var tempSelectedPoint : LatLngTuple = [100, 100];

      if(temp != undefined && temp != null)
      {
        var parsedItem : Item = JSON.parse(temp);

        if(parsedItem.Entrances == undefined || parsedItem.Entrances == null)
          tempSelectedPoint = [100, 100];
        else
          tempSelectedPoint = [parsedItem.Entrances[0].lat, parsedItem.Entrances[0].lon];
      }
      else
        tempSelectedPoint = [100, 100];

      if(tempSelectedPoint[0] != selectedPoint[0] || tempSelectedPoint[1] != selectedPoint[1])
      {
        //console.log(tempSelectedPoint[0] + "=?" + selectedPoint[0]);
        setSelectedPoint(tempSelectedPoint);  
      }    
  }

  const renderPoint = (point : any): React.ReactNode => 
  {
    var pointPosition : LatLngTuple = [point.Entrances[0].lat, point.Entrances[0].lon];

    if(point.Entrances == undefined)
    {
      console.error("Invalid point in stop list point rendering.\n")
      console.error(point);
      return(<div></div>);
    }
    
    var stopPosition = stopPoints.indexOf(point) + 1;
    //console.log(point.Name + ": " + stopPosition);

    if(stopPosition == 1)
      return(
        <Marker position={pointPosition}>
          <Popup closeButton={false}>Start: {point.Name}</Popup>
        </Marker>
      );
    else if(stopPosition == stopPoints.length)
      return(
        <Marker position={pointPosition}>
          <Popup>End: {point.Name}</Popup>
        </Marker>
      );
    else
      return(
        <Marker position={pointPosition}>
          <Popup>Stop {stopPosition}: {point.Name}</Popup>
        </Marker>
      );
  }

  const renderPath = (path : number[]): React.ReactNode =>
  {
    var newPath: LatLngExpression[] = [];

    path.forEach(node => 
    {
      newPath.push([(pointMap.get(node)?.lat)!, (pointMap.get(node)?.lon)!])
    });

    return(
      <Polyline positions={newPath} color="blue" opacity={.5} weight={4}>
        <Popup closeButton={false}>Leg 1</Popup>
      </Polyline>
    );
  }

  function handleDeselect()
  {
    var tempSelectedPoint : LatLngTuple = [100, 100];
    localStorage.setItem("selectedPoint", JSON.stringify(tempSelectedPoint));
    setSelectedPoint(tempSelectedPoint);
    //console.log(selectedPoint);
  }

  var props: PropsType = 
  {
    items: stopPoints,
    renderer: renderPoint
  };

  var pathProps: PathPropsType = 
  {
    items: paths,
    renderer: renderPath
  };

  getSelected();

  const position : LatLngTuple = [28.6016, -81.2005];

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
      [28.5908900, -81.2072900], // SW
      [28.6117300, -81.2072900], // NW
      [28.6117300, -81.1867800], // NE
      [28.5908900, -81.1867800], // SE
      [28.5908900, -81.2072900]  // SW
    ]
  ];
  
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-38/40 self-start border-b-2 dark:border-[#ffca09] border-[#a48100]">
        <div id="map" className="h-full w-full rounded-t-sm">
          <div className="flex items-center justify-center absolute z-10 mt-20 ml-[11px] bg-black/20 text-black rounded-[4px] w-[33px] h-[33px] text-[18px] font-bold cursor-pointer"
          onClick={handleDeselect}>
            <div className="flex items-center justify-center w-[29px] h-[29px] rounded-[2px] bg-[#ffffff] hover:bg-[#f4f4f4]">
              <img className="h-17/20 w-auto" src={deselectImage} alt="Deselect marker icon"></img>
            </div>
          </div>
          <MapContainer center={position} zoom={16} minZoom={15} maxZoom={18} scrollWheelZoom={true} 
            maxBounds={bounds} maxBoundsViscosity={1} className="h-full w-full rounded-t-sm z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedPoint[0] != undefined && selectedPoint[0] != -1 && (
            <Marker position={selectedPoint} icon={customIcon}>
              <Popup>This is the selected point!!</Popup>
            </Marker>
          )}
          {props.items.map((point) => {
          return <div>{props.renderer(point)}</div>;
          })}

          {/* {stopPoints.map((building) => (
            building.Entrances.map((entrance) => (
              <Marker
                key={entrance.id}
                position={[entrance.lat, entrance.lon]}
              >
                <Popup>
                  Building: {building.Name} ({building.Abbreviation})<br />
                  Entrance ID: {entrance.id}
                </Popup>
              </Marker>
            ))
          ))} */}
          {/* <Polyline positions={path} color="blue" /> */}
          {pathProps.items.map((path) => {
          return <div>{pathProps.renderer(path)}</div>;
          })}

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
          <input type="checkbox" value="" checked={buildings} onChange={() => setBuilding(!buildings)} className="w-5 h-5 bg-neutral-100 border-neutral-300 rounded-lg" />
          <h1 className="ml-1">Through buildings</h1>
          <input type="checkbox" value="" checked={jaywalking} onChange={() => setJaywalking(!jaywalking)} className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
          <h1 className="ml-1">Jaywalking</h1>
          <input type="checkbox" value="" checked={parking} onChange={() => setParking(!parking)} className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
          <h1 className="ml-1">Parking lots</h1>
          <input type="checkbox" value="" checked={grass} onChange={() => setGrass(!grass)} className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
          <h1 className="ml-1">Grass</h1>
      </div>
    </div>
  );
}

export default Map;