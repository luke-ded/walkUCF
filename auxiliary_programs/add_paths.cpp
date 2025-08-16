#define _USE_MATH_DEFINES

#include<iostream>
#include<string>
#include<fstream>
#include<vector>
#include<regex>
#include<cmath>
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

// via https://tinyurl.com/3yvuz6zs
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

    ifstream inputfile("auxiliary_files/coords.json");
    ifstream oldpaths("auxiliary_files/paths.json");
    string tempbuffer;
    

    string line;
    point temp;

    map<long long, point> points;


    while (getline(inputfile, line)) 
    {
        regex delimiter(" "); 
        vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());

        temp.id = stoll(result[1]);
        temp.lat = stod(result[4]);
        temp.lon = stod(result[7]);

        points[temp.id] = temp;
    }

    long long id = 1;

    while (getline(oldpaths, line)) 
    {
        regex delimiter(" "); 
        vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());

        if(result.size() < 5)
            break;

        tempbuffer += line + "\n";

        try{
            id = stoll(result[1]);
        }
        catch(exception e)
        {
            cout<<"Result[1] = `"<<result[1]<<"`\n";
            return 1;
        }
    }

    oldpaths.close();

    cout<<"\nProgram ready. Add point names in the format \"1 2\" to create a path between them. Enter -1 when finished.\n";

    long long point1, point2, start, numpaths = 0;
    double lat1, lat2, lon1, lon2;

    
    ofstream outputfile("auxiliary_files/paths.json");
    outputfile<<tempbuffer;

    cout<<"Add path: ";
    cin>>point1;

    while(point1 != -1)
    {
        cin>>point2;

        numpaths++;
        id++;

        lat1 = points[point1].lat;
        lat2 = points[point2].lat;
        lon1 = points[point1].lon;
        lon2 = points[point2].lon;

        // { point_id1: 1, point_id2: 2, dist: 1234.34254}
        outputfile<<"{\"id\": "<<id<<" , \"point_id1\": "<<point1<<" , \"point_id2\": "<<point2<<" , \"dist\": "<<haversine(lat1, lon1, lat2, lon2)<<" },\n";


        cout<<"Add path: ";
        cin>>point1;
    }

    
    cout<<"You added "<<numpaths<<" paths.\n";

    // Close the file
    inputfile.close();
    outputfile.close();

    return 0;
}