import src from "../assets/logo.png"

function NavBar()
{

    return(
        <div className="flex h-1/14 bg-black/90 border-b border-[#ffcc00]">
            <div className="flex items-center ml-3">
                <img className="h-6/10 w-auto" src={src} alt="UCF Logo" />
                <h1 className="text-3xl text-[#ffca09] ml-3">walkUCF</h1>
            </div>
        </div>
    );
}

export default NavBar;