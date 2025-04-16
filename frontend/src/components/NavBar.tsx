import src from "../assets/logo.png"

function NavBar()
{

    return(
        <div className="flex h-1/12 bg-[#242424] border-b-2 border-black">
            <div className="flex items-center ml-2">
                <img className="h-7/10 w-auto" src={src} alt="UCF Logo" />
                <h1 className="text-3xl text-[#ffca09] ml-5">walkUCF</h1>
            </div>
        </div>
    );
}

export default NavBar;