# $${\color{gold}walkUCF}$$
**walkUCF** is a virtual walking map of the University of Central Florida that exhibits many advantages over other UCF maps.

## How is walkUCF superior to other maps?
UCF students often use unconventional routes when walking across campus. As a result, traditional mapping services provide inaccurate and unhelpful routes to students looking for the fastest routes.
- **Entrances:** Users can choose which building entrances to use in their navigation. At UCF, many buildings have several entrances, and the fastest route between them varies noticeably depending on which entrances you use.

- **Walking through buildings:** When enabled, this map option allows users to pass through buildings along their route. For example, when walking from the arena to the library, walking through the student union results in significant time savings as opposed to going around it.

- **Walking across parking lots:** When enabled, this map option allows users to walk across parking lots along their route.

- **Walking across grass:** When enabled, this map option allows users to walk across grass along their route.

- **Jaywalking:** When enabled, this map option allows users to cross streets where there are no crosswalks.

- **Custom walking speed:** Users can choose their own walking speed for the most accurate route times.

- **Curation:** Since this map was created by a UCF student, it includes an attention to detail that popular mapping services lack-- resulting in more paths and more accurate data.

## How to Use
1. To add a location to your route, search for it by name or abbreviation in the search bar.
2. Next, select which entrance you would like to use, making use of the selected entrance points on the map to see which
entrance is which.
3. Click the add (+) button to add it to your route list.
4. If desired, use the arrow buttons to reorder items in your route list.
5. If desired, use the delete (x) button to remove a stop from the route list. 
6. Once you have selected all of the stops in your desired route, turn your attention to the map pane. Below the map,
select the options you would like enabled for your route.
7. For the most accurate route timing, adjust the walking speed in settings to your typical pace.
8. View your optimized route!

### Report an Issue
Please report any issues, including incorrect map data, with the form link provided in the "about" pane. 

## The Code
- **Dijkstra's Algorithm:** I wrote a customized version of the classic Dijkstra's Algorithm in TypeScript to find the shortest path in this application. It utilizes a priority queue from the "js-priority-queue" npm package.
- **TypeScript & TSX:** TSX made integrating state variables and list elements easy. 
In the future, I will likely use JavaScript & JSX instead. The extra specificity provided by TypeScript did not significantly improve the code for this application and overcomplicated some portions.
- **JSON Files:** JSON files are used to store map data such as paths, nodes, and locations (buildings.) Each map option has its own JSON file containing many additional paths (for example, selecting
the "parking lots" map option concatenates the parkingPaths JSON array to the standard paths, resulting in 150+ new paths.)
- **Auxiliary Programs:** There are several C++ programs in the Auxiliary Programs folder that I wrote to assist me with creating the map data for this application. They include programs for parsing nodes, footpaths, and entrances from the OSM
data in the .osm file as well as programs to add new paths and nodes to the JSON map data files.

## Tech Stack
- React (TypeScript): Framework for building the website using TSX components instead of traditional HTML.
- Tailwindcss: Framework for using simplified inline styles instead of traditional CSS.
- LeafletJS: Framework for generating the map, map markers, and map lines.
- Nginx: Backend server OS.

## Other Resources
- **OpenStreetMap(OSM):** Basis for many of the nodes and paths used for Dijkstra's algorithm. Custom C++ programs were used to parse this data into JSON arrays. OSM is also used to tile the LeafletJS map.
- **GeoJSON.io:** This website was very helpful when I was creating hundreds of custom points and paths. After writing a C++ program to parse the OSM data and convert it into GeoJSON, I could see all
of my points displayed on a visual map.

## Potential Future Enhancements
- Mobile app.
- Entrance option for "closest," which automatically calculates the entrance closest to the previous stop.
- Users reporting temporarily inaccessible paths (due to construction, events, etc.).
- Turn-by-turn directions.
- Location services.

## About
The name "walkUCF" is creatively shortened from "walking the University of Central Florida". This program was created by Luke, a CS major at the University of Central Florida.
