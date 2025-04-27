import NavBar from "./components/NavBar";
import Map from "./components/Map.tsx";
import Search from "./components/Search.tsx";
import About from "./components/About.tsx";
import RouteList from "./components/RouteList.tsx";
import { useState } from "react";

function HomePage()
{
    const [count, setCount] = useState(0);
    const [about, toggleAbout] = useState(false);

    const triggerRerender = () => 
    {
        setCount(count + 1);
    };

    return(
        <div className="flex-col h-screen w-screen items-center justify-center dark:text-neutral-200 text-neutral-700">
            <NavBar toggleAbout={toggleAbout} about={about} />
            <div className="flex w-screen h-13/14 items-center justify-center bg-gradient-to-b dark:from-black/60 from-[#d6d4d4]/60 to-transparent">
                <div className="flex flex-col items-center justify-start w-2/5 h-4/5 mr-20">
                    <Search triggerRerender={triggerRerender} />
                    <RouteList triggerRerender={triggerRerender} />
                </div>
                <div className="flex flex-col justify-between w-2/5 h-4/5 border-2 dark:border-[#ffca09] border-[#a48100] rounded-md shadow-lg">
                    <div className="w-full h-38/40 self-start border-b-2 dark:border-[#ffca09] border-[#a48100]">
                        <Map />
                    </div>
                    <div className="flex w-full h-2/40 dark:bg-black/50 bg-[#d6d4d4]/50 font-bold justify-center items-center">
                        <input type="checkbox" value="" className="w-5 h-5 bg-neutral-100 border-neutral-300 rounded-lg" checked/>
                        <h1 className="ml-1">Through buildings</h1>
                        <input type="checkbox" value="" className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
                        <h1 className="ml-1">Jaywalking</h1>
                        <input type="checkbox" value="" className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
                        <h1 className="ml-1">Across grass</h1>
                    </div>
                </div>
                {about && (<About />)}
            </div>
        </div>
    );
}

export default HomePage;