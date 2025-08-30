import NavBar from "./components/NavBar";
import Map from "./components/Map.tsx";
import Search from "./components/Search.tsx";
import About from "./components/About.tsx";
import Error from "./components/Error.tsx";
import Settings from "./components/Settings.tsx";
import RouteList from "./components/RouteList.tsx";
import { useState } from "react";

function HomePage() {
  const [count, setCount] = useState(0);
  const [about, toggleAbout] = useState(false);
  const [error, toggleError] = useState(false);
  const [settings, toggleSettings] = useState(false);
  const [stops, setStops] = useState<any[]>([]);
  const [prevLoc, setPrevLoc] = useState<any>(null);

  var settingsData = localStorage.getItem("settings");
  if (settingsData == null || settingsData == undefined) {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        units: "imperial",
        walkSpeed: 3,
        saveRoute: true,
        showLocation: true,
      }),
    );
  }

  var distanceData = localStorage.getItem("graphData");
  if (distanceData == null || distanceData == undefined) {
    localStorage.setItem(
      "graphData",
      JSON.stringify({ distanceMi: 0, distanceKm: 0 }),
    );
  }

  const triggerRerender = () => {
    setCount(count + 1);
  };

  async function iosCheckGeolocationPermission(): Promise<any> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (_position) => {
          resolve("granted");
        },
        (_error) => {
          resolve("denied");
        },
      );
    });
  }

  async function checkGeolocationPermission() {
    try {
      var permissionStatus = await iosCheckGeolocationPermission();

      switch (permissionStatus) {
        case "granted":
          localStorage.setItem("permissionStatus", JSON.stringify(true));
          break;
        default:
          localStorage.setItem("permissionStatus", JSON.stringify(false));
      }

      if (permissionStatus != prevLoc) {
        setPrevLoc(permissionStatus);
      }
    } catch (error) {
      console.error("Error querying permissions:", error);
    }
  }

  setInterval(checkGeolocationPermission, 4000);

  return (
    <div
      className={`relative h-[150vh] w-screen cursor-default flex-col items-center justify-center text-neutral-700 select-none max-lg:min-h-[1100px] lg:h-screen dark:text-neutral-200 ${about || settings || error ? "overflow-y-hidden" : ""}`}
    >
      <NavBar
        toggleAbout={toggleAbout}
        about={about}
        toggleSettings={toggleSettings}
        settings={settings}
      />
      <div className="flex h-13/14 w-screen items-center bg-gradient-to-b from-black/60 to-black/50 max-lg:h-20/21 max-lg:min-h-[1200px] max-lg:flex-col lg:justify-center lg:to-transparent">
        <div className="flex h-4/5 max-h-4/5 w-2/5 flex-col items-center max-lg:order-2 max-lg:mt-5 max-lg:max-h-9/16 max-lg:min-h-9/16 max-lg:w-9/10 lg:order-1 lg:mr-20 lg:justify-between">
          <Search triggerRerender={triggerRerender} setStops={setStops} />
          <RouteList
            triggerRerender={triggerRerender}
            setStops={setStops}
            stops={stops!}
          />
        </div>
        <div className="flex h-4/5 w-2/5 flex-col justify-between rounded-md border-2 border-[#a48100] shadow-lg max-lg:order-1 max-lg:mt-5 max-lg:min-h-6/16 max-lg:w-9/10 lg:order-2 dark:border-[#ffca09]">
          <Map
            stops={stops!}
            triggerRerender={triggerRerender}
            toggleError={toggleError}
          />
        </div>
        {about && <About toggleAbout={toggleAbout} />}
        {error && <Error toggleError={toggleError} />}
        {settings && (
          <Settings
            triggerRerender={triggerRerender}
            toggleSettings={toggleSettings}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
