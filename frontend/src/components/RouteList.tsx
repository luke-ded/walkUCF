import { useState } from "react";

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
    lat: any;
    long: any;
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
                        <p className="dark:text-neutral-200 text-neutral-700 text-sm">&nbsp;| Stop {itemsList.indexOf(item) + 1}</p>
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

        localStorage.setItem("selectedPoint", JSON.stringify(item));
        triggerRerender();
    }

    var props: PropsType = {
        items: itemsList,
        renderer: renderItem
    };

    return(
        <div className="flex-col justify-start mt-5 h-11/16 max-h-11/16 w-full border-2 dark:border-[#ffca09] border-[#a48100] dark:bg-black/40 bg-white/60 rounded-sm shadow-lg">
            <div className="flex items-center justify-between h-3/32 border-b-2 dark:border-[#ffca09] border-[#a48100]">
                <h1 className="ml-2 text-xl dark:text-neutral-200 text-neutral-700 font-bold">Route</h1>
                <div className="flex mr-2 dark:text-gray-300 text-gray-700 text-md">
                    <h1>15 min&nbsp;</h1> 
                    <h1 className="dark:text-neutral-200 text-neutral-700 font-bold">|</h1>
                    <h1>&nbsp;1.2 mi</h1>
                </div>
            </div>
            <div className="overflow-y-auto h-29/32 w-full">
                <ul className="shadow divide-y dark:divide-[#ffe68c] min-h-0">
                    {props.items.map((item) => {
                    return <li onClick={() => handleItemChange(item)} className="px-[1vw] py-[1vh] cursor-pointer border-b dark:border-[#ffe68c]/50 hover:bg-neutral-100/15">{props.renderer(item)}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default RouteList;