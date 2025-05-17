import NavBar from "./components/NavBar";
import Map from "./components/Map.tsx";
import Search from "./components/Search.tsx";
import About from "./components/About.tsx";
import Settings from "./components/Settings.tsx";
import RouteList from "./components/RouteList.tsx";
import { useState } from "react";

function HomePage()
{
    const [count, setCount] = useState(0);
    const [about, toggleAbout] = useState(false);
    const [settings, toggleSettings] = useState(false);
    const [stops, setStops] = useState<any []>([]);

    console.log("homepage render");
    console.log(stops);

    var settingsData = localStorage.getItem("settings");
    if(settingsData == null || settingsData == undefined)
    {
        localStorage.setItem("settings", JSON.stringify({"units": "imperial", "walkSpeed": 3, "saveRoute": true}));
    }

    var distanceData = localStorage.getItem("graphData");
    if(distanceData == null || distanceData == undefined)
    {
        localStorage.setItem("graphData", JSON.stringify({distanceMi: 0, distanceKm : 0}));
    }
    

    const triggerRerender = () => 
    {
        setCount(count + 1);
    };

    return(
        <div className="flex-col h-screen w-screen items-center justify-center dark:text-neutral-200 text-neutral-700 cursor-default select-none overflow-x-hidden">
            <NavBar toggleAbout={toggleAbout} about={about} toggleSettings={toggleSettings} settings={settings}/>
            <div className="flex max-lg:flex-col w-screen h-13/14 max-lg:h-14/8 items-center lg:justify-center bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex flex-col items-center lg:justify-between w-2/5 h-4/5 max-lg:h-5/8 max-lg:w-9/10 max-h-4/5 max-lg:mt-5 lg:mr-20 max-lg:order-2 lg:order-1">
                    <Search triggerRerender={triggerRerender} setStops={setStops} />
                    <RouteList triggerRerender={triggerRerender} setStops={setStops} stops={stops!}/>
                </div>
                <div className="flex flex-col justify-between w-2/5 h-4/5 max-lg:w-9/10 max-lg:min-h-3/8 max-lg:mt-5 border-2 dark:border-[#ffca09] border-[#a48100] rounded-md shadow-lg max-lg:order-1 lg:order-2">
                    <Map stops={stops!} triggerRerender={triggerRerender}/>
                </div>
                {about && (<About />)}
                {settings && (<Settings triggerRerender={triggerRerender} toggleSettings={toggleSettings} settings={settings}/>)}
            </div>
        </div>
    );
}

export default HomePage;