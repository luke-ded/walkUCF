import SearchGlass from "../assets/searchglass.png";
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
                <span className="text-neutral-700 font-semibold text-md">{item.Name}</span>
                <span className="text-[#ffca09] text-xs">{item.Abbreviation}</span>
            </div>
            <p className="self-start text-neutral-700">{item.Name}</p>
        </div>
    );
};

function SearchBar()
{
    const [selectedItem, setSelectedItem] = useState("-1");
    console.log(selectedItem);
    function handleItemChange(item : Item)
    {
        setSelectedItem(item.key);
    }
    const itemsList = [{key: "1", Name: "Mathmatical Sciences Building", Abbreviation: "MSB"},
        {key: "2", Name: "Student Union", Abbreviation: "SU"}, {key: "3", Name: "Classroom Building One", Abbreviation: "CB1"},
        {key: "4", Name: "Classroom Building Two", Abbreviation: "CB2"}
    ];

    var props: PropsType = {
        items: itemsList,
        renderer: renderItem
    };

    return (
        <div className="h-1/2 w-full bg-red-400/50">
            <div className="h-1/8 flex w-full justify-center items-center">
                <input className="w-9/10 h-full text-lg text-neutral-700 p-1 border-2 border-neutral-600 placeholder-neutral-500 rounded-md bg-white/45 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70" placeholder="Search"></input>
                <img className="w-auto h-full ml-[2.5%] p-1 border-2 border-neutral-600 hover:border-neutral-700 rounded-md bg-white/25 hover:bg-white/45 hover:ring-1 hover:ring-[#ffca09]/70" src={SearchGlass}></img>
            </div>
            
            <div className="mt-5 overflow-y-scroll h-13/16 border-1 border-[#ffca09] rounded-sm bg-white/25">
                <ul className="shadow divide-y divide-neutral-600 min-h-0">
                {props.items.map((item) => {
                    return <li onClick={() => handleItemChange(item)} className="px-[1vw] py-[1vh] cursor-pointer border-b border-neutral-600">{props.renderer(item)}</li>;
                })}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;