import { MdInfoOutline } from "react-icons/md";
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

    const [units, setUnits] = useState(settings.units);
    const [walkSpeed, setWalkSpeed] = useState(settings.walkSpeed);
    const [newWalkSpeed, setNewWalkSpeed] = useState("3.0");
    const [saveRoute, setSaveRoute] = useState(settings.saveRoute);

    function setWalkSpeedHandler(inputWalkSpeed: string)
    {
        setNewWalkSpeed(inputWalkSpeed);

        if(!isNaN(Number(newWalkSpeed)))
            setWalkSpeed(Number(newWalkSpeed));
    }

    function save()
    {
        localStorage.setItem("settings", JSON.stringify({"units": units, "walkSpeed": walkSpeed, "saveRoute": saveRoute}));
        triggerRerender();
        toggleSettings(false);
    }  

    function cancel()
    {
        toggleSettings(false);
    }

    return (
        <div className="absolute z-10 bg-[url(./assets/backgroundmap2.jpg)] border-2 dark:border-[#ffca09] border-[#a48100] rounded-md w-3/10 h-5/10 shadow-lg">
            <div className="flex-col justify-center w-full h-full dark:bg-black/80 bg-[#d6d4d4]/80 rounded-sm">
                <div className="flex justify-center items-center h-1/8 border-b-2 dark:border-[#ffca09] border-[#a48100]">
                    <h1 className="text-2xl dark:text-neutral-200 text-neutral-700 font-bold">Settings</h1>
                </div>
                <div className="flex-col justify-start h-6/8 dark:text-neutral-200 text-neutral-700 p-5">
                    <div className="flex items-center w-full">
                        <h1 className="text-xl mr-2">Units:</h1>
                        <div className="flex cursor-pointer h-10 w-40 bg-black/40 border-2 border-[#ffe68c] rounded-xl">
                            <div className="flex justify-center items-center w-5/10 h-full border-r-2 border-[#ffe68c] rounded-l-lg"
                            onClick={() => setUnits("imperial")} style={{backgroundColor: units == "imperial" ? "#ffe68c66" : "transparent"}}>
                                <h1>Imperial</h1>
                            </div>
                            <div className="flex justify-center items-center w-5/10 h-full rounded-r-lg"
                            onClick={() => setUnits("metric")} style={{backgroundColor: units == "metric" ? "#ffe68c66" : "transparent"}}>
                                <h1>Metric</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full mt-5">
                        <h1 className="text-xl mr-2">Walking Speed:</h1>
                        <input className="w-1/10 h-full text-lg dark:text-neutral-200 text-neutral-700 p-1 border-2 dark:border-[#ffe68c] border-[#a48100] dark:placeholder-neutral-200/75 placeholder-neutral-700/75 placeholder:text-center text-center rounded-md dark:bg-black/25 bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70 shadow-lg" placeholder="3.0" 
                        value={newWalkSpeed} onChange={(e) => setWalkSpeedHandler(e.target.value)}></input>
                        <h1 className="text-lg ml-2">mi/hr</h1>
                        <MdInfoOutline size={20} className="ml-2 text-[#ffca09] cursor-pointer hover:text-[#ffe68c]"/>
                    </div>
                    <div className="flex items-center w-full mt-5">
                        <h1 className="text-xl mr-2">Save Route:</h1>
                        <div className="flex cursor-pointer h-10 w-40 bg-black/40 border-2 border-[#ffe68c] rounded-xl">
                            <div className="flex justify-center items-center w-5/10 h-full border-r-2 border-[#ffe68c] rounded-l-lg"
                                onClick={() => setSaveRoute(true)} style={{backgroundColor: saveRoute ? "#ffe68c66" : "transparent"}}>
                                <h1>Yes</h1>
                            </div>
                            <div className="flex justify-center items-center w-5/10 h-full rounded-r-lg"
                                onClick={() => setSaveRoute(false)} style={{backgroundColor: !saveRoute ? "#ffe68c66" : "transparent"}}>
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