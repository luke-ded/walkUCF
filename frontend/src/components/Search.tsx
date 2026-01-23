import { useState, useRef } from "react";
import locations from "../json_files/locations.json";
import { nearestPoint } from "./Nearest.ts";
import { IoSearch } from "react-icons/io5";
import { TiLocationArrow } from "react-icons/ti";

interface Item {
  key: string;
  name: string;
  alternateName?: string;
  abbreviation: string;
  Entrances?: any[];
  selectedEntrance: number;
}

interface ChildProps {
  triggerRerender: () => void;
  setStops: (stops: any) => void;
}

interface ItemProps {
  item: Item;
  addItem: (item: Item, selectedEntrance: number) => void;
  setSelectedItem: (input: string) => void;
  triggerRerender: () => void;
}

const ItemRenderer: React.FC<ItemProps> = ({
  item,
  addItem,
  triggerRerender,
  setSelectedItem,
}) => {
  const [selectedEntrance, setSelectedEntrance] = useState(1);

  function handleItemChange(entrance: number) {
    setSelectedEntrance(entrance);
    setSelectedItem(item.key);

    localStorage.setItem(
      "selectedPoint",
      JSON.stringify({ ...item, selectedEntrance: entrance }),
    );

    triggerRerender();
  }

  return (
    <div className="h-full w-full max-md:px-1">
      <div className="flex items-center justify-between">
        <span className="text-md max-w-9/10 font-semibold text-neutral-700 dark:text-neutral-200">
          {item.name}
        </span>
        <span className="text-xs text-[#a48100] dark:text-[#ffca09]">
          {item.abbreviation}
        </span>
      </div>
      <div className="my-[1vh] flex items-center justify-between">
        <div className="flex max-w-17/20 flex-wrap justify-start">
          <p className="mt-1 text-neutral-600 dark:text-neutral-300">
            Entrance:{" "}
          </p>
          <button
            className={`mt-1 ml-2 inline-block h-fit w-fit rounded-sm border-2 border-[#a48100] px-1 text-center dark:border-[#ffca09] ${selectedEntrance != 1 ? "bg-[#a48100] text-neutral-200 dark:bg-[#ffca09] dark:text-neutral-700" : "bg-[#ffca09]/60 text-neutral-600 dark:text-[#faefc8]"} cursor-pointer text-center text-sm font-bold hover:bg-[#ffca09]/60 hover:text-neutral-600 dark:hover:text-[#faefc8]`}
            onClick={() => handleItemChange(1)}
          >
            Main
          </button>
          {item.Entrances!.map((entrance, index) => {
            if (index == 0 || entrance.id == undefined) return <></>;

            return (
              <button
                className={`mt-1 ml-2 inline-block h-fit w-fit rounded-sm border-2 border-[#a48100] px-1 text-center dark:border-[#ffca09] ${selectedEntrance != index + 1 ? "bg-[#a48100] text-neutral-200 dark:bg-[#ffca09] dark:text-neutral-700" : "bg-[#ffca09]/60 text-neutral-600 dark:text-[#faefc8]"} cursor-pointer text-center text-sm font-bold hover:bg-[#ffca09]/60 hover:text-neutral-600 dark:hover:text-[#faefc8]`}
                onClick={() => handleItemChange(index + 1)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <div>
          <button
            className="inline-block h-fit w-fit cursor-pointer rounded-sm border-2 border-[#a48100] bg-[#a48100] px-2 text-center text-lg font-bold text-neutral-200 hover:bg-[#ffca09]/60 hover:text-neutral-600 active:bg-[#ffca09]/60 dark:border-[#ffca09] dark:bg-[#ffca09] dark:text-neutral-700 dark:hover:text-[#faefc8]"
            onClick={() => addItem(item, selectedEntrance)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const Search: React.FC<ChildProps> = ({ triggerRerender, setStops }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [_selectedItem, setSelectedItem] = useState("");

  // List of UCF buildings
  const itemsList = locations;

  var permissionStatusData = localStorage.getItem("permissionStatus");
  var permissionStatus: boolean;

  if (permissionStatusData == null || permissionStatusData == undefined)
    permissionStatus = false;
  else permissionStatus = JSON.parse(permissionStatusData);

  function addItem(item: Item, selectedEntrance: number) {
    localStorage.setItem(
      "selectedPoint",
      JSON.stringify({ ...item, selectedEntrance: selectedEntrance }),
    );

    var newItem = { ...item, selectedEntrance: selectedEntrance };

    setStops((prevStops: any[]) => [...(prevStops || []), newItem]);
  }

  function scrollTop() {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }

  function calcNearestPoint(): Item {
    var closestPoint: any = { id: -1, lat: -1, lon: -1 };

    var currentLocationData = localStorage.getItem("currentLocation");

    if (
      currentLocationData == undefined ||
      currentLocationData == null ||
      !navigator.geolocation
    )
      return closestPoint;

    var currentLocation = JSON.parse(currentLocationData);

    closestPoint = nearestPoint([currentLocation[0], currentLocation[1]]);

    var calculatedItem: Item = {
      key: "-1",
      name: "Current Location",
      alternateName: "",
      abbreviation: "N/A",
      Entrances: [closestPoint],
      selectedEntrance: 0,
    };
    setSelectedItem(closestPoint.id);

    return calculatedItem;
  }

  return (
    <div className="h-1/4 w-full">
      <div className="relative flex h-2/8 w-full items-center justify-center">
        <input
          className="relative h-full w-full rounded-t-md border-2 border-[#a48100] bg-white/70 p-1 pl-2 text-lg text-neutral-700 placeholder-neutral-700/75 shadow-lg focus:ring-1 focus:ring-[#ffca09]/70 focus:outline-none dark:border-[#ffca09] dark:bg-black/25 dark:text-neutral-200 dark:placeholder-neutral-200/75"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            scrollTop();
          }}
        ></input>
        <IoSearch className="absolute right-2" size={23} />
      </div>
      <div
        ref={scrollRef}
        className="max-h-14/16 min-h-14/16 overflow-x-hidden overflow-y-scroll rounded-b-sm border-x-2 border-b-2 border-[#a48100] bg-white/65 shadow-lg dark:border-[#ffca09] dark:bg-black/35"
      >
        <ul className="divide:[#d6d4d4] min-h-21/20 divide-y shadow dark:divide-[#ffca09]">
          {searchTerm.length == 0 &&
            navigator.geolocation &&
            permissionStatus != false && (
              <li className="cursor-pointer border-b px-[1vw] py-[1vh] font-bold hover:bg-neutral-100/15 dark:border-[#ffe68c]/50">
                <div className="flex items-center justify-between max-md:px-1">
                  <div className="flex items-center">
                    Current Location
                    <TiLocationArrow
                      className="text-[#1975c8] ml-2 dark:text-[#4899d0]"
                      size={26}
                    />
                  </div>
                  <button
                    className="inline-block h-fit w-fit cursor-pointer rounded-sm border-2 border-[#a48100] bg-[#a48100] px-2 text-center text-lg font-bold text-neutral-200 hover:bg-[#ffca09]/60 hover:text-neutral-600 active:bg-[#ffca09]/60 dark:border-[#ffca09] dark:bg-[#ffca09] dark:text-neutral-700 dark:hover:text-[#faefc8]"
                    onClick={() => addItem(calcNearestPoint(), 1)}
                  >
                    +
                  </button>
                </div>
              </li>
            )}
          {itemsList
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.alternateName?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item) => {
              return (
                <li
                  key={item.key}
                  className="cursor-pointer border-b px-[1vw] py-[1vh] hover:bg-neutral-100/15 dark:border-[#ffe68c]/50"
                >
                  <ItemRenderer
                    item={item}
                    addItem={addItem}
                    triggerRerender={triggerRerender}
                    setSelectedItem={setSelectedItem}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Search;
