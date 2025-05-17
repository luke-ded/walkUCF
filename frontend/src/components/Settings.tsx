import { MdInfoOutline } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

interface ChildProps 
{
    triggerRerender: () => void;
    toggleSettings: (settings:any) => void;
    settings: any;
}

const Settings: React.FC<ChildProps> = ({triggerRerender, toggleSettings, settings}) =>
{
    var settingsData = localStorage.getItem("settings");
    if(settingsData == null || settingsData == undefined)
    {
        var settings: any = {"units": "imperial", "walkSpeed": 3, "saveRoute": true};
        localStorage.setItem("settings", JSON.stringify(settings));
    }
    else
        var settings = JSON.parse(settingsData);

    if(settings.units == "imperial") 
        var startUnits = String(settings.walkSpeed.toFixed(1));
    else
        var startUnits = String((settings.walkSpeed / .621371).toFixed(1));

    const [units, setUnits] = useState(settings.units);
    const [walkSpeed, setWalkSpeed] = useState(settings.walkSpeed);
    const [newWalkSpeed, setNewWalkSpeed] = useState(startUnits);
    const [saveRoute, setSaveRoute] = useState(settings.saveRoute);
    const [info, setInfo] = useState(false);

    function setWalkSpeedHandler(inputWalkSpeed: string)
    {
        setNewWalkSpeed(inputWalkSpeed);

        if(!isNaN(Number(newWalkSpeed)))
        {
            if(units == "imperial")
                setWalkSpeed(Number(newWalkSpeed));
            else
                setWalkSpeed(Number(newWalkSpeed) * 0.621371);
        }
    }

    function setUnitsHandler(val: string)
    {  
        if(!isNaN(Number(newWalkSpeed)))
        {
            if(val == "imperial")
            {
                setWalkSpeedHandler(String((Number(newWalkSpeed) * .621371).toFixed(1)));
            }
            else
            {
                setWalkSpeedHandler(String((Number(newWalkSpeed) / .621371).toFixed(1)));
            }
        }

        setUnits(val);
    }

    function save()
    {
        if(walkSpeed <= 0)
            setWalkSpeed(3);

        localStorage.setItem("settings", JSON.stringify({"units": units, "walkSpeed": walkSpeed, "saveRoute": saveRoute}));
        triggerRerender();
        toggleSettings(false);
    }  

    function cancel()
    {
        toggleSettings(false);
    }

    return (
        <div className="absolute z-12 bg-[url(./assets/backgroundmap2.jpg)] border-2 dark:border-[#ffca09] border-[#a48100] rounded-md w-3/10 h-5/10 shadow-lg">
            <div className="flex-col justify-center w-full h-full dark:bg-black/80 bg-[#d6d4d4]/80 rounded-sm">
                <div className="flex justify-center items-center h-1/8 border-b-2 dark:border-[#ffca09] border-[#a48100]">
                    <h1 className="text-2xl dark:text-neutral-200 text-neutral-700 font-bold">Settings</h1>
                </div>
                <div className="flex-col justify-start h-6/8 dark:text-neutral-200 text-neutral-700 p-5">
                    <div className="flex items-center w-full">
                        <h1 className="text-xl mr-2">Units:</h1>
                        <div className="flex cursor-pointer h-10 w-38 bg-black/40 border-2 border-[#ffe68c] rounded-xl">
                            <div className={`flex justify-center items-center w-5/10 h-full border-r-2 border-[#ffe68c] rounded-l-lg ${units == "imperial" ? "bg-[#ffe68c]/35" : "bg-transparent"}`}
                            onClick={() => setUnitsHandler("imperial")}>
                                <h1>Imperial</h1>
                            </div>
                            <div className={`flex justify-center items-center w-5/10 h-full rounded-r-lg ${units == "metric" ? "bg-[#ffe68c]/35" : "bg-transparent"}`}
                            onClick={() => setUnitsHandler("metric")}>
                                <h1>Metric</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full mt-5">
                        <h1 className="text-xl mr-2">Walking Speed:</h1>
                        <input className="w-1/10 h-full w-3/20 text-lg dark:text-neutral-200 text-neutral-700 p-1 border-2 dark:border-[#ffe68c] border-[#a48100] dark:placeholder-neutral-200/75 placeholder-neutral-700/75 placeholder:text-center text-center rounded-md dark:bg-black/25 bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70 shadow-lg" placeholder="3.0" 
                        value={newWalkSpeed} onChange={(e) => setWalkSpeedHandler(e.target.value)} onBlur={(e) => setWalkSpeedHandler(e.target.value)}></input>
                        <h1 className="text-lg ml-2">{units == "imperial" ? "mi/hr" : "km/hr"}</h1>
                        <div className="relative inline-block">
                            <MdInfoOutline size={20} onClick={() => setInfo(!info)} className="ml-2 text-[#ffca09] cursor-pointer hover:text-[#ffe68c]"/>
                            {info && (
                                <div className="flex absolute z-14 w-80 left-5 border-2 dark:border-[#ffca09] border-[#a48100] rounded-lg shardow-lg p-1 bg-black">
                                    <h1 className="dark:text-neutral-200 text-center text-neutral-700 text-sm ml-2">If you wear a smartwatch, check your health app for the most accurate mesure of this metric. 
                                    Otherwise, calculate it yourself or leave the default setting of {units == "imperial" ? "3.0 mi/hr" : "4.8 km/hr"}</h1>
                                    <div className="flex">
                                        <IoCloseSharp size={15} onClick={() => setInfo(false)} className="hover:text-white bg-[#ffe68c]/30 hover:bg-[#ffe68c]/42 rounded-lg"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center w-full mt-5">
                        <h1 className="text-xl mr-2">Save Route:</h1>
                        <div className="flex cursor-pointer h-10 w-38 bg-black/40 border-2 border-[#ffe68c] rounded-xl">
                            <div className={`flex justify-center items-center w-5/10 h-full border-r-2 border-[#ffe68c] rounded-l-lg ${saveRoute ? "bg-[#ffe68c]/35" : "bg-transparent"}`}
                                onClick={() => setSaveRoute(true)} >
                                <h1>Yes</h1>
                            </div>
                            <div className={`flex justify-center items-center w-5/10 h-full rounded-r-lg ${!saveRoute ? "bg-[#ffe68c]/35" : "bg-transparent"}`}
                                onClick={() => setSaveRoute(false)}>
                                <h1>No</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full h-1/8 justify-center justify-self-end">
                    <button className="cursor-pointer h-10 hover:bg-[#ffe68c]/20 bg-black/40 px-2 py-1.5 border-2 border-[#ffe68c] rounded-xl mr-3"
                    onClick={save}>Save</button>
                    <button className="cursor-pointer h-10 hover:bg-[#ffe68c]/20 bg-black/40 px-2 py-1.5 border-2 border-[#ffe68c] rounded-xl"
                    onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;