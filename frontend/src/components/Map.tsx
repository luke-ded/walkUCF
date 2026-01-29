import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Polyline,
  useMap,
} from "react-leaflet";
import { LatLngTuple, LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { v4 as uuidv4 } from "uuid";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import deselectImage from "../assets/gold-deselect-marker-icon.png";
import selectImage from "../assets/gold-select-marker-icon.png";
import standardImage from "../assets/standard-marker-icon.png";
import { createGraph, dijkstra } from "./Dijkstra.ts";

interface Item {
  key: string;
  name: string;
  alternateName?: string;
  abbreviation: string;
  Entrances: any[];
  selectedEntrance: number;
  permitType?: string[];
}

interface PropsType {
  items: any[];
  renderer: (point: any) => React.ReactNode;
}

interface PathPropsType {
  items: number[][];
  renderer: (path: any, index: number) => React.ReactNode;
}

interface ChildProps {
  triggerRerender: () => void;
  toggleError: (error: boolean) => void;
  stops: any[];
}
interface MapPanHandlerProps {
  targetPoint: LatLngTuple;
}

const MapPanHandler: React.FC<MapPanHandlerProps> = ({ targetPoint }) => {
  const map = useMap();

  useEffect(() => {
    if (targetPoint && targetPoint[0] !== 100 && targetPoint[0] !== -1) {
      const latLng = L.latLng(targetPoint[0], targetPoint[1]);
      const bounds = L.latLngBounds(latLng, latLng);

      map.fitBounds(bounds, { padding: [50, 50], maxZoom: map.getZoom() });
    }
  }, [targetPoint, map]);

  return null;
};

const createSelectIcon = () => {
  return L.divIcon({
    className: "colored-marker",
    html: `
    <div style="width: 25px; height: 40px;" aria-label="Deselect button">
      <img style="width:auto; height: 41px;" src=${selectImage} alt="Deselect marker icon"/>
    </div>`,
    iconSize: [10, 10],
    iconAnchor: [12, 41],
    popupAnchor: [0, -10],
  });
};

const createCurrentLocIcon = () => {
  return L.divIcon({
    className: "current-marker",
    html: `
    <div style="width: 25px; height: 25px; background-color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.5);" aria-label="Deselect button">
      <div style="width:19px; height:19px; background-color: blue; background: linear-gradient(to bottom, #4899d0, #1975c8); border-radius: 50%;"/>
    </div>`,
    iconSize: [10, 10],
    iconAnchor: [11.5, 15],
    popupAnchor: [0, 0],
  });
};

const createStandardIcon = () => {
  return L.divIcon({
    className: "standard-marker",
    html: `
    <div style="width: 25px; height: 40px;" aria-label="Deselect button">
      <img style="width:auto; height: 41px;" src=${standardImage} alt="Deselect marker icon"/>
    </div>`,
    iconSize: [10, 10],
    iconAnchor: [12, 41],
    popupAnchor: [0, -10],
  });
};

const displayAllPaths = false; // Change to true to view all paths

const Map: React.FC<ChildProps> = ({ stops, triggerRerender, toggleError }) => {
  var initVals = [true, false, false, false];
  var initData = localStorage.getItem("mapOptions");
  if (initData != undefined) initVals = JSON.parse(initData);

  const [buildings, setBuilding] = useState(initVals[0]);
  const [jaywalking, setJaywalking] = useState(initVals[1]);
  const [grass, setGrass] = useState(initVals[2]);
  const [parking, setParking] = useState(initVals[3]);
  const [selectedPoint, setSelectedPoint] = useState<LatLngTuple>([-1, -1]);
  const [paths, setPaths] = useState<number[][]>([]);
  const [currentLocation, setCurrentLocation] = useState<LatLngTuple>([-1, -1]);

  const selectIcon = createSelectIcon();
  const currentIcon = createCurrentLocIcon();
  const standardIcon = createStandardIcon();

  // Retrieve graph data
  var data = createGraph(buildings, jaywalking, grass, parking);
  var pointMap = data.pointMap;
  var graphData = JSON.parse(localStorage.getItem("graphData")!);
  var settings = JSON.parse(localStorage.getItem("settings")!);

  function currentLocationHandler() {
    var currentSettings = JSON.parse(localStorage.getItem("settings")!);

    if (currentSettings.showLocation == false) {
      if (currentLocation[0] != -1 || currentLocation[1] != -1)
        setCurrentLocation([-1, -1]);
      return;
    }

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (
          currentLocation[0] == position.coords.latitude &&
          currentLocation[1] == position.coords.longitude
        )
          return;

        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        localStorage.setItem(
          "currentLocation",
          JSON.stringify([position.coords.latitude, position.coords.longitude]),
        );
      },
      (_e) => {
        //console.error(_e.message);
      },
    );
  }

  useEffect(() => {
    currentLocationHandler();
    setInterval(() => {
      currentLocationHandler();
    }, 2000);
  }, []);

  useEffect(() => {
    handleDeselect();
    var totalDistance = 0;
    var tempPaths: number[][] = [];

    // Calculate
    for (var i = 0; i < stops.length - 1; i++) {
      if (stops[i].selectedEntrance == -1) {
        console.error("Entrance " + i + " not set in path calculation.");
        toggleError(true);

        break;
      }

      var result = dijkstra(
        data.graph,
        stops[i].Entrances[stops[i].selectedEntrance - 1].id,
        stops[i + 1].Entrances[stops[i + 1].selectedEntrance - 1].id,
      );

      if (result.path.length == 0) toggleError(true);

      if (stops[i + 1].selectedEntrance == -1) {
        console.error("Entrance " + (i + 1) + " not set in path calculation.");
        toggleError(true);

        break;
      }
      if (
        result.distances.get(
          stops[i + 1].Entrances[stops[i + 1].selectedEntrance - 1].id,
        ) != undefined
      )
        totalDistance += result.distances.get(
          stops[i + 1].Entrances[stops[i + 1].selectedEntrance - 1].id,
        )!;

      tempPaths.push(result.path);
    }

    localStorage.setItem(
      "graphData",
      JSON.stringify({
        distanceMi: totalDistance! * 0.621371,
        distanceKm: totalDistance,
      }),
    );

    if (displayAllPaths) tempPaths = data.pathnum;

    localStorage.setItem(
      "mapOptions",
      JSON.stringify([buildings, jaywalking, grass, parking]),
    );

    setPaths(tempPaths);
    triggerRerender();
  }, [stops, buildings, jaywalking, grass, parking]);

  function getSelected() {
    var temp = localStorage.getItem("selectedPoint");
    var tempSelectedPoint: LatLngTuple = [-1, -1];

    if (temp != undefined && temp != null) {
      var parsedItem: Item = JSON.parse(temp);

      if (parsedItem.Entrances == undefined || parsedItem.Entrances == null)
        tempSelectedPoint = [-1, -1];
      else {
        if (parsedItem.selectedEntrance == -1)
          tempSelectedPoint = [
            parsedItem.Entrances[0].lat,
            parsedItem.Entrances[0].lon,
          ];
        else
          tempSelectedPoint = [
            parsedItem.Entrances[parsedItem.selectedEntrance - 1].lat,
            parsedItem.Entrances[parsedItem.selectedEntrance - 1].lon,
          ];
      }
    } else tempSelectedPoint = [-1, -1];

    if (
      tempSelectedPoint[0] != selectedPoint[0] ||
      tempSelectedPoint[1] != selectedPoint[1]
    ) {
      setSelectedPoint(tempSelectedPoint);
    }
  }

  const renderPoint = (point: any): React.ReactNode => {
    var pointPosition: LatLngTuple = [
      point.Entrances[point.selectedEntrance - 1].lat,
      point.Entrances[point.selectedEntrance - 1].lon,
    ];

    if (point.Entrances == undefined) {
      console.error("Invalid point in stop list point rendering.\n");
      console.error(point);
      return <div></div>;
    }

    var stopPosition = stops.indexOf(point) + 1;

    if (stopPosition == 1)
      return (
        <Marker position={pointPosition} icon={standardIcon}>
          <Popup closeButton={false}>Start: {point.Name}</Popup>
        </Marker>
      );
    else if (stopPosition == stops.length)
      return (
        <Marker position={pointPosition} icon={standardIcon}>
          <Popup>End: {point.Name}</Popup>
        </Marker>
      );
    else
      return (
        <Marker position={pointPosition} icon={standardIcon}>
          <Popup>
            Stop {stopPosition}: {point.Name}
          </Popup>
        </Marker>
      );
  };

  const renderPath = (path: number[], index: number): React.ReactNode => {
    var newPath: LatLngExpression[] = [];

    path.forEach((node) => {
      newPath.push([pointMap.get(node)?.lat, pointMap.get(node)?.lon] as LatLngExpression);
    });

    return (
      <Polyline positions={newPath} color="blue" opacity={0.5} weight={4}>
        <Popup closeButton={false}>Leg {index + 1}</Popup>
      </Polyline>
    );
  };

  function handleDeselect() {
    var tempSelectedPoint: LatLngTuple = [-1, -1];
    localStorage.setItem("selectedPoint", JSON.stringify(tempSelectedPoint));

    setSelectedPoint(tempSelectedPoint);
  }

  var props: PropsType = {
    items: stops,
    renderer: renderPoint,
  };

  var pathProps: PathPropsType = {
    items: paths,
    renderer: renderPath,
  };

  getSelected();

  const position: LatLngTuple = [28.6016, -81.2005];

  const bounds: LatLngBoundsExpression = [
    [28.590814194772776, -81.20725051378662], // Southwest corner
    [28.611654822136117, -81.18757949435675], // Northeast corner
  ];

  const outsideBoundsArea: any = [
    [
      [28.64840202840334, -81.26488475758394],
      [28.52485540175175, -81.26488475758394],
      [28.52485540175175, -81.11457124982738],
      [28.64840202840334, -81.11457124982738],
      [28.64840202840334, -81.26488475758394],
    ],
    [
      [28.59089, -81.20729], // SW
      [28.61173, -81.20729], // NW
      [28.61173, -81.18678], // NE
      [28.59089, -81.18678], // SE
      [28.59089, -81.20729], // SW
    ],
  ];

  return (
    <div className="h-full w-full">
      <div className="relative flex h-37/40 w-full self-start border-b-2 border-[#a48100] max-sm:h-35/40 dark:border-[#ffca09]">
        <div id="map" className="relative h-full w-full flex-col rounded-t-sm">
          <div
            className="absolute z-10 mt-20 ml-[11px] flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded-[4px] bg-black/20 text-[18px] font-bold text-black"
            onClick={handleDeselect}
          >
            <div
              className={`flex h-[29px] w-[29px] items-center justify-center rounded-[2px] ${selectedPoint[0] !== -1 ? "bg-[#ffffff] hover:bg-[#f4f4f4] active:bg-[#b5b5b5]" : "bg-[#cccccc]"}`}
            >
              <img
                className="h-17/20 w-auto"
                src={deselectImage}
                alt="Deselect marker icon"
                title="Deselect"
              ></img>
            </div>
          </div>
          <div className="absolute top-0 right-0 z-10 flex items-center justify-center rounded-[4px] rounded-tl-none rounded-tr-sm rounded-br-none rounded-bl-md border-b-2 border-l-2 border-[#a48100] bg-white/80 p-1 pl-3 text-neutral-700 dark:border-[#ffca09] dark:bg-black/55">
            <div className="text-md mr-2 flex max-sm:text-sm dark:text-neutral-100">
              <h1>
                {settings.walkSpeed != 0 &&
                graphData.distanceMi != null &&
                graphData != undefined &&
                settings.walkSpeed != null
                  ? (
                      graphData?.distanceMi.toFixed(2) /
                      (settings.walkSpeed / 60)
                    ).toFixed(1)
                  : "0"}{" "}
                min&nbsp;
              </h1>
              <h1 className="font-bold dark:text-white">|</h1>
              <h1>
                &nbsp;
                {settings.units == "imperial"
                  ? graphData?.distanceMi.toFixed(2) + " mi"
                  : graphData?.distanceKm.toFixed(2) + " km"}
              </h1>
            </div>
          </div>
          <MapContainer
            center={position}
            zoom={16}
            minZoom={15}
            maxZoom={18}
            scrollWheelZoom={true}
            maxBounds={bounds}
            maxBoundsViscosity={1}
            className="z-0 h-full w-full rounded-t-sm"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectedPoint[0] != -1 && (
              <Marker position={selectedPoint} icon={selectIcon} />
            )}
            {currentLocation[0] != -1 && settings.showLocation && (
              <Marker position={currentLocation} icon={currentIcon} />
            )}
            {props.items.map((point) => {
              return <div key={uuidv4()}>{props.renderer(point)}</div>;
            })}
            {pathProps.items.map((path, index) => {
              return <div key={index}>{pathProps.renderer(path, index)}</div>;
            })}
            {selectedPoint[0] !== -1 && (
              <MapPanHandler targetPoint={selectedPoint} />
            )}
            <Polygon
              positions={outsideBoundsArea}
              color="#ffca09"
              opacity={0.75}
              weight={2}
              fillColor="black"
              fillOpacity={0.4}
            />
          </MapContainer>
        </div>
      </div>
      <div className="text-md flex h-3/40 w-full items-center justify-center rounded-b-sm bg-white/50 font-bold max-xl:text-xs max-sm:h-5/40 dark:bg-black/50">
        <button
          className={`ml-[3%] flex inline-block h-8/10 w-fit items-center rounded-sm border-2 border-[#a48100] px-1 text-center dark:border-[#ffca09] ${!buildings ? "bg-[#a48100] text-neutral-200 dark:bg-[#ffca09] dark:text-neutral-700" : "bg-[#ffca09]/60 text-neutral-600 dark:text-neutral-50"} cursor-pointer text-center font-bold hover:bg-[#ffca09]/60 hover:text-neutral-600 dark:hover:text-neutral-50`}
          onClick={() => setBuilding(!buildings)}
        >
          Buildings
        </button>
        <button
          className={`ml-[3%] flex inline-block h-8/10 w-fit items-center rounded-sm border-2 border-[#a48100] px-1 text-center dark:border-[#ffca09] ${!jaywalking ? "bg-[#a48100] text-neutral-200 dark:bg-[#ffca09] dark:text-neutral-700" : "bg-[#ffca09]/60 text-neutral-600 dark:text-neutral-50"} cursor-pointer text-center font-bold hover:bg-[#ffca09]/60 hover:text-neutral-600 dark:hover:text-neutral-50`}
          onClick={() => setJaywalking(!jaywalking)}
        >
          Jaywalking
        </button>
        <button
          className={`ml-[3%] flex inline-block h-8/10 w-fit items-center rounded-sm border-2 border-[#a48100] px-1 text-center dark:border-[#ffca09] ${!parking ? "bg-[#a48100] text-neutral-200 dark:bg-[#ffca09] dark:text-neutral-700" : "bg-[#ffca09]/60 text-neutral-600 dark:text-neutral-50"} cursor-pointer text-center font-bold hover:bg-[#ffca09]/60 hover:text-neutral-600 dark:hover:text-neutral-50`}
          onClick={() => setParking(!parking)}
        >
          Parking Lots
        </button>
        <button
          className={`mr-[3%] ml-[3%] flex inline-block h-8/10 w-fit items-center rounded-sm border-2 border-[#a48100] px-1 text-center dark:border-[#ffca09] ${!grass ? "bg-[#a48100] text-neutral-200 dark:bg-[#ffca09] dark:text-neutral-700" : "bg-[#ffca09]/60 text-neutral-600 dark:text-neutral-50"} cursor-pointer text-center font-bold hover:bg-[#ffca09]/60 hover:text-neutral-600 dark:hover:text-neutral-50`}
          onClick={() => setGrass(!grass)}
        >
          Grass
        </button>
      </div>
    </div>
  );
};

export default Map;
