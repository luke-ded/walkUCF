import { MapContainer, TileLayer, Marker, Popup, Polygon, Polyline} from 'react-leaflet';
import {LatLngTuple, LatLngBoundsExpression, LatLngExpression} from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import deselectImage from "../assets/gold-deselect-marker-icon.png";
import selectImage from "../assets/gold-select-marker-icon.png";
import standardImage from "../assets/standard-marker-icon.png";
import {createGraph, dijkstra} from './Dijkstra.ts';

interface Item 
{
  key:string;
  Name: string;
  Abbreviation: string;
  Entrances: any [];
  selectedEntrance: number;
}

interface PropsType 
{
  items: any[];
  renderer: (point: any) => React.ReactNode;
}

interface PathPropsType 
{
  items: number[][];
  renderer: (path: any, index: number) => React.ReactNode;
}

interface ChildProps
{
  triggerRerender: () => void;
  toggleError: (error: boolean) => void;
  stops: any [];
}

const createSelectIcon = () => 
{
  return L.divIcon({
    className: 'colored-marker', 
    html: `
    <div style="width: 25px; height: 40px;" aria-label="Deselect button">
      <img style="width:auto; height: 41px;" src=${selectImage} alt="Deselect marker icon"/>
    </div>`,
    iconSize: [10, 10], 
    iconAnchor: [12, 41],
    popupAnchor: [0, -10]
  });
};

const createStandardIcon = () => 
{
  return L.divIcon({
    className: 'standard-marker', 
    html: `
    <div style="width: 25px; height: 40px;" aria-label="Deselect button">
      <img style="width:auto; height: 41px;" src=${standardImage} alt="Deselect marker icon"/>
    </div>`,
    iconSize: [10, 10], 
    iconAnchor: [12, 41],
    popupAnchor: [0, -10]
  });
};

const Map: React.FC<ChildProps> = ({ stops, triggerRerender, toggleError}) =>
{
  var initPoint : LatLngTuple = [10, 10];
  var initVals = [true, false, false, false];

  var initData = localStorage.getItem("mapOptions");
  if(initData != undefined)
    initVals = JSON.parse(initData);
    
  const [buildings, setBuilding] = useState(initVals[0]);
  const [jaywalking, setJaywalking] = useState(initVals[1]);
  const [grass, setGrass] = useState(initVals[2]);
  const [parking, setParking] = useState(initVals[3]);
  const [selectedPoint, setSelectedPoint] = useState(initPoint);
  const [paths, setPaths] = useState<number[][]>([]);
  
  const selectIcon = createSelectIcon();
  const standardIcon = createStandardIcon();

  // Retrieve graph data
  var data = createGraph(buildings, jaywalking, grass, parking);
  var pointMap = data.pointMap;

  useEffect(() =>
  {
    console.log("graphing");
    handleDeselect();
    var totalDistance = 0;
    var tempPaths: number[][] = [];

    // Calculate 
    for(var i = 0; i < stops.length - 1; i++)
    {
      if(stops[i].selectedEntrance == -1)
      {
        alert("Do something");
      }
   
      var result = dijkstra(data.graph, stops[i].Entrances[stops[i].selectedEntrance - 1].id, stops[i + 1].Entrances[stops[i + 1].selectedEntrance - 1].id);
      
      if(result.path.length == 0)
        toggleError(true);

      if(stops[i + 1].selectedEntrance == -1)
      {
        alert("Do something");
      }
      if(result.distances.get(stops[i + 1].Entrances[stops[i + 1].selectedEntrance - 1].id) != undefined)
        totalDistance += result.distances.get(stops[i + 1].Entrances[stops[i + 1].selectedEntrance - 1].id)!;

      tempPaths.push(result.path);
      //console.log("Result: " + result.path);
    }

    localStorage.setItem("graphData", JSON.stringify(
    {
      distanceMi: (totalDistance! * .621371),
      distanceKm : totalDistance
    }));
    //tempPaths = data.pathnum;

    localStorage.setItem("mapOptions", JSON.stringify([buildings, jaywalking, grass, parking]));

    setPaths(tempPaths);
    triggerRerender();
  }, [stops, buildings, jaywalking, grass, parking]);

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
        {
          if(parsedItem.selectedEntrance == -1)
          tempSelectedPoint = [parsedItem.Entrances[0].lat, parsedItem.Entrances[0].lon];
          else
            tempSelectedPoint = [parsedItem.Entrances[parsedItem.selectedEntrance -1].lat, parsedItem.Entrances[parsedItem.selectedEntrance -1].lon];
        }
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
    var pointPosition : LatLngTuple = [point.Entrances[point.selectedEntrance - 1].lat, point.Entrances[point.selectedEntrance - 1].lon];

    if(point.Entrances == undefined)
    {
      console.error("Invalid point in stop list point rendering.\n")
      console.error(point);
      return(<div></div>);
    }
    
    var stopPosition = stops.indexOf(point) + 1;
    //console.log(point.Name + ": " + stopPosition);

    if(stopPosition == 1)
      return(
        <Marker position={pointPosition} icon={standardIcon}>
          <Popup closeButton={false}>Start: {point.Name}</Popup>
        </Marker>
      );
    else if(stopPosition == stops.length)
      return(
        <Marker position={pointPosition} icon={standardIcon}>
          <Popup>End: {point.Name}</Popup>
        </Marker>
      );
    else
      return(
        <Marker position={pointPosition} icon={standardIcon}>
          <Popup>Stop {stopPosition}: {point.Name}</Popup>
        </Marker>
      );
  }

  const renderPath = (path : number[], index: number): React.ReactNode =>
  {
    var newPath: LatLngExpression[] = [];
    
    path.forEach(node => 
    {
      newPath.push([(pointMap.get(node)?.lat)!, (pointMap.get(node)?.lon)!])
    });

    console.log("in renderpath,");
    return(
      <Polyline positions={newPath} color="blue" opacity={.5} weight={4}>
        <Popup closeButton={false}>Leg {index + 1}</Popup>
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
    items: stops,
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
  
  var graphData = JSON.parse(localStorage.getItem("graphData")!);
  var settings = JSON.parse(localStorage.getItem("settings")!);

  return (
    <div className="w-full h-full">
      <div className="relative flex w-full h-37/40 max-sm:h-35/40 self-start border-b-2 dark:border-[#ffca09] border-[#a48100]">
        <div id="map" className="relative flex-col h-full w-full rounded-t-sm">
          <div className="flex items-center justify-center absolute z-10 mt-20 ml-[11px] bg-black/20 text-black rounded-[4px] w-[33px] h-[33px] text-[18px] font-bold cursor-pointer"
          onClick={handleDeselect}>
            <div className="flex items-center justify-center w-[29px] h-[29px] rounded-[2px] bg-[#ffffff] hover:bg-[#f4f4f4]">
              <img className="h-17/20 w-auto" src={deselectImage} alt="Deselect marker icon"></img>
            </div>
          </div>
          <div className="flex items-center justify-center absolute z-10 top-0 right-0 bg-black/55 text-black rounded-[4px] p-1 pl-3 rounded-tr-sm rounded-bl-md rounded-tl-none rounded-br-none border-b-2 border-l-2 dark:border-[#ffca09] border-[#a48100]">
             <div className="flex mr-2 text-neutral-100 text-md max-sm:text-sm">
                <h1>{settings.walkSpeed != 0 && graphData.distanceMi != null && graphData != undefined && settings.walkSpeed != null? (graphData?.distanceMi.toFixed(2) / (settings.walkSpeed/60)).toFixed(1) : "0"} min&nbsp;</h1> 
                <h1 className="text-white font-bold">|</h1>
                <h1>&nbsp;{settings.units == "imperial" ? graphData?.distanceMi.toFixed(2) + " mi": graphData?.distanceKm.toFixed(2) + " km"}</h1>
            </div>
          </div>
          <MapContainer center={position} zoom={16} minZoom={15} maxZoom={18} scrollWheelZoom={true} 
            maxBounds={bounds} maxBoundsViscosity={1} className="h-full w-full rounded-t-sm z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedPoint[0] != undefined && selectedPoint[0] != -1 && (
            <Marker position={selectedPoint} icon={selectIcon} />
          )}
          {props.items.map((point) => {
          return <div>{props.renderer(point)}</div>;
          })}

          {/* {stops.map((building) => (
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
          {pathProps.items.map((path, index) => {
          return <div>{pathProps.renderer(path, index)}</div>;
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
      <div className="flex justify-center w-full h-3/40 max-sm:h-5/40 dark:bg-black/50 bg-white/50 font-bold text-md max-xl:text-xs rounded-b-sm items-center">
          <button className = {`flex items-center rounded-sm inline-block h-8/10 w-fit ml-[3%] px-1 border-2 dark:border-[#ffca09] border-[#a48100] text-center ${!buildings ? "dark:text-neutral-700 text-neutral-200 dark:bg-[#ffca09] bg-[#a48100]" : "dark:text-neutral-50 text-neutral-600 bg-[#ffca09]/60"} dark:hover:text-neutral-50 hover:text-neutral-600 text-center hover:bg-[#ffca09]/60 font-bold cursor-pointer`}
           onClick={() => setBuilding(!buildings)}>Buildings</button>
          <button className = {`flex items-center rounded-sm inline-block h-8/10 w-fit ml-[3%] px-1 border-2 dark:border-[#ffca09] border-[#a48100] text-center ${!jaywalking ? "dark:text-neutral-700 text-neutral-200 dark:bg-[#ffca09] bg-[#a48100]" : "dark:text-neutral-50 text-neutral-600 bg-[#ffca09]/60"} dark:hover:text-neutral-50 hover:text-neutral-600 text-center hover:bg-[#ffca09]/60 font-bold cursor-pointer`}
           onClick={() => setJaywalking(!jaywalking)}>Jaywalking</button>
          <button className = {`flex items-center rounded-sm inline-block h-8/10 w-fit ml-[3%] px-1 border-2 dark:border-[#ffca09] border-[#a48100] text-center ${!parking ? "dark:text-neutral-700 text-neutral-200 dark:bg-[#ffca09] bg-[#a48100]" : "dark:text-neutral-50 text-neutral-600 bg-[#ffca09]/60"} dark:hover:text-neutral-50 hover:text-neutral-600 text-center hover:bg-[#ffca09]/60 font-bold cursor-pointer`}
           onClick={() => setParking(!parking)}>Parking Lots</button>
          <button className = {`flex items-center rounded-sm inline-block h-8/10 w-fit ml-[3%] mr-[3%] px-1 border-2 dark:border-[#ffca09] border-[#a48100] text-center ${!grass ? "dark:text-neutral-700 text-neutral-200 dark:bg-[#ffca09] bg-[#a48100]" : "dark:text-neutral-50 text-neutral-600 bg-[#ffca09]/60"} dark:hover:text-neutral-50 hover:text-neutral-600 text-center hover:bg-[#ffca09]/60 font-bold cursor-pointer`}
           onClick={() => setGrass(!grass)}>Grass</button>
      </div>
    </div>
  );
}

export default Map;