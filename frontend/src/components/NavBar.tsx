import src from "../assets/logo.png"
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { useState } from "react";

interface ChildProps 
{
    toggleAbout: (about:any) => void;
    about: any;
}

const NavBar: React.FC<ChildProps> = ({ toggleAbout, about }) =>
{
    const [dark, setDark] = useState(true);

    const darkModeHandler = () => 
    {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    return(
        <div className="flex h-1/14 bg-black/90 border-b-2 border-[#ffca09] justify-between">
            <div className="flex items-center ml-3">
                <img className="h-6/10 w-auto" src={src} alt="UCF Logo" />
                <h1 className="text-3xl text-neutral-200 font-semibold ml-3">walkUCF</h1>
            </div>
            <div className="flex items-center mr-3 text-neutral-200">
                {dark &&(
                    <div className="flex items-center justify-center cursor-pointer h-10 w-10 hover:bg-[#ffe68c]/20 mr-3 border-2 border-[#ffe68c]/30 rounded-xl" onClick={()=> darkModeHandler()}>
                        <CiDark size={26} />
                    </div>
                )}
                {!dark &&(
                    <div className="flex items-center justify-center cursor-pointer h-10 w-10 hover:bg-[#ffe68c]/20 mr-3 border-2 border-[#ffe68c]/30 rounded-xl" onClick={()=> darkModeHandler()}>
                        <CiLight size={26} />
                    </div>
                )}
                <button className="cursor-pointer h-10 hover:bg-[#ffe68c]/20 px-2 py-1.5 border-2 border-[#ffe68c]/30 rounded-xl"
                onClick={() => toggleAbout(!about)}>About</button>
            </div>
        </div>
    );
}

export default NavBar;