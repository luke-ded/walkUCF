import { useState } from "react";
import locations from "./locations.json";

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
    Entrances?: any [];
}

interface ChildProps {
    triggerRerender: () => void;
}

interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}


const SearchBar: React.FC<ChildProps> = ({ triggerRerender }) =>
{
    function addItem(item: Item)
    {
        var temp = localStorage.getItem('stoplist');
        var stoplist : Item [] = [];

        if(temp != undefined && temp != null)
        {
            stoplist = JSON.parse(temp);
        }

        stoplist.push(item);

        //localStorage.setItem('stoplist', JSON.stringify(locations));
        localStorage.setItem('stoplist', JSON.stringify(stoplist));
        
        triggerRerender();
    }

    const renderItem = (item: Item): React.ReactNode => 
    {
        return (
            <div>
                <div className="flex justify-between items-center">
                    <span className="dark:text-neutral-200 text-neutral-700 font-semibold text-md max-w-9/10">{item.Name}</span>
                    <span className="dark:text-[#ffca09] text-[#a48100] text-xs">{item.Abbreviation}</span>
                </div>
            
                <div className="flex justify-between items-center my-[1vh]">
                    <div className="flex justify-start">
                        <p className="dark:text-neutral-300 text-neutral-600">Entrance: </p>
                        <button className = "rounded-sm inline-block h-fit w-fit ml-2 px-1 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:hover:text-[#faefc8] hover:text-neutral-600 text-sm text-center font-bold hover:bg-[#ffca09]/60 cursor-pointer">Closest</button>
                        <button className = "rounded-sm inline-block h-fit w-fit ml-2 px-1 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:hover:text-[#faefc8] hover:text-neutral-600 text-sm text-center font-bold hover:bg-[#ffca09]/60 cursor-pointer">Main</button>
                        {item.Entrances!.map((entrance, index) => {
                            if(index == 0)
                                return <></>;

                            return <button className = "rounded-sm inline-block h-fit w-fit ml-2 px-1 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:hover:text-[#faefc8] hover:text-neutral-600 text-sm text-center font-bold hover:bg-[#ffca09]/60 cursor-pointer">{index + 1}</button>;
                        })}
                    </div>
                    <div>
                        <button className = "rounded-sm inline-block h-fit w-fit px-2 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 dark:hover:text-[#faefc8] hover:text-neutral-600 text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                        onClick={() => addItem(item)}>+</button>
                    </div>
                </div>
            </div>
        );
    };

    const [selectedItem, setSelectedItem] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    console.log(selectedItem);
    function handleItemChange(item : Item)
    {
      setSelectedItem(item.key);
    
      localStorage.setItem("selectedPoint", JSON.stringify(item));
      triggerRerender();
    }

    // Temporary? List of UCF buildings
    const itemsList = locations;

    var props: PropsType = {
        items: itemsList,
        renderer: renderItem
    };

    return (
        <div className="h-1/4 w-full">
            <div className="h-2/8 flex w-full justify-center items-center">
                <input className="w-full h-full text-lg dark:text-neutral-200 text-neutral-700 p-1 pl-2 border-2 dark:border-[#ffca09] border-[#a48100] dark:placeholder-neutral-200/75 placeholder-neutral-700/75 rounded-md dark:bg-black/25 bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70 shadow-lg" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            
            <div className="mt-5 overflow-y-auto h-11/16 border-2 dark:border-[#ffca09] border-[#a48100] rounded-sm dark:bg-black/35 bg-white/65 shadow-lg">
                <ul className="shadow divide-y dark:divide-[#ffca09] divide:[#d6d4d4] min-h-0">
                    {props.items.filter((item) => (item.Name.toLowerCase().includes(searchTerm.toLowerCase())) || item.Abbreviation.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => {
                    return <li onClick={() => handleItemChange(item)} className="px-[1vw] py-[1vh] cursor-pointer border-b dark:border-[#ffe68c]/50 hover:bg-neutral-100/15">{props.renderer(item)}</li>;
                })}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;