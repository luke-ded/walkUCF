import SearchGlass from "../assets/searchglass.png";


function SearchBar()
{


    return (
        <div className="h-1/15 flex w-full justify-center items-center">
            <input className="w-9/10 h-full text-lg text-neutral-700 p-1 border-2 border-neutral-600 placeholder-neutral-500 rounded-md bg-white/45 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70" placeholder="Search"></input>
            <img className="w-auto h-full ml-[2.5%] p-1 border-2 border-neutral-600 hover:border-neutral-700 rounded-md bg-white/25 hover:bg-white/45 hover:ring-1 hover:ring-[#ffca09]/70" src={SearchGlass}></img>
        </div>
    );
}

export default SearchBar;