import NavBar from "./components/NavBar";
import Map from "./components/Map.tsx";

function HomePage()
{

    return(
        <div className="flex-col h-screen w-screen items-center justify-center">
            <NavBar />
            <div className="flex w-screen h-13/14 items-center justify-center bg-gradient-to-b from-black/60 to-transparent">
                <div className="w-2/5 h-4/5 mr-20">
                    <h1 className="text-black text-6xl font-bold">Coming soon... an interactive walking map of UCF.</h1>
                </div>
                <div className="w-2/5 h-4/5 border-2 border-[#ffca09] rounded-md">
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default HomePage;