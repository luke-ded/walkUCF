import NavBar from "./components/NavBar";
import Map from "./components/Map.tsx";
import SearchGlass from "./assets/searchglass.png";

function HomePage()
{

    return(
        <div className="flex-col h-screen w-screen items-center justify-center">
            <NavBar />
            <div className="flex w-screen h-13/14 items-center justify-center bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex flex-col items-center justify-start w-2/5 h-4/5 mr-20">
                    <div className="h-1/15 flex w-full justify-center items-center">
                        <input className="w-9/10 h-full text-lg text-neutral-700 p-1 border-2 border-neutral-600 placeholder-neutral-500 rounded-md bg-white/45 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70" placeholder="Search"></input>
                        <img className="w-auto h-full ml-[2.5%] p-1 border-2 border-neutral-600 hover:border-neutral-700 rounded-md bg-white/25 hover:bg-white/45 hover:ring-1 hover:ring-[#ffca09]/70" src={SearchGlass}></img>
                    </div>
                    <h1 className="text-black mt-5 text-2xl font-bold">Coming soon... an interactive walking map of UCF.</h1>
                </div>
                <div className="w-2/5 h-4/5 border-2 border-[#ffca09] rounded-md">
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default HomePage;