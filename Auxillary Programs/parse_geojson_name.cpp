#include<iostream>
#include<string>
#include<fstream>

using namespace std;

int main(void)
{
    ifstream inputfile("Text Files/geojson apollo circuit in, athletic, lake claire.txt");
    string line, x, y;

    ofstream outputfile("Text Files/newgeojson.txt");

    int i = 1;
    while (getline(inputfile, line)) 
    {
        
        //cout<<line<<"and "<<"\t\t\"coordinates\": [\n";
        if(line.find("\"properties\": {}") != string::npos)
        {
            cout<<i<<"\n";
            outputfile<<"\t\t\t\"properties\": {\n";
            outputfile<<"        \"name\":"<<i<<"\n\t\t\t},\n";

            i++;
        }
        else
            outputfile<<line<<endl;

        // Output the text from the file
        //cout << line<<endl;
    }
    
  
    // Close the file
    inputfile.close();
    outputfile.close();

    return 0;
}