import { useState } from "react";

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
}

interface ChildProps {
    triggerRerender: () => void;
}

interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}

const RouteList: React.FC<ChildProps> = ({ triggerRerender }) =>
{
    // This is for highlighting on map later
    const [selectedItem, setSelectedItem] = useState("");
    console.log(selectedItem);

    const itemsList = getStops();
    
    const renderItem = (item: Item): React.ReactNode => 
    {
        return (
            <div className="flex-col">
                <div className="flex justify-between items-center">
                        <div className="flex justify-start max-w-7/10 items-center">
                            <span className="text-neutral-200 font-semibold text-md">{item.Name}</span>
                        </div>
                        <div>
                            <button className = "rounded-sm inline-block h-fit w-fit px-2 bg-[#ffca09] border-2 border-[#ffca09] text-center text-neutral-700 hover:text-[#faefc8] text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                            onClick={() => removeStop(item)}>x</button>   
                        </div> 
                </div>
                <div className="flex justify-between mt-2 items-center">
                    <div className="flex justify-start">
                        <p className="text-[#ffca09] text-sm">{item.Abbreviation}</p>
                        <p className="text-neutral-200 text-sm">&nbsp;| Stop {itemsList.indexOf(item) + 1}</p>
                    </div>
                    <div>
                        <button className = "mr-3 rounded-sm inline-block h-fit w-fit px-2 bg-[#ffca09] border-2 border-[#ffca09] text-center text-neutral-700 hover:text-[#faefc8] text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                        onClick={() => swapDown(item)}>▼</button> 
                        <button className = "rounded-sm inline-block h-fit w-fit px-2 bg-[#ffca09] border-2 border-[#ffca09] text-center text-neutral-700 hover:text-[#faefc8] text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                        onClick={() => swapUp(item)}>▲</button> 
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

    function removeStop(item : Item)
    {
        var index = itemsList.indexOf(item);

        if(index < 0)
        {
            console.log("Item not found in removeStop.\n");
            return;
        }

        itemsList.splice(index, 1);

        localStorage.setItem('stoplist', JSON.stringify(itemsList));

        // This will rerender the map
        triggerRerender();
    }

    function swap(index1 : any, index2 : any) 
    {
        var temp = itemsList[index1];
        itemsList[index1] = itemsList[index2];
        itemsList[index2] = temp;
    }

    function swapDown(item : Item)
    {
        var index = itemsList.indexOf(item);

        if(index < 0)
        {
            console.log("Item not found in swapDown.\n");
            return;  
        }

        if(itemsList.length - 1 == itemsList.indexOf(item))
            return;

        swap(index, index + 1);

        localStorage.setItem('stoplist', JSON.stringify(itemsList));

        // This will rerender the map
        triggerRerender();
    }

    function swapUp(item : Item)
    {
        var index = itemsList.indexOf(item);

        if(index < 0)
        {
            console.log("Item not found in swapUp.\n");
            return;  
        }

        if(0 == itemsList.indexOf(item))
            return;

        swap(index - 1, index);

        localStorage.setItem('stoplist', JSON.stringify(itemsList));

        // This will rerender the map
        triggerRerender();
    }

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