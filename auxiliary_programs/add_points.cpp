#define _USE_MATH_DEFINES

#include<iostream>
#include<string>
#include<fstream>
#include<vector>
#include<regex>
#include<cmath>
#include<map>
#include<iomanip>

using namespace std;


int main(void)
{
    cout<<"Please wait while the program is set up...\n";

    long long id, numpoints = 0;
    double lat, lon;
    string line;

    ofstream outputfile("auxiliary_files/coords.json", ios::app);
    

    cout<<"\nProgram ready. Add points in the format \"id lat lon\". Enter -1 when finished.\n";
    cout<<"Add point: ";

    cin>>id>>lat>>lon;

    while(id != -1)
    {
        outputfile<<setprecision(7)<<fixed<<"{\"id\": "<<id<<" , \"lat\": "<<lat<<" , \"lon\": "<<lon<<" },\n";
        numpoints++;

        cout<<"Add point: ";
        cin>>id>>lat>>lon;;
    }

    
    cout<<"You added "<<numpoints<<" points.\n";

    // Close the file
    outputfile.close();

    return 0;
}