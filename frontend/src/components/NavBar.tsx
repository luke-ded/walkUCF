import src from "../assets/logo.png"
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";

interface ChildProps 
{
    toggleAbout: (about:any) => void;
    about: any;
    toggleSettings: (settings:any) => void;
    settings: any;
}

const NavBar: React.FC<ChildProps> = ({ toggleAbout, about, toggleSettings, settings }) =>
{
    const [dark, setDark] = useState(true);

    const darkModeHandler = () => 
    {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    const aboutHandler = () =>
    {
        toggleSettings(false);
        toggleAbout(!about);
    }

    const settingsHandler = () =>
    {
        toggleAbout(false);
        toggleSettings(!settings);
    }

    return(
        <div className="flex h-1/14 min-h-[50px] w-full max-w-full px-3 bg-black/90 border-b-2 border-[#ffca09] justify-between">
            <div className="flex items-center">
                <img className="h-6/10 w-auto" src={src} alt="UCF Logo" />
                <h1 className="text-3xl max-sm:text-2xl text-neutral-200 font-semibold ml-3">walkUCF</h1>
            </div>
            <div className="flex items-center mr-3 text-neutral-200">
                <div className="flex items-center justify-center cursor-pointer sm:h-10 h-8 sm:w-10 w-8 hover:bg-[#ffe68c]/20 sm:mr-3 mr-2 border-2 border-[#ffe68c]/30 rounded-xl" 
                onClick={()=> darkModeHandler()}>
                    {dark && (<CiLight size={window.innerWidth > 640 ? 26 : 20} />)}
                    {!dark &&(<CiDark size={window.innerWidth > 640 ? 26 : 20} />)}
                </div>
                <div className="flex items-center justify-center cursor-pointer sm:h-10 h-8 sm:w-10 w-8 hover:bg-[#ffe68c]/20 sm:mr-3 mr-2 border-2 border-[#ffe68c]/30 rounded-xl" 
                onClick={() => settingsHandler()}>
                    <CiSettings size={window.innerWidth > 640 ? 26 : 20} />
                </div>
                <div className="flex items-center justify-center cursor-pointer sm:h-10 h-8 sm:w-10 w-8 hover:bg-[#ffe68c]/20 border-2 border-[#ffe68c]/30 rounded-xl"
                onClick={() => aboutHandler()}>
                    <CiCircleInfo size={window.innerWidth > 640 ? 26 : 20} />
                </div>
            </div>
        </div>
    );
}

export default NavBar;