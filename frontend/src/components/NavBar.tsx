import src from "../assets/logo.png";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";

interface ChildProps {
  toggleAbout: (about: any) => void;
  about: any;
  toggleSettings: (settings: any) => void;
  settings: any;
}

const NavBar: React.FC<ChildProps> = ({
  toggleAbout,
  about,
  toggleSettings,
  settings,
}) => {
  const [dark, setDark] = useState(true);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const aboutHandler = () => {
    toggleSettings(false);
    toggleAbout(!about);
  };

  const settingsHandler = () => {
    toggleAbout(false);
    toggleSettings(!settings);
  };

  return (
    <div className="flex h-1/21 w-full max-w-full justify-between border-b-2 border-[#ffca09] bg-black/85 px-3 lg:h-1/14">
      <div className="flex items-center">
        <img className="h-6/10 w-auto" src={src} alt="UCF Logo" />
        <h1 className="ml-3 text-3xl font-semibold text-neutral-200 max-sm:text-2xl">
          walkUCF
        </h1>
      </div>
      <div className="flex items-center text-neutral-200">
        <div
          className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-2 border-[#ffe68c]/30 hover:bg-[#ffe68c]/20 sm:mr-3"
          onClick={() => darkModeHandler()}
        >
          {dark && <CiLight size={26} />}
          {!dark && <CiDark size={26} />}
        </div>
        <div
          className="mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-2 border-[#ffe68c]/30 hover:bg-[#ffe68c]/20 sm:mr-3"
          onClick={() => settingsHandler()}
        >
          <CiSettings size={26} />
        </div>
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-2 border-[#ffe68c]/30 hover:bg-[#ffe68c]/20"
          onClick={() => aboutHandler()}
        >
          <CiCircleInfo size={26} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
