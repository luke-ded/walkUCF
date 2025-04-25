import src from "../assets/logo.png"

function NavBar()
{

    return(
        <div className="flex h-1/14 bg-black/90 border-b justify-between border-[#ffcc00]">
            <div className="flex items-center ml-3">
                <img className="h-6/10 w-auto" src={src} alt="UCF Logo" />
                <h1 className="text-3xl text-[#ffca09] font-semibold ml-3">walkUCF</h1>
            </div>
            <div className="flex items-center mr-3">
                <button className="cursor-pointer hover:bg-[#ffe68c]/20 p-2 border-1 border-[#ffe68c]/30 rounded-xl">About</button>
            </div>
        </div>
    );
}

export default NavBar;