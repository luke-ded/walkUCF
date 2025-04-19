import NavBar from "./components/NavBar";
import Map from "./components/Map.tsx";
import Search from "./components/Search.tsx";
import RouteList from "./components/RouteList.tsx";

function HomePage()
{
    return(
        <div className="flex-col h-screen w-screen items-center justify-center">
            <NavBar />
            <div className="flex w-screen h-13/14 items-center justify-center bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex flex-col items-center justify-start w-2/5 h-4/5 mr-20">
                    <Search />
                    <RouteList />
                </div>
                <div className="w-2/5 h-4/5 border-2 border-[#ffca09] rounded-md shadow-lg">
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default HomePage;