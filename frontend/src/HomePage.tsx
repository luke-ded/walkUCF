import NavBar from "./components/NavBar";
import Map from "./components/Map.tsx";
import Search from "./components/Search.tsx";
import RouteList from "./components/RouteList.tsx";
import { useState } from "react";

function HomePage()
{
    const [count, setCount] = useState(0);

    const triggerRerender = () => 
    {
        setCount(count + 1);
    };

    return(
        <div className="flex-col h-screen w-screen items-center justify-center">
            <NavBar />
            <div className="flex w-screen h-13/14 items-center justify-center bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex flex-col items-center justify-start w-2/5 h-4/5 mr-20">
                    <Search triggerRerender={triggerRerender} />
                    <RouteList triggerRerender={triggerRerender} />
                </div>
                <div className="flex flex-col justify-between w-2/5 h-4/5 border-2 border-[#ffca09] rounded-md shadow-lg">
                    <div className="w-full h-38/40 self-start border-b-2 border-[#ffca09] rounded-md">
                        <Map />
                    </div>
                    <div className="flex w-full h-2/40 bg-black/25 justify-center items-center">
                        <input type="checkbox" value="" className="w-5 h-5 bg-neutral-100 border-neutral-300 rounded-lg" />
                        <h1 className="ml-1 test-neutral-200">Cutting through buildings</h1>
                        <input type="checkbox" value="" className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
                        <h1 className="ml-1 test-neutral-200">Jaywalking</h1>
                        <input type="checkbox" value="" className="w-5 h-5 ml-4 bg-neutral-100 border-neutral-300 rounded-lg" />
                        <h1 className="ml-1 test-neutral-200">Cutting across grass</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;