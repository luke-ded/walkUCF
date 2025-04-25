import { useState } from "react";

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
}

interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}

const renderItem = (item: Item): React.ReactNode => 
{
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center">
                        <span className="text-neutral-200 font-semibold text-md">{item.Name} &nbsp;|&nbsp;</span>
                        <p className="text-[#ffca09] text-sm">{item.Abbreviation}</p>
                    </div>
                </div>

                <div className="flex justify-between w-9/40">
                    <button className = "rounded-sm inline-block h-fit w-fit px-2 bg-[#ffca09] border-2 border-[#ffca09] text-center text-neutral-700 hover:text-[#faefc8] text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer">▼</button> 
                    <button className = "rounded-sm inline-block h-fit w-fit px-2 bg-[#ffca09] border-2 border-[#ffca09] text-center text-neutral-700 hover:text-[#faefc8] text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer">▲</button> 
                    <button className = "rounded-sm inline-block h-fit w-fit px-2 bg-[#ffca09] border-2 border-[#ffca09] text-center text-neutral-700 hover:text-[#faefc8] text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer">+</button>   
                </div>
            </div>
        </div>
    );
};

function getStops()
{
    var temp = localStorage.getItem('stoplist');
    var stoplist : Item [] = [];

    if(temp != undefined && temp != null)
    {
        stoplist = JSON.parse(temp);
    }

    return stoplist;      
}

function RouteList()
{
    const [selectedItem, setSelectedItem] = useState("");

    const itemsList = getStops();

    console.log(selectedItem);
    function handleItemChange(item : Item)
    {
        setSelectedItem(item.key);
    }

    var props: PropsType = {
        items: itemsList,
        renderer: renderItem
    };

    return(
        <div className="mt-5 h-1/2 w-full shadow-lg">
            <h1 className="text-xl h-2/16 text-neutral-200 font-bold">Route</h1>
            <div className="overflow-y-scroll h-14/16 w-full border-2 border-[#ffca09] rounded-sm bg-black/25">
                <ul className="shadow divide-y divide-[#ffe68c] min-h-0">
                    {props.items.map((item) => {
                    return <li onClick={() => handleItemChange(item)} className="px-[1vw] py-[1vh] cursor-pointer border-b border-[#ffe68c]/50 hover:bg-neutral-100/15">{props.renderer(item)}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default RouteList;