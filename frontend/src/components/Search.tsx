import { useState } from "react";
import locations from "./locations.json";

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
    Entrances?: any [];
    selectedEntrance: number;
}

interface ChildProps 
{
    triggerRerender: () => void;
    setStops: (stops: any) => void;
}

interface ItemProps 
{
  item: Item;
  addItem: (item: Item, selectedEntrance: number) => void;
  setSelectedItem: (input: string) => void;
  triggerRerender: () => void;
}

const ItemRenderer: React.FC<ItemProps> = ({ item, addItem, triggerRerender, setSelectedItem }) =>
{
    const [selectedEntrance, setSelectedEntrance] = useState(1);

    function handleItemChange(entrance: number)
    {
        setSelectedEntrance(entrance);
        setSelectedItem(item.key);

        localStorage.setItem("selectedPoint", JSON.stringify({...item, selectedEntrance: entrance}));

        triggerRerender();
    }

    return (
        <div className="w-full h-full max-md:px-1">
            <div className="flex justify-between items-center">
                <span className="dark:text-neutral-200 text-neutral-700 font-semibold text-md max-w-9/10">{item.Name}</span>
                <span className="dark:text-[#ffca09] text-[#a48100] text-xs">{item.Abbreviation}</span>
            </div>
            <div className="flex justify-between items-center my-[1vh]">
                <div className="flex flex-wrap justify-start max-w-17/20">
                    <p className="dark:text-neutral-300 text-neutral-600 mt-1">Entrance: </p>
                    {item.Entrances?.length! > 1 && (<button className = {`rounded-sm inline-block h-fit w-fit ml-2 mt-1 px-1 border-2 dark:border-[#ffca09] border-[#a48100] text-center ${selectedEntrance != -1 ? "dark:text-neutral-700 text-neutral-200 dark:bg-[#ffca09] bg-[#a48100]" : "dark:text-[#faefc8] text-neutral-600 bg-[#ffca09]/60"} dark:hover:text-[#faefc8] hover:text-neutral-600 text-sm text-center hover:bg-[#ffca09]/60 font-bold cursor-pointer`}
                    onClick={() => handleItemChange(-1)}>Closest</button>)}
                    <button className = {`rounded-sm inline-block h-fit w-fit ml-2 mt-1 px-1 border-2 dark:border-[#ffca09] border-[#a48100] text-center ${selectedEntrance != 1 ? "dark:text-neutral-700 text-neutral-200 dark:bg-[#ffca09] bg-[#a48100]" : "dark:text-[#faefc8] text-neutral-600 bg-[#ffca09]/60"} dark:hover:text-[#faefc8] hover:text-neutral-600 text-sm text-center hover:bg-[#ffca09]/60 font-bold cursor-pointer`}
                    onClick={() => handleItemChange(1)}>Main</button>
                    {item.Entrances!.map((entrance, index) => {
                        if(index == 0 || entrance.id == undefined)
                            return <></>;
                        
                        return <button className = {`rounded-sm inline-block h-fit w-fit ml-2 mt-1 px-1 border-2 dark:border-[#ffca09] border-[#a48100] text-center ${selectedEntrance != index + 1 ? "dark:text-neutral-700 text-neutral-200 dark:bg-[#ffca09] bg-[#a48100]" : "dark:text-[#faefc8] text-neutral-600 bg-[#ffca09]/60"} dark:hover:text-[#faefc8] hover:text-neutral-600 text-sm text-center hover:bg-[#ffca09]/60 font-bold cursor-pointer`}
                        onClick={() => handleItemChange(index + 1)}>{index + 1}</button>;
                    })}
                </div>
                <div>
                    <button className = "rounded-sm inline-block h-fit w-fit px-2 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:hover:text-[#faefc8] hover:text-neutral-600 text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                    onClick={() => addItem(item, selectedEntrance)}>+</button>
                </div>
            </div>
        </div>
    );
}

const Search: React.FC<ChildProps> = ({ triggerRerender, setStops }) =>
{
    function addItem(item: Item, selectedEntrance: number)
    {
        console.log("item in addItem: " + item.key);
        var newItem = { ...item, selectedEntrance: selectedEntrance };

        //setStops(locations);
        setStops((prevStops: any[]) => [...(prevStops || []), newItem]);
    }
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItem, setSelectedItem] = useState("");

    console.log(selectedItem);

    // List of UCF buildings
    const itemsList = locations;

    return (
        <div className="h-1/4 w-full">
            <div className="h-2/8 flex w-full justify-center items-center">
                <input className="w-full h-full text-lg dark:text-neutral-200 text-neutral-700 p-1 pl-2 border-2 dark:border-[#ffca09] border-[#a48100] dark:placeholder-neutral-200/75 placeholder-neutral-700/75 rounded-md dark:bg-black/25 bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70 shadow-lg" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            
            <div className="mt-5 overflow-y-auto min-h-11/16 max-h-11/16 border-2 dark:border-[#ffca09] border-[#a48100] rounded-sm dark:bg-black/35 bg-white/65 shadow-lg">
                <ul className="shadow divide-y dark:divide-[#ffca09] divide:[#d6d4d4] min-h-0">
                    {itemsList.filter((item) => (item.Name.toLowerCase().includes(searchTerm.toLowerCase())) || item.Abbreviation.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => {
                    return <li key={item.key} className="px-[1vw] py-[1vh] cursor-pointer border-b dark:border-[#ffe68c]/50 hover:bg-neutral-100/15">
                        <ItemRenderer item={item} addItem={addItem} triggerRerender={triggerRerender} setSelectedItem={setSelectedItem} />
                    </li>;
                })}
                </ul>
            </div>
        </div>
    );
}

export default Search;