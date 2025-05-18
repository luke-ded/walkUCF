import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
    Entrances: any [];
    selectedEntrance: number;
}

interface ChildProps {
    triggerRerender: () => void;
    setStops: (stops: any) => void;
    stops: any [];
}

interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}

const RouteList: React.FC<ChildProps> = ({ triggerRerender, setStops, stops }) =>
{
    // This is for highlighting on map later
    const [selectedItem, setSelectedItem] = useState("");
    console.log(selectedItem);

    const itemsList = stops;
    var graphData = JSON.parse(localStorage.getItem("graphData")!);

    const renderItem = (item: Item): React.ReactNode => 
    {
        return (
            <div className="flex-col w-full h-full max-md:px-1">
                <div className="flex justify-between items-center">
                        <div className="flex justify-start max-w-7/10 items-center">
                            <span className="dark:text-neutral-200 text-neutral-700 font-semibold text-md">{item.Name}</span>
                        </div>
                        <div>
                            <button className = "rounded-sm inline-block h-fit w-fit px-2 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:hover:text-[#faefc8] hover:text-neutral-600 text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                            onClick={() => removeStop(item)}>x</button>   
                        </div> 
                </div>
                <div className="flex justify-between mt-2 items-center">
                    <div className="flex justify-start">
                        <p className="dark:text-[#ffca09] text-[#a48100] text-sm">{item.Abbreviation}</p>
                        <p className="dark:text-neutral-200 text-neutral-700 text-sm">&nbsp;| Stop {itemsList.indexOf(item) + 1}
                            &nbsp;| {item.selectedEntrance == -1 ? "Closest Entrance" : item.selectedEntrance == 1 ? "Main Entrance" : "Door " + item.selectedEntrance}</p>
                    </div>
                    <div>
                        <button className = "mr-3 rounded-sm inline-block h-fit w-fit px-2 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:hover:text-[#faefc8] hover:text-neutral-600 text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                        onClick={() => swapDown(item)}>▼</button> 
                        <button className = "rounded-sm inline-block h-fit w-fit px-2 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:hover:text-[#faefc8] hover:text-neutral-600 text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                        onClick={() => swapUp(item)}>▲</button> 
                    </div>
                </div>
            </div>
        );
    };

    function removeStop(item: Item) 
    {
      const index = itemsList.indexOf(item);

      if (index < 0) {
        console.log("Item not found in removeStop.\n");
        return;
      }

      const newItemsList = [...itemsList.slice(0, index), ...itemsList.slice(index + 1)];

      if (newItemsList.length === 0) {
        localStorage.setItem("graphData", JSON.stringify({ distanceMi: 0, distanceKm: 0 }));
      }

      setStops(newItemsList);
    }

    function swap(index1 : any, index2 : any) 
    {
        var newItemsList = [...itemsList];
        var temp = newItemsList[index1];
        newItemsList[index1] = newItemsList[index2];
        newItemsList[index2] = temp;
        setStops(newItemsList);
    }

    function swapDown(item : Item)
    {
        var index = itemsList.indexOf(item);

        if(index < 0)
        {
            console.log("Item not found in swapDown.\n");
            return;  
        }

        if(itemsList.length - 1 == index)
            return;

        swap(index, index + 1);
    }

    function swapUp(item : Item)
    {
        var index = itemsList.indexOf(item);

        if(index < 0)
        {
            console.log("Item not found in swapUp.\n");
            return;  
        }

        if(0 == index)
            return;

        swap(index - 1, index);
    }

    function handleItemChange(item : Item)
    {
        setSelectedItem(item.key);

        localStorage.setItem("selectedPoint", JSON.stringify(item));
        triggerRerender();
    }

    function clearList()
    {
        const newItemsList: Item[] = [];

        localStorage.setItem("graphData", JSON.stringify({ distanceMi: 0, distanceKm: 0 }));
        
        setStops(newItemsList);
    }

    var props: PropsType = {
        items: itemsList,
        renderer: renderItem
    };

    var settings = JSON.parse(localStorage.getItem("settings")!);

    return(
        <div className="flex-col justify-start mt-5 max-lg:mt-7 h-12/16 max-lg:h-10/16 max-h-11/16 w-full border-2 dark:border-[#ffca09] border-[#a48100] dark:bg-black/40 bg-white/60 rounded-sm shadow-lg">
            <div className="flex items-center justify-between h-3/32 border-b-2 dark:border-[#ffca09] border-[#a48100]">
                <h1 className="ml-2 text-xl dark:text-neutral-200 text-neutral-700 font-bold">Route</h1>
                <div className="flex mr-2 w-fit bg-red-400 items-center justify-end dark:text-gray-300 text-gray-700 text-md">
                    <h1>{settings.walkSpeed != 0 && graphData.distanceMi != null && graphData != undefined && settings.walkSpeed != null? (graphData?.distanceMi.toFixed(2) / (settings.walkSpeed/60)).toFixed(1) : "0"} min&nbsp;</h1> 
                    <h1 className="dark:text-neutral-100 text-neutral-700 font-bold">|</h1>
                    <h1>&nbsp;{settings.units == "imperial" ? graphData?.distanceMi.toFixed(2) + " mi": graphData?.distanceKm.toFixed(2) + " km"}</h1> {/* Add error checking for this */}
                    <button className = "rounded-sm inline-block h-8/10 w-fit ml-3 mr-1 px-1 border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:bg-[#ffca09] bg-[#a48100] dark:hover:text-neutral-50 hover:text-neutral-600 text-center hover:bg-[#ffca09]/60 font-bold cursor-pointer"
                       onClick={() => clearList()}>Clear</button>
                </div>
            </div>
            <div className="overflow-y-auto h-29/32 w-full">
                <ul className="shadow divide-y dark:divide-[#ffe68c] min-h-0">
                    {props.items.map((item) => {
                    return <li key={uuidv4()} onClick={() => handleItemChange(item)} className="px-[1vw] py-[1vh] cursor-pointer border-b dark:border-[#ffe68c]/50 hover:bg-neutral-100/15">{props.renderer(item)}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default RouteList;