import { MdInfoOutline } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

interface ChildProps {
  triggerRerender: () => void;
  toggleSettings: (settings: any) => void;
}

const Settings: React.FC<ChildProps> = ({
  triggerRerender,
  toggleSettings,
}) => {
  var settingsData = localStorage.getItem("settings");

  if (settingsData == null || settingsData == undefined) {
    var settings: any = {
      units: "imperial",
      walkSpeed: 3,
      saveRoute: true,
      showLocation: true,
    };
    localStorage.setItem("settings", JSON.stringify(settings));
  } else var settings = JSON.parse(settingsData);

  if (settings.units == "imperial")
    var startUnits = String(settings.walkSpeed.toFixed(1));
  else var startUnits = String((settings.walkSpeed / 0.621371).toFixed(1));

  var permissionStatusData = localStorage.getItem("permissionStatus");
  var permissionStatus: any = null;

  if (permissionStatusData != null && permissionStatusData != undefined)
    permissionStatus = JSON.parse(permissionStatusData);

  const [units, setUnits] = useState(settings.units);
  const [walkSpeed, setWalkSpeed] = useState(settings.walkSpeed);
  const [newWalkSpeed, setNewWalkSpeed] = useState(startUnits);
  const [saveRoute, setSaveRoute] = useState(settings.saveRoute);
  const [showLocation, setShowLocation] = useState(settings.showLocation);
  const [info, setInfo] = useState(false);

  function setWalkSpeedHandler(inputWalkSpeed: string) {
    setNewWalkSpeed(inputWalkSpeed);
    setSaveRoute(true);

    if (!isNaN(Number(newWalkSpeed))) {
      if (units == "imperial") setWalkSpeed(Number(newWalkSpeed));
      else setWalkSpeed(Number(newWalkSpeed) * 0.621371);
    }
  }

  function setUnitsHandler(val: string) {
    if (!isNaN(Number(newWalkSpeed))) {
      if (val == "imperial" && units == "metric") {
        setWalkSpeedHandler(
          String((Number(newWalkSpeed) * 0.621371).toFixed(1)),
        );
      } else if (val == "metric" && units == "imperial") {
        setWalkSpeedHandler(
          String((Number(newWalkSpeed) / 0.621371).toFixed(1)),
        );
      } else return;
    }

    setUnits(val);
  }

  function save() {
    if (walkSpeed <= 0) setWalkSpeed(3);

    localStorage.setItem(
      "settings",
      JSON.stringify({
        units: units,
        walkSpeed: walkSpeed,
        saveRoute: saveRoute,
        showLocation: showLocation,
      }),
    );

    triggerRerender();
    toggleSettings(false);
  }

  function cancel() {
    toggleSettings(false);
  }

  return (
    <div className="fixed inset-0 flex items-start pt-30 z-12 flex h-full w-full max-w-full items-center justify-center bg-black/50">
      <div className="rounded-md border-2 border-[#a48100] bg-[url(./assets/backgroundmap.jpg)] shadow-lg max-sm:w-9/10 md:w-5/10 lg:w-3/10 dark:border-[#ffca09]">
        <div className="h-fit w-full flex-col justify-center rounded-sm bg-[#d6d4d4]/80 dark:bg-black/80">
          <div className="flex h-1/8 items-center justify-center border-b-2 border-[#a48100] dark:border-[#ffca09]">
            <h1 className="py-1 text-2xl font-bold text-neutral-700 dark:text-neutral-200">
              Settings
            </h1>
          </div>
          <div className="h-5/8 flex-col justify-start p-5 text-neutral-700 dark:text-neutral-200 mt-2">
            <div className="flex w-full items-center justify-center">
              <h1 className="mr-2 text-xl max-md:text-lg">Units:</h1>
              <div className="flex h-10 w-38 cursor-pointer rounded-xl border-2 border-[#a48100] bg-white/70 dark:border-[#ffe68c] dark:bg-black/40">
                <div
                  className={`flex h-full w-5/10 items-center justify-center rounded-l-lg border-r-2 border-[#a48100] dark:border-[#ffe68c] ${units == "imperial" ? "bg-[#ffe68c]/35" : "bg-transparent"}`}
                  onClick={() => setUnitsHandler("imperial")}
                >
                  <h1>Imperial</h1>
                </div>
                <div
                  className={`flex h-full w-5/10 items-center justify-center rounded-r-lg ${units == "metric" ? "bg-[#ffe68c]/35" : "bg-transparent"}`}
                  onClick={() => setUnitsHandler("metric")}
                >
                  <h1>Metric</h1>
                </div>
              </div>
            </div>
            <div className="mt-5 flex w-full items-center justify-center">
              <h1 className="mr-2 text-xl max-md:text-lg">Walking Speed:</h1>
              <input
                className="h-full w-1/10 w-3/20 rounded-md border-2 border-[#a48100] bg-white/70 p-1 text-center text-lg max-md:text-md text-neutral-700 placeholder-neutral-700/75 shadow-lg placeholder:text-center focus:ring-1 focus:ring-[#ffca09]/70 focus:outline-none dark:border-[#ffe68c] dark:bg-black/25 dark:text-neutral-200 dark:placeholder-neutral-200/75"
                placeholder="3.0"
                value={newWalkSpeed}
                onChange={(e) => setWalkSpeedHandler(e.target.value)}
                onBlur={(e) => setWalkSpeedHandler(e.target.value)}
              ></input>
              <h1 className="ml-2 text-lg max-md:text-md">
                {units == "imperial" ? "mi/hr" : "km/hr"}
              </h1>
              <div className="relative inline-block">
                <MdInfoOutline
                  size={20}
                  onClick={() => setInfo(!info)}
                  className="ml-2 cursor-pointer text-[#a48100] hover:text-[#ffe68c] dark:text-[#ffca09]"
                />
                {info && (
                  <div className="shardow-lg absolute z-14 flex w-80 rounded-lg border-2 border-[#a48100] bg-white p-1 max-lg:right-1 max-lg:bottom-8 xl:left-5 dark:border-[#ffca09] dark:bg-black">
                    <h1 className="ml-2 text-center text-sm text-neutral-700 dark:text-neutral-200">
                      If you wear a smartwatch, check your health app for the
                      most accurate measure of this stat. Otherwise, calculate
                      it yourself or leave the default setting of{" "}
                      {units == "imperial" ? "3.0 mi/hr" : "4.8 km/hr"}.
                    </h1>
                    <div className="flex">
                      <IoCloseSharp
                        size={15}
                        onClick={() => setInfo(false)}
                        className="cursor-pointer rounded-lg bg-[#ffe68c]/50 hover:bg-[#ffe68c]/82 hover:text-black dark:bg-[#ffe68c]/30 dark:hover:bg-[#ffe68c]/42 dark:hover:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {navigator.geolocation && permissionStatus && (
              <div className="mt-5 flex w-full items-center justify-center">
                <h1 className="mr-2 text-xl max-md:text-lg">Show Location:</h1>
                <div className="flex h-10 w-38 cursor-pointer rounded-xl border-2 border-[#a48100] bg-white/70 dark:border-[#ffe68c] dark:bg-black/40">
                  <div
                    className={`flex h-full w-5/10 items-center justify-center rounded-l-lg border-r-2 border-[#a48100] dark:border-[#ffe68c] ${showLocation ? "bg-[#ffe68c]/35" : "bg-transparent"}`}
                    onClick={() => setShowLocation(true)}
                  >
                    <h1>Yes</h1>
                  </div>
                  <div
                    className={`flex h-full w-5/10 items-center justify-center rounded-r-lg ${!showLocation ? "bg-[#ffe68c]/35" : "bg-transparent"}`}
                    onClick={() => setShowLocation(false)}
                  >
                    <h1>No</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex h-2/8 w-full items-center justify-center mt-2">
            <button
              className="mr-3 mb-5 h-10 cursor-pointer rounded-xl border-2 border-[#a48100] bg-white/70 px-2 py-1.5 hover:bg-[#ffe68c]/20 active:bg-[#ffe68c]/20 dark:border-[#ffe68c] dark:bg-black/40"
              onClick={save}
            >
              Save
            </button>
            <button
              className="mb-5 h-10 cursor-pointer rounded-xl border-2 border-[#a48100] bg-white/70 px-2 py-1.5 hover:bg-[#ffe68c]/20 active:bg-[#ffe68c]/20 dark:border-[#ffe68c] dark:bg-black/40"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
