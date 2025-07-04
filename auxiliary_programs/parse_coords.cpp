#include<iostream>
#include<string>
#include<fstream>
#include<regex>
#include<iomanip>

using namespace std;

int main(void)
{
    cout<<"Program running..."<<endl;

    ifstream inputfile("auxiliary_files/UCFmap.osm");
    ofstream outputfile("auxiliary_files/coords.json");

    string line, newline;
    long long id;
    double lat, lon;

    outputfile<<"[";
    while (getline(inputfile, line)) 
    {
        if(line.find("<node id") != string::npos)
        {
            regex delimiter(" "); 
            vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());
            
            if(result.size() != 11)
            {
                cout<<"Invalid line: "<<line<<endl;
                return 0;
            }

            newline = result[2];
            newline = newline.erase(newline.length() - 1, newline.length());
            newline = newline.erase(0, 4);
            try
            {
                id = stoll(newline);
            } catch(...)
            {
                cout<<"Failed at line: "<<line<<endl;
                cout<<"Attempted to convert to integer: "<<newline<<endl;
                return 0;
            }
            
            
            newline = result[9];
            newline = newline.erase(newline.length() - 1, newline.length());
            newline = newline.erase(0, 5);
            try
            {
                lat = stod(newline);
            } catch(...)
            {
                cout<<"Failed at line: "<<line<<endl;
                cout<<"Attempted to convert to double: "<<newline<<endl;
                return 0;
            }

            newline = result[10];
            newline = newline.erase(newline.length() - 4, newline.length());
            newline = newline.erase(0, 5);
            try
            {
                lon = stod(newline);
            } catch(...)
            {
                cout<<"Failed at line: "<<line<<endl;
                cout<<"Attempted to convert to double: "<<newline<<endl;
                return 0;
            }

            cout<<setprecision(7)<<fixed<<id<<", "<<lat<<", "<<lon<<endl;

            //{ id: 'A', lat: 37.7749, lon: -122.4194 }
            outputfile<<setprecision(7)<<fixed<<"{\"id\": "<<id<<" , \"lat\": "<<lat<<" , \"lon\": "<<lon<<" },\n";
        }
    }

    outputfile<<"]";

    cout<<"Program completed."<<endl;;

    inputfile.close();
    outputfile.close();

    return 0;
}