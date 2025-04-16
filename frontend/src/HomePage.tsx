import NavBar from "./components/NavBar";

function HomePage()
{

    return(
        <div className="flex-col h-screen w-screen items-center justify-center">
            <NavBar />
            <div className="flex w-screen h-13/14 items-center justify-center bg-gradient-to-b from-black/60 to-transparent">
                <h1 className="text-black text-6xl font-bold">Coming soon... an interactive walking map of UCF.</h1>
            </div>
        </div>
    );
}

export default HomePage;