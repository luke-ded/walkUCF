#define _USE_MATH_DEFINES

#include<iostream>
#include<string>
#include<fstream>
#include<vector>
#include<regex>
#include<cmath>
#include<iomanip>
#include<set>
#include<map>

using namespace std;

typedef struct point
{
    long long id;
    double lat;
    double lon;

    bool operator<(const point& other) const 
    {
        if (id != other.id) {
            return id < other.id;
        }
        return lat < other.lat;
    }
} point;

// via https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
static double haversine(double lat1, double lon1,
    double lat2, double lon2)
{
    // distance between latitudes
    // and longitudes
    double dLat = (lat2 - lat1) * M_PI / 180.0;
    double dLon = (lon2 - lon1) * M_PI / 180.0;

    // convert to radians
    lat1 = (lat1) * M_PI / 180.0;
    lat2 = (lat2) * M_PI / 180.0;

    // apply formulae
    double a = pow(sin(dLat / 2), 2) + pow(sin(dLon / 2), 2) * cos(lat1) * cos(lat2);
    double rad = 6371;
    double c = 2 * asin(sqrt(a));

    return abs(rad * c);
}

int main(void)
{
    cout<<"Please wait while the program is set up...\n";

    ifstream inputfile("auxiliary_files/entrance_coords.json");
    ifstream osminputfile("auxiliary_files/UCFmap.osm");
    ofstream outputfile("auxiliary_files/buildings.json");

    map<long long, point> points;
    vector<point> pointlist;
    set<point> pointset;
    string line;
    point temp;


    while (getline(inputfile, line)) 
    {
        regex delimiter(" "); 
        vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());

        try
        {
            temp.id = stoll(result[1]);
            temp.lat = stod(result[4]);
            temp.lon = stod(result[7]);

            points[temp.id] = temp;
        }
        catch(const exception& e)
        {
            cerr << e.what() << '\n';
            
            cout<<"Failed at line: "<<line<<endl;
            cout<<"Attempted to convert to integer: "<<result[1]<<endl;
            cout<<"Attempted to convert to double: "<<result[4]<<endl;
            cout<<"Attempted to convert to double: "<<result[7]<<endl;
            
            inputfile.close();
            osminputfile.close();
            outputfile.close();
            return 0;
        }   
    }


    long long id = 1;
    long long ref;
    string newline;


    outputfile<<"[";

    start:
    while(getline(osminputfile, line))
    {
        if(line.find("<way id") != string::npos)
        {
            pointlist.clear();
            while(getline(osminputfile, line))
            {
                if(line.find("<nd ref") != string::npos)
                {
                    regex delimiter(" "); 
                    vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());

                    newline = result[3];
                    newline = newline.erase(newline.length() - 3, newline.length());
                    newline = newline.erase(0, 5);

                    try
                    {
                        ref = stoll(newline);
                        if(points.count(ref) > 0)
                        {
                            pointlist.push_back(points[ref]);
                        }
                    }
                    catch(const exception& e)
                    {
                        cerr << e.what() << '\n';
                        cout<<"Failed at line: "<<line<<endl;
                        cout<<"Attempted to convert to integer: "<<newline<<endl;
                        
                        inputfile.close();
                        osminputfile.close();
                        outputfile.close();
                        return 0;
                    }
                }
                else if(line.find("k=\"building\"")!= string::npos)
                {
                    /*
                    {
                        "key": "1012",
                        "Name": "Addition Financial Arena Ticket Office",
                        "Abbreviation": "N/A",
                        "Entrances": [{"lat": 28.6066348, "long": -81.1973180}, 
                        {"lat": 28.6066348, "long": -81.1973180}]
                    }
                    */
                    string name = "No name found";

                    while(getline(osminputfile, line))
                    {
                        if(line.find("</way>")!= string::npos)
                            goto start;
                        
                        if(line.find("k=\"name\"")!= string::npos)
                        {
                            regex delimiter("\""); 
                            vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());

                            name = result[3];

                            break;
                        }
                    }
                    outputfile<<"{\n\t\"key\": \""<<id<<"\",\n";
                    outputfile<<"\t\"Name\": \""<<name<<"\",\n";
                    outputfile<<"\t\"Abbreviation\": \"N/A\",\n";
                    outputfile<<"\t\"Entrances\": [\n";
                    
                    if(pointlist.size() != 0)
                    {   
                        for(int i = 0; i < pointlist.size() - 1; i++)
                        {
                            outputfile<<setprecision(7)<<fixed<<"\t{\"lat\": "<<pointlist[i].lat<<", \"lon\": "<<pointlist[i].lon<<", \"id\": "<<pointlist[i].id<<"},\n";
                        }
                        outputfile<<setprecision(7)<<fixed<<"\t{\"lat\": "<<pointlist[pointlist.size() - 1].lat<<", \"lon\": "<<pointlist[pointlist.size() - 1].lon<<", \"id\": "<<pointlist[pointlist.size() - 1].id<<"}";
                    } 
                    else
                        outputfile<<"\t{\"lat\": 1, \"lon\": 1, \"id\": -1}";
                        

                    outputfile<<"]\n},\n";

                    id++;
                }
                else if(line.find("</way>")!= string::npos)
                    break;
            }
        }
    }

    outputfile<<"]";

    // Close the file
    inputfile.close();
    osminputfile.close();
    outputfile.close();

    return 0;
}