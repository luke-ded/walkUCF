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

    const triggerRerender = () => 
    {
        setCount(count + 1);
    };

    return(
        <div className="flex-col h-screen w-screen items-center justify-center dark:text-neutral-200 text-neutral-700 cursor-default select-none">
            <NavBar toggleAbout={toggleAbout} about={about} toggleSettings={toggleSettings} settings={settings}/>
            <div className="flex w-screen h-13/14 items-center justify-center bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex flex-col items-center justify-between w-2/5 h-4/5 max-h-4/5 mr-20">
                    <Search triggerRerender={triggerRerender} />
                    <RouteList triggerRerender={triggerRerender} />
                </div>
                <div className="flex flex-col justify-between w-2/5 h-4/5 border-2 dark:border-[#ffca09] border-[#a48100] rounded-md shadow-lg">
                    <Map />
                </div>
                {about && (<About />)}
                {settings && (<Settings triggerRerender={triggerRerender} toggleSettings={toggleSettings} settings={settings}/>)}
            </div>
        </div>
    );
}

export default HomePage;