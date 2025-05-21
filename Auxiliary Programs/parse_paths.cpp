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

    bool operator<(const point& other) const {
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

    ifstream inputfile("Auxillary Files/coords.json");
    ifstream osminputfile("Auxillary Files/UCFmap.osm");
    ofstream outputfile("Auxillary Files/paths.json");
    ofstream pointoutputfile("Auxillary Files/used_points.json");

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
    
    long long id = 0;
    long long ref;
    string newline;
    int numpaths = 0;
    double lat1, lat2, lon1, lon2;

    outputfile<<"[";

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
                        pointlist.push_back(points[ref]);
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
                else if(line.find("<tag k=\"highway\" v=\"footway\"/>")!= string::npos
                    || line.find("<tag k=\"highway\" v=\"cycleway\"/>")!= string::npos
                    || line.find("<tag k=\"highway\" v=\"path\"/>")!= string::npos
                    || line.find("<tag k=\"highway\" v=\"pedestrian\"/>")!= string::npos)
                {
                    pointset.insert(pointlist[0]);
                    for(int i = 1; i < pointlist.size(); i++)
                    {
                        numpaths++;
                        id++;
                        
                        lat1 = pointlist[i].lat;
                        lat2 = pointlist[i - 1].lat;
                        lon1 = pointlist[i].lon;
                        lon2 = pointlist[i - 1].lon;

                        pointset.insert(pointlist[i]);

                        //{ point_id1: 1, point_id2: 2, dist: 1234.34254}
                        outputfile<<setprecision(7)<<fixed<<"{\"id\": "<<id<<" , \"point_id1\": "<<pointlist[i].id<<" , \"point_id2\": "<<pointlist[i - 1].id<<" , \"dist\": "<<haversine(lat1, lon1, lat2, lon2)<<" },\n";
                    }
                }
                else if(line.find("</way>")!= string::npos)
                    break;
            }
        }
    }

    outputfile<<"]";

    cout<<"Added "<<numpaths<<" paths.\n";

    pointoutputfile<<"[";
    for (point element : pointset) {
        pointoutputfile<<setprecision(7)<<fixed<<"{\"id\": "<<element.id <<" , \"lat\": "<<element.lat<<" , \"lon\": "<<element.lon<<" },\n";
    }

    // Close the files
    inputfile.close();
    osminputfile.close();
    outputfile.close();
    pointoutputfile.close();

    return 0;
}