#define _USE_MATH_DEFINES

#include<iostream>
#include<string>
#include<fstream>
#include<vector>
#include<regex>
#include<cmath>

using namespace std;

typedef struct point
{
    int id;
    double lat;
    double lon;
} point;

bool pointsort(point a, point b)
{
    if(a.id < b.id)
        return true;

    return false;
}

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

    ifstream inputfile("Text Files/coords.txt");
    ifstream oldpaths("Text Files/paths.txt");
    string tempbuffer;
    

    string line;
    point temp;

    vector<point> points;


    while (getline(inputfile, line)) 
    {
        regex delimiter(" "); 
        vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());

        temp.id = stoi(result[1]);
        temp.lat = stod(result[14]);
        temp.lon = stod(result[27]);

        points.push_back(temp);
    }
    
    sort(points.begin(), points.end(), pointsort);

    int id = 1;

    while (getline(oldpaths, line)) 
    {
        regex delimiter(" "); 
        vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());

        //cout<<result[1]<<endl;

        if(result.size() < 5)
            break;

        tempbuffer += line + "\n";

        try{
            id = stoi(result[1]);
        }
        catch(exception e)
        {
            cout<<"Result[1] = `"<<result[1]<<"`\n";
            return 1;
        }
        
        

    }
    oldpaths.close();

    cout<<"\nProgram ready. Add point names in the format \"1 2\" to create a path between them. Enter -1 when finished.\n";

    int point1, point2, start, numpaths = 0;
    double lat1, lat2, lon1, lon2;

    
    ofstream outputfile("paths.txt");
    outputfile<<tempbuffer;

    cout<<"Add path: ";
    cin>>point1;

    while(point1 != -1)
    {
        cin>>point2;

        numpaths++;
        id++;

        lat1 = points[point1 - 1].lat;
        lat2 = points[point2 - 1].lat;
        lon1 = points[point1 - 1].lon;
        lon2 = points[point2 - 1].lon;

        //{ point_id1: 1, point_id2: 2, dist: 1234.34254}
        outputfile<<"{id: "<<id<<" , point_id1: "<<point1<<" , point_id2: "<<point2<<" , dist: "<<haversine(lat1, lon1, lat2, lon2)<<" },\n";


        cout<<"Add path: ";
        cin>>point1;
    }

    
    cout<<"You added "<<numpaths<<" paths.\n";

    // Close the file
    inputfile.close();
    outputfile.close();

    return 0;
}