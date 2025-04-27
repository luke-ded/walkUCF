import { useState } from "react";

interface Item 
{
    key:string;
    Name: string;
    Abbreviation: string;
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
                        <button className = "rounded-sm inline-block h-fit w-fit px-2 bg-[#ffca09] border-2 border-[#ffca09] text-center text-neutral-700 hover:text-[#faefc8] text-lg font-bold hover:bg-[#ffca09]/60 cursor-pointer"
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
        {key: "1", Name: "MILLICAN HALL", Abbreviation: "MH"},
        {key: "2", Name: "JOHN C. HITT LIBRARY", Abbreviation: "LIB"},
        {key: "3", Name: "LIBRARY AUTOMATED RETRIEVAL CENTER (ARC)", Abbreviation: "LARC"},
        {key: "4", Name: "UTILITY BUILDING I", Abbreviation: "UB1"},
        {key: "5", Name: "STORM WATER RESEARCH LAB", Abbreviation: "SWL"},
        {key: "6", Name: "CHEMISTRY BUILDING", Abbreviation: "CHEM"},
        {key: "7", Name: "THEATRE", Abbreviation: "TH"},
        {key: "8", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS", Abbreviation: "FC"},
        {key: "9", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - A", Abbreviation: "FC-A"},
        {key: "10", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - B", Abbreviation: "FC-B"},
        {key: "11", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - C", Abbreviation: "FC-C"},
        {key: "12", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - D", Abbreviation: "FC-D"},
        {key: "13", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - E", Abbreviation: "FC-E"},
        {key: "14", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - F", Abbreviation: "FC-F"},
        {key: "15", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - G", Abbreviation: "FC-G"},
        {key: "16", Name: "JIMMIE A. FERRELL STUDENT SERVICES COMMONS - H", Abbreviation: "FC-H"},
        {key: "17", Name: "VOLUSIA HALL", Abbreviation: "VOL"},
        {key: "18", Name: "LAKE HALL", Abbreviation: "LAK"},
        {key: "19", Name: "OSCEOLA HALL", Abbreviation: "OSC"},
        {key: "20", Name: "POLK HALL", Abbreviation: "POL"},
        {key: "21", Name: "MATHEMATICAL SCIENCES BUILDING", Abbreviation: "MSB"},
        {key: "22", Name: "TECHNOLOGY COMMONS I", Abbreviation: "TC1"},
        {key: "23", Name: "HOWARD PHILLIPS HALL", Abbreviation: "HPH"},
        {key: "24", Name: "FACILITIES & SAFETY - A", Abbreviation: "FSC-A"},
        {key: "25", Name: "FACILITIES & SAFETY - B", Abbreviation: "FSC-B"},
        {key: "26", Name: "FACILITIES & SAFETY - C", Abbreviation: "FSC-C"},
        {key: "27", Name: "FACILITIES & SAFETY - D", Abbreviation: "FSC-D"},
        {key: "28", Name: "FACILITIES & SAFETY - E", Abbreviation: "FSC-E"},
        {key: "29", Name: "FACILITIES & SAFETY - F", Abbreviation: "FSC-F"},
        {key: "30", Name: "COLBOURN HALL", Abbreviation: "CNH"},
        {key: "31", Name: "REHEARSAL HALL", Abbreviation: "RH"},
        {key: "32", Name: "BIOLOGICAL SCIENCES BUILDING", Abbreviation: "BIO"},
        {key: "33", Name: "EDUCATIONAL COMPLEX & GYM", Abbreviation: "ED"},
        {key: "34", Name: "PRINT SHOP", Abbreviation: "PRNT"},
        {key: "35", Name: "CREATIVE SCHOOL FOR CHILDREN 1", Abbreviation: "CSC1"},
        {key: "36", Name: "RECREATION SUPPORT BUILDING", Abbreviation: "RSB"},
        {key: "37", Name: "JOHN T. WASHINGTON CENTER", Abbreviation: "JTWC"},
        {key: "38", Name: "COUNSELING & PSYCHOLOGICAL SERVICES", Abbreviation: "CAPS"},
        {key: "39", Name: "CREATIVE SCHOOL II", Abbreviation: "CS2"},
        {key: "40", Name: "TECHNOLOGY COMMONS II", Abbreviation: "TC2"},
        {key: "41", Name: "BREVARD HALL", Abbreviation: "BRE"},
        {key: "42", Name: "ORANGE HALL", Abbreviation: "ORG"},
        {key: "43", Name: "SEMINOLE HALL", Abbreviation: "SEM"},
        {key: "44", Name: "LIBRA COMMUNITY CENTER", Abbreviation: "LCC"},
        {key: "45", Name: "BIKE STORAGE 1", Abbreviation: "BK"},
        {key: "46", Name: "OUTDOOR STUDY PAVILION", Abbreviation: "STDY"},
        {key: "47", Name: "WAYNE DENSCH 1", Abbreviation: "WD1"},
        {key: "48", Name: "WAYNE DENSCH 2", Abbreviation: "WD2"},
        {key: "49", Name: "ENGINEERING I", Abbreviation: "ENG1"},
        {key: "50", Name: "UTILITY BUILDING 4", Abbreviation: "UB4"},
        {key: "51", Name: "SIEMENS ENERGY CENTER", Abbreviation: "SEC"},
        {key: "52", Name: "BUSINESS ADMINISTRATION I", Abbreviation: "BA1"},
        {key: "53", Name: "UTILITY BUILDING 5", Abbreviation: "UB5"},
        {key: "54", Name: "LABORATORY & ENVIRONMENTAL SUPPORT", Abbreviation: "LES"},
        {key: "55", Name: "EMERGENCY OPERATION CENTER", Abbreviation: "EOC"},
        {key: "56", Name: "ADDITION ARENA", Abbreviation: "ARNA"},
        {key: "57", Name: "VISUAL ARTS BUILDING", Abbreviation: "VAB"},
        {key: "58", Name: "STUDENT UNION", Abbreviation: "STUN"},
        {key: "59", Name: "CREOL BUILDING", Abbreviation: "CROL"},
        {key: "60", Name: "COLLEGE OF SCIENCES BUILDING", Abbreviation: "CSB"},
        {key: "61", Name: "LAKE CLAIRE BUILDING 55", Abbreviation: "LC55"},
        {key: "62", Name: "LAKE CLAIRE BUILDING 56", Abbreviation: "LC56"},
        {key: "63", Name: "LAKE CLAIRE BUILDING 57", Abbreviation: "LC57"},
        {key: "64", Name: "LAKE CLAIRE BUILDING 58", Abbreviation: "LC58"},
        {key: "65", Name: "LAKE CLAIRE BUILDING 59", Abbreviation: "LC59"},
        {key: "66", Name: "LAKE CLAIRE BUILDING 60", Abbreviation: "LC60"},
        {key: "67", Name: "LAKE CLAIRE BUILDING 61", Abbreviation: "LC61"},
        {key: "68", Name: "LAKE CLAIRE BUILDING 62", Abbreviation: "LC62"},
        {key: "69", Name: "LAKE CLAIRE BUILDING 63", Abbreviation: "LC63"},
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
        {key: "133", Name: "Tower 4", Abbreviation: "?"}
    ]

    var props: PropsType = {
        items: itemsList,
        renderer: renderItem
    };

    return (
        <div className="h-1/2 w-full">
            <div className="h-1/8 flex w-full justify-center items-center">
                <input className="w-full h-full text-lg dark:text-neutral-200 text-neutral-700 p-1 pl-5 border-2 dark:border-[#ffca09] border-[#a48100] dark:placeholder-neutral-200 placeholder-neutral-700 rounded-md dark:bg-black/25 bg-[#d6d4d4]/80 focus:outline-none focus:ring-1 focus:ring-[#ffca09]/70 shadow-lg" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            
            <div className="mt-5 overflow-y-scroll h-13/16 border-2 dark:border-[#ffca09] border-[#a48100] rounded-sm dark:bg-black/35 bg-[#d6d4d4]/50 shadow-lg">
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