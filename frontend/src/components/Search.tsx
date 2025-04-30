import { useState } from "react";

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
    lat?: number;
    long?: number;
}

interface ChildProps {
    triggerRerender: () => void;
}

interface PropsType 
{
    items: Item[];
    renderer: (item: Item) => React.ReactNode;
}


const SearchBar: React.FC<ChildProps> = ({ triggerRerender }) =>
{
    function addItem(item: Item)
    {
        var temp = localStorage.getItem('stoplist');
        var stoplist : Item [] = [];

        if(temp != undefined && temp != null)
        {
            stoplist = JSON.parse(temp);
        }

        stoplist.push(item);

        localStorage.setItem('stoplist', JSON.stringify(stoplist));
        
        triggerRerender();
    }

    const renderItem = (item: Item): React.ReactNode => 
    {
        return (
            <div>
                <div className="flex justify-between items-center">
                    <span className="dark:text-neutral-200 text-neutral-700 font-semibold text-md max-w-9/10">{item.Name}</span>
                    <span className="dark:text-[#ffca09] text-[#a48100] text-xs">{item.Abbreviation}</span>
                </div>
            
                <div className="flex justify-between items-center my-[1vh]">
                    <p className="dark:text-neutral-300 text-neutral-600">{item.key}</p>
                    <div>
                        <button className = "rounded-sm inline-block h-fit w-fit px-2 dark:bg-[#ffca09] bg-[#a48100] border-2 dark:border-[#ffca09] border-[#a48100] text-center dark:text-neutral-700 text-neutral-200 hover:text-[#faefc8] text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
                        onClick={() => addItem(item)}>+</button>
                    </div>
                </div>
            </div>
        );
    };

    const [selectedItem, setSelectedItem] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    console.log(selectedItem);
    function handleItemChange(item : Item)
    {
        setSelectedItem(item.key);
    }

    // Temporary? List of UCF buildings
    const itemsList = [
        {
          "key": "1",
          "Name": "MILLICAN HALL",
          "Abbreviation": "MH",
          "lat": 28.6024,
          "long": -81.2006
        },
        {
          "key": "2",
          "Name": "JOHN C. HITT LIBRARY",
          "Abbreviation": "LIB",
          "lat": 28.6019,
          "long": -81.2036
        },
        {
          "key": "3",
          "Name": "LIBRARY AUTOMATED RETRIEVAL CENTER (ARC)",
          "Abbreviation": "LARC",
          "lat": 28.6033,
          "long": -81.2054
        },
        {
          "key": "4",
          "Name": "UTILITY BUILDING I",
          "Abbreviation": "UB1",
          "lat": 28.6045,
          "long": -81.2061
        },
        {
          "key": "5",
          "Name": "STORM WATER RESEARCH LAB",
          "Abbreviation": "SWL",
          "lat": 28.6057,
          "long": -81.2077
        },
        {
          "key": "6",
          "Name": "CHEMISTRY BUILDING",
          "Abbreviation": "CHEM",
          "lat": 28.6003,
          "long": -81.2014
        },
        {
          "key": "7",
          "Name": "THEATRE",
          "Abbreviation": "TH",
          "lat": 28.5993,
          "long": -81.2003
        },
        {
          "key": "8",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS",
          "Abbreviation": "FC",
          "lat": 28.5987,
          "long": -81.1992
        },
        {
          "key": "9",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - A",
          "Abbreviation": "FC-A",
          "lat": 28.5985,
          "long": -81.1995
        },
        {
          "key": "10",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - B",
          "Abbreviation": "FC-B",
          "lat": 28.5984,
          "long": -81.1997
        },
        {
          "key": "11",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - C",
          "Abbreviation": "FC-C",
          "lat": 28.5983,
          "long": -81.1999
        },
        {
          "key": "12",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - D",
          "Abbreviation": "FC-D",
          "lat": 28.5982,
          "long": -81.2001
        },
        {
          "key": "13",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - E",
          "Abbreviation": "FC-E",
          "lat": 28.5981,
          "long": -81.2003
        },
        {
          "key": "14",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - F",
          "Abbreviation": "FC-F",
          "lat": 28.5980,
          "long": -81.2005
        },
        {
          "key": "15",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - G",
          "Abbreviation": "FC-G",
          "lat": 28.5979,
          "long": -81.2007
        },
        {
          "key": "16",
          "Name": "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - H",
          "Abbreviation": "FC-H",
          "lat": 28.5978,
          "long": -81.2009
        },
        {
          "key": "17",
          "Name": "VOLUSIA HALL",
          "Abbreviation": "VOL",
          "lat": 28.5973,
          "long": -81.2016
        },
        {
          "key": "18",
          "Name": "LAKE HALL",
          "Abbreviation": "LAK",
          "lat": 28.5972,
          "long": -81.2024
        },
        {
          "key": "19",
          "Name": "OSCEOLA HALL",
          "Abbreviation": "OSC",
          "lat": 28.5971,
          "long": -81.2031
        },
        {
          "key": "20",
          "Name": "POLK HALL",
          "Abbreviation": "POL",
          "lat": 28.5970,
          "long": -81.2039
        },
        {
          "key": "21",
          "Name": "MATHEMATICAL SCIENCES BUILDING",
          "Abbreviation": "MSB",
          "lat": 28.6008,
          "long": -81.2026
        },
        {
          "key": "22",
          "Name": "TECHNOLOGY COMMONS I",
          "Abbreviation": "TC1",
          "lat": 28.6015,
          "long": -81.2069
        },
        {
          "key": "23",
          "Name": "HOWARD PHILLIPS HALL",
          "Abbreviation": "HPH",
          "lat": 28.5997,
          "long": -81.2053
        },
        {
          "key": "24",
          "Name": "FACILITIES & SAFETY - A",
          "Abbreviation": "FSC-A",
          "lat": 28.5953,
          "long": -81.2081
        },
        {
          "key": "25",
          "Name": "FACILITIES & SAFETY - B",
          "Abbreviation": "FSC-B",
          "lat": 28.5950,
          "long": -81.2084
        },
        {
          "key": "26",
          "Name": "FACILITIES & SAFETY - C",
          "Abbreviation": "FSC-C",
          "lat": 28.5948,
          "long": -81.2086
        },
        {
          "key": "27",
          "Name": "FACILITIES & SAFETY - D",
          "Abbreviation": "FSC-D",
          "lat": 28.5946,
          "long": -81.2089
        },
        {
          "key": "28",
          "Name": "FACILITIES & SAFETY - E",
          "Abbreviation": "FSC-E",
          "lat": 28.5944,
          "long": -81.2091
        },
        {
          "key": "29",
          "Name": "FACILITIES & SAFETY - F",
          "Abbreviation": "FSC-F",
          "lat": 28.5942,
          "long": -81.2093
        },
        {
          "key": "30",
          "Name": "COLBOURN HALL",
          "Abbreviation": "CNH",
          "lat": 28.6009,
          "long": -81.2043
        },
        {
          "key": "31",
          "Name": "REHEARSAL HALL",
          "Abbreviation": "RH",
          "lat": 28.5991,
          "long": -81.1996
        },
        {
          "key": "32",
          "Name": "BIOLOGICAL SCIENCES BUILDING",
          "Abbreviation": "BIO",
          "lat": 28.5998,
          "long": -81.2032
        },
        {
          "key": "33",
          "Name": "EDUCATIONAL COMPLEX & GYM",
          "Abbreviation": "ED",
          "lat": 28.5988,
          "long": -81.2046
        },
        {
          "key": "34",
          "Name": "PRINT SHOP",
          "Abbreviation": "PRNT",
          "lat": 28.5961,
          "long": -81.2075
        },
        {
          "key": "35",
          "Name": "CREATIVE SCHOOL FOR CHILDREN 1",
          "Abbreviation": "CSC1",
          "lat": 28.5957,
          "long": -81.2068
        },
        {
          "key": "36",
          "Name": "RECREATION SUPPORT BUILDING",
          "Abbreviation": "RSB",
          "lat": 28.5965,
          "long": -81.2099
        },
        {
          "key": "37",
          "Name": "JOHN T. WASHINGTON CENTER",
          "Abbreviation": "JTWC",
          "lat": 28.5968,
          "long": -81.2052
        },
        {
          "key": "38",
          "Name": "COUNSELING & PSYCHOLOGICAL SERVICES",
          "Abbreviation": "CAPS",
          "lat": 28.5966,
          "long": -81.2058
        },
        {
          "key": "39",
          "Name": "CREATIVE SCHOOL II",
          "Abbreviation": "CS2",
          "lat": 28.5955,
          "long": -81.2071
        },
        {
          "key": "40",
          "Name": "TECHNOLOGY COMMONS II",
          "Abbreviation": "TC2",
          "lat": 28.6018,
          "long": -81.2078
        },
        {
          "key": "41",
          "Name": "BREVARD HALL",
          "Abbreviation": "BRE",
          "lat": 28.5965,
          "long": -81.2020
        },
        {
          "key": "42",
          "Name": "ORANGE HALL",
          "Abbreviation": "ORG",
          "lat": 28.5964,
          "long": -81.2027
        },
        {
          "key": "43",
          "Name": "SEMINOLE HALL",
          "Abbreviation": "SEM",
          "lat": 28.5963,
          "long": -81.2034
        },
        {
          "key": "44",
          "Name": "LIBRA COMMUNITY CENTER",
          "Abbreviation": "LCC",
          "lat": 28.5959,
          "long": -81.2041
        },
        {
          "key": "45",
          "Name": "BIKE STORAGE 1",
          "Abbreviation": "BK",
          "lat": 28.6013,
          "long": -81.2048
        },
        {
          "key": "46",
          "Name": "OUTDOOR STUDY PAVILION",
          "Abbreviation": "STDY",
          "lat": 28.6011,
          "long": -81.2051
        },
        {
          "key": "47",
          "Name": "WAYNE DENSCH 1",
          "Abbreviation": "WD1",
          "lat": 28.5982,
          "long": -81.2063
        },
        {
          "key": "48",
          "Name": "WAYNE DENSCH 2",
          "Abbreviation": "WD2",
          "lat": 28.5980,
          "long": -81.2066
        },
        {
          "key": "49",
          "Name": "ENGINEERING I",
          "Abbreviation": "ENG1",
          "lat": 28.6034,
          "long": -81.2021
        },
        {
          "key": "50",
          "Name": "UTILITY BUILDING 4",
          "Abbreviation": "UB4",
          "lat": 28.6039,
          "long": -81.2015
        },
        {
          "key": "51",
          "Name": "SIEMENS ENERGY CENTER",
          "Abbreviation": "SEC",
          "lat": 28.6044,
          "long": -81.2009
        },
        {
          "key": "52",
          "Name": "BUSINESS ADMINISTRATION I",
          "Abbreviation": "BA1",
          "lat": 28.6041,
          "long": -81.1997
        },
        {
          "key": "53",
          "Name": "UTILITY BUILDING 5",
          "Abbreviation": "UB5",
          "lat": 28.6048,
          "long": -81.1991
        },
        {
          "key": "54",
          "Name": "LABORATORY & ENVIRONMENTAL SUPPORT",
          "Abbreviation": "LES",
          "lat": 28.6053,
          "long": -81.1985
        },
        {
          "key": "55",
          "Name": "EMERGENCY OPERATION CENTER",
          "Abbreviation": "EOC",
          "lat": 28.6058,
          "long": -81.1979
        },
        {
          "key": "56",
          "Name": "ADDITION ARENA",
          "Abbreviation": "ARNA",
          "lat": 28.6027,
          "long": -81.2097
        },
        {
          "key": "57",
          "Name": "VISUAL ARTS BUILDING",
          "Abbreviation": "VAB",
          "lat": 28.6016,
          "long": -81.2091
        },
        {
          "key": "58",
          "Name": "STUDENT UNION",
          "Abbreviation": "STUN",
          "lat": 28.6005,
          "long": -81.2081
        },
        {
          "key": "59",
          "Name": "CREOL BUILDING",
          "Abbreviation": "CROL",
          "lat": 28.6031,
          "long": -81.2014
        },
        {
          "key": "60",
          "Name": "COLLEGE OF SCIENCES BUILDING",
          "Abbreviation": "CSB",
          "lat": 28.6025,
          "long": -81.2018
        },
        {
          "key": "61",
          "Name": "LAKE CLAIRE BUILDING 55",
          "Abbreviation": "LC55",
          "lat": 28.6069,
          "long": -81.1965
        },
        {
          "key": "62",
          "Name": "LAKE CLAIRE BUILDING 56",
          "Abbreviation": "LC56",
          "lat": 28.6071,
          "long": -81.1968
        }/*,
        {key: "70", Name: "LAKE CLAIRE BUILDING 64", Abbreviation: "LC64"},
        {key: "71", Name: "LAKE CLAIRE BUILDING 65", Abbreviation: "LC65"},
        {key: "72", Name: "LAKE CLAIRE BUILDING 66", Abbreviation: "LC66"},
        {key: "73", Name: "LAKE CLAIRE BUILDING 67", Abbreviation: "LC67"},
        {key: "74", Name: "LAKE CLAIRE BUILDING 68", Abbreviation: "LC68"},
        {key: "75", Name: "LAKE CLAIRE BUILDING 69", Abbreviation: "LC69"},
        {key: "76", Name: "LAKE CLAIRE BUILDING 70", Abbreviation: "LC70"},
        {key: "77", Name: "BARBARA YING CENTER", Abbreviation: "BYC"},
        {key: "78", Name: "UTILITY BUILDING 2", Abbreviation: "UB2"},
        {key: "79", Name: "HOUSING ADMINISTRATION BUILDING", Abbreviation: "HAB"},
        {key: "80", Name: "ROBINSON OBSERVATORY", Abbreviation: "OBSV"},
        {key: "81", Name: "NICHOLSON SCHOOL OF COMMUNICATION", Abbreviation: "NSC"},
        {key: "82", Name: "ENGINE RESEARCH LAB", Abbreviation: "ERL"},
        {key: "83", Name: "WAYNE DENSCH SPORTS CENTER", Abbreviation: "WDSC"},
        {key: "84", Name: "PARKING GARAGE I", Abbreviation: "PG1"},
        {key: "85", Name: "CLASSROOM BUILDING I", Abbreviation: "CB1"},
        {key: "86", Name: "HEALTH & PUBLIC AFFAIRS I", Abbreviation: "HPA1"},
        {key: "87", Name: "BARBARA YING CENTER - CMMS", Abbreviation: "CMMS"},
        {key: "88", Name: "JOHN EULIANO PARK BASEBALL FIELD (Formerly Jay Bergman Field)", Abbreviation: "JEP"},
        {key: "89", Name: "PARKING GARAGE C", Abbreviation: "PGC"},
        {key: "90", Name: "SUMTER HALL", Abbreviation: "SUM"},
        {key: "91", Name: "CITRUS HALL", Abbreviation: "CIT"},
        {key: "92", Name: "FLAGLER HALL", Abbreviation: "FLA"},
        {key: "93", Name: "COLLEGE OF ARTS & HUMANITIES", Abbreviation: "CAH"},
        {key: "94", Name: "RECREATION & WELLNESS CENTER", Abbreviation: "RWC"},
        {key: "95", Name: "PARKING GARAGE B", Abbreviation: "PGB"},
        {key: "96", Name: "HEALTH & PUBLIC AFFAIRS II", Abbreviation: "HPA2"},
        {key: "97", Name: "ENGINEERING II", Abbreviation: "ENG2"},
        {key: "98", Name: "BIOLOGY FIELD RESEARCH CENTER", Abbreviation: "BFRC"},
        {key: "99", Name: "TEACHING ACADEMY", Abbreviation: "TA"},
        {key: "100", Name: "BUSINESS ADMINISTRATION II", Abbreviation: "BA2"},
        {key: "101", Name: "BURNETT HONORS COLLEGE", Abbreviation: "BHC"},
        {key: "102", Name: "DUKE ENERGY UNIVERSITY WELCOME CENTER", Abbreviation: "DEWC"},
        {key: "103", Name: "PARKING GARAGE D", Abbreviation: "PGD"},
        {key: "104", Name: "CLASSROOM BUILDING II", Abbreviation: "CB2"},
        {key: "105", Name: "PSYCHOLOGY BUILDING", Abbreviation: "PSY"},
        {key: "106", Name: "BURNETT HOUSE", Abbreviation: "BH"},
        {key: "107", Name: "NIKE BUILDING 101", Abbreviation: "N101"},
        {key: "108", Name: "NIKE BUILDING 102", Abbreviation: "N102"},
        {key: "109", Name: "NIKE BUILDING 103", Abbreviation: "N103"},
        {key: "110", Name: "NIKE BUILDING 104", Abbreviation: "N104"},
        {key: "111", Name: "NIKE BUILDING 105", Abbreviation: "N105"},
        {key: "112", Name: "NIKE BUILDING 106", Abbreviation: "N106"},
        {key: "113", Name: "NIKE BUILDING 107", Abbreviation: "N107"},
        {key: "114", Name: "HERCULES BUILDING 108", Abbreviation: "H108"},
        {key: "115", Name: "HERCULES BUILDING 109", Abbreviation: "H109"},
        {key: "116", Name: "HERCULES BUILDING 110", Abbreviation: "H110"},
        {key: "117", Name: "HERCULES BUILDING 111", Abbreviation: "H111"},
        {key: "118", Name: "HERCULES BUILDING 112", Abbreviation: "H112"},
        {key: "119", Name: "HERCULES BUILDING 113", Abbreviation: "H113"},
        {key: "120", Name: "HERCULES BUILDING 114", Abbreviation: "H114"},
        {key: "121", Name: "NEPTUNE BUILDING 115", Abbreviation: "NEP115"},
        {key: "122", Name: "NEPTUNE BUILDING 116", Abbreviation: "NEP116"},
        {key: "123", Name: "NEPTUNE BUILDING 117", Abbreviation: "NEP117"},
        {key: "124", Name: "NEPTUNE BUILDING 118", Abbreviation: "NEP118"},
        {key: "125", Name: "NEPTUNE BUILDING 119", Abbreviation: "NEP119"},
        {key: "126", Name: "NEPTUNE BUILDING 120", Abbreviation: "NEP120"},
        {key: "127", Name: "NEPTUNE BUILDING 121", Abbreviation: "NEP121"},
        {key: "128", Name: "L3HARRIS ENGINEERING CENTER", Abbreviation: "?"},
        {key: "129", Name: "RESEARCH BUILDING I", Abbreviation: "?"},
        {key: "130", Name: "Tower 1", Abbreviation: "?"},
        {key: "131", Name: "Tower 2", Abbreviation: "?"},
        {key: "132", Name: "Tower 3", Abbreviation: "?"},
        {key: "133", Name: "Tower 4", Abbreviation: "?"}*/
    ]

    var props: PropsType = {
        items: itemsList,
        renderer: renderItem
    };

    return (
        <div className="h-1/4 w-full">
            <div className="h-2/8 flex w-full justify-center items-center">
                <input className="w-full h-full text-lg dark:text-neutral-200 text-neutral-700 p-1 pl-2 border-2 dark:border-[#ffca09] border-[#a48100] dark:placeholder-neutral-200 placeholder-neutral-700 rounded-md dark:bg-black/25 bg-white/70 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70 shadow-lg" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            
            <div className="mt-5 overflow-y-auto h-11/16 border-2 dark:border-[#ffca09] border-[#a48100] rounded-sm dark:bg-black/35 bg-white/65 shadow-lg">
                <ul className="shadow divide-y dark:divide-[#ffca09] divide:[#d6d4d4] min-h-0">
                    {props.items.filter((item) => item.Name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => {
                    return <li onClick={() => handleItemChange(item)} className="px-[1vw] py-[1vh] cursor-pointer border-b dark:border-[#ffe68c]/50 hover:bg-neutral-100/15">{props.renderer(item)}</li>;
                })}
                </ul>
            </div>
        </div>
    );
}

export default SearchBar;