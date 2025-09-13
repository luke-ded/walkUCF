import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaXmark } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";

interface Item {
  key: string;
  Name: string;
  Abbreviation: string;
  Entrances: any[];
  selectedEntrance: number;
}

interface ChildProps {
  triggerRerender: () => void;
  setStops: (stops: any) => void;
  stops: any[];
}

const RouteList: React.FC<ChildProps> = ({
  triggerRerender,
  setStops,
  stops,
}) => {
  const [_selectedItem, setSelectedItem] = useState("");

  const itemsList = stops;
  var graphData = JSON.parse(localStorage.getItem("graphData")!);

  const renderItem = (item: Item): React.ReactNode => {
    return (
      <div className="h-full w-full flex-col max-md:px-1">
        <div className="flex items-center justify-between">
          <div className="flex max-w-7/10 items-center justify-start">
            <span className="text-md font-semibold text-neutral-700 dark:text-neutral-200">
              {item.Name}
            </span>
            {item.Name == "Current Location" && (
              <TiLocationArrow
                size={26}
                className="text-md ml-2 font-semibold text-[#1975c8] dark:text-[#4899d0]"
              />
            )}
          </div>
          <div>
            <button
              className="inline-block h-fit w-fit cursor-pointer rounded-sm border-2 border-[#a48100] bg-[#a48100] p-1.5 text-center text-lg font-bold text-neutral-200 hover:bg-[#ffca09]/60 hover:text-neutral-600 active:bg-[#ffca09]/60 dark:border-[#ffca09] dark:bg-[#ffca09] dark:text-neutral-700 dark:hover:text-[#faefc8]"
              onClick={() => removeStop(item)}
            >
              <FaXmark />
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex justify-start">
            <p className="text-sm text-[#a48100] dark:text-[#ffca09]">
              {item.Abbreviation}
            </p>
            <p className="text-sm text-neutral-700 dark:text-neutral-200">
              &nbsp;| Stop {itemsList.indexOf(item) + 1}
            </p>
            {item.Name != "Current Location" && (
              <p className="text-sm text-neutral-700 dark:text-neutral-200">
                &nbsp;|{" "}
                {item.selectedEntrance == -1
                  ? "Closest Entrance"
                  : item.selectedEntrance == 1
                    ? "Main Entrance"
                    : "Door " + item.selectedEntrance}
              </p>
            )}
          </div>
          <div>
            <button
              className="mr-3 inline-block h-fit w-fit cursor-pointer rounded-sm border-2 border-[#a48100] bg-[#a48100] px-2 text-center text-lg font-bold text-neutral-200 hover:bg-[#ffca09]/60 hover:text-neutral-600 active:bg-[#ffca09]/60 dark:border-[#ffca09] dark:bg-[#ffca09] dark:text-neutral-700 dark:hover:text-[#faefc8]"
              onClick={() => swapDown(item)}
            >
              ▼
            </button>
            <button
              className="inline-block h-fit w-fit cursor-pointer rounded-sm border-2 border-[#a48100] bg-[#a48100] px-2 text-center text-lg font-bold text-neutral-200 hover:bg-[#ffca09]/60 hover:text-neutral-600 active:bg-[#ffca09]/60 dark:border-[#ffca09] dark:bg-[#ffca09] dark:text-neutral-700 dark:hover:text-[#faefc8]"
              onClick={() => swapUp(item)}
            >
              ▲
            </button>
          </div>
        </div>
      </div>
    );
  };

  function removeStop(item: Item) {
    const index = itemsList.indexOf(item);

    if (index < 0) {
      console.log("Item not found in removeStop.\n");
      return;
    }

    const newItemsList = [
      ...itemsList.slice(0, index),
      ...itemsList.slice(index + 1),
    ];

    if (newItemsList.length === 0) {
      localStorage.setItem(
        "graphData",
        JSON.stringify({ distanceMi: 0, distanceKm: 0 }),
      );
    }

    setStops(newItemsList);
  }

  function swap(index1: any, index2: any) {
    var newItemsList = [...itemsList];
    var temp = newItemsList[index1];

    newItemsList[index1] = newItemsList[index2];
    newItemsList[index2] = temp;

    setStops(newItemsList);
  }

  function swapDown(item: Item) {
    var index = itemsList.indexOf(item);

    if (index < 0) {
      console.log("Item not found in swapDown.\n");
      return;
    }

    if (itemsList.length - 1 == index) return;

    swap(index, index + 1);
  }

  function swapUp(item: Item) {
    var index = itemsList.indexOf(item);

    if (index < 0) {
      console.log("Item not found in swapUp.\n");
      return;
    }

    if (0 == index) return;

    swap(index - 1, index);
  }

  function handleItemChange(item: Item) {
    setSelectedItem(item.key);

    localStorage.setItem("selectedPoint", JSON.stringify(item));

    triggerRerender();
  }

  function clearList() {
    const newItemsList: Item[] = [];

    localStorage.setItem(
      "graphData",
      JSON.stringify({ distanceMi: 0, distanceKm: 0 }),
    );

    setStops(newItemsList);
  }

  var settings = JSON.parse(localStorage.getItem("settings")!);

  return (
    <div className="mt-5 h-12/16 max-h-11/16 w-full flex-col justify-start rounded-sm border-2 border-[#a48100] bg-white/60 shadow-lg max-lg:mt-7 max-lg:h-10/16 dark:border-[#ffca09] dark:bg-black/40">
      <div className="flex h-3/32 items-center justify-between border-b-2 border-[#a48100] dark:border-[#ffca09]">
        <h1 className="ml-2 text-xl font-bold text-neutral-700 dark:text-neutral-200">
          Route
        </h1>
        <div className="text-md mr-2 flex w-fit items-center justify-end text-gray-700 dark:text-gray-300">
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
          <h1 className="font-bold text-neutral-700 dark:text-neutral-100">
            |
          </h1>
          <h1>
            &nbsp;
            {settings.units == "imperial"
              ? graphData?.distanceMi.toFixed(2) + " mi"
              : graphData?.distanceKm.toFixed(2) + " km"}
          </h1>
          <button
            className="mr-1 ml-3 inline-block h-8/10 w-fit cursor-pointer rounded-sm border-2 border-[#a48100] bg-[#a48100] px-1 text-center font-bold text-neutral-200 hover:bg-[#ffca09]/60 hover:text-neutral-600 active:bg-[#ffca09]/60 dark:border-[#ffca09] dark:bg-[#ffca09] dark:text-neutral-700 dark:hover:text-neutral-50"
            onClick={() => clearList()}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="h-29/32 w-full overflow-y-auto">
        <ul className="min-h-0 divide-y shadow dark:divide-[#ffe68c]">
          {itemsList.map((item) => {
            return (
              <li
                key={uuidv4()}
                onClick={() => handleItemChange(item)}
                className="cursor-pointer border-b px-[1vw] py-[1vh] hover:bg-neutral-100/15 dark:border-[#ffe68c]/50"
              >
                {renderItem(item)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RouteList;
