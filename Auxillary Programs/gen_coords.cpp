#include<iostream>
#include<string>
#include<fstream>

using namespace std;

int main(void)
{
    ifstream inputfile("Text Files/geojson apollo circuit in, athletic, lake claire.txt");
    string line, x, y;

    ofstream outputfile("Text Files/coords.txt");

    int i = 1;
    while (getline(inputfile, line)) {

        //cout<<line<<"and "<<"\t\t\"coordinates\": [\n";
        if(line.find("\"coordinates\": [") != string::npos)
        {
            cout<<i<<"\n";
            getline(inputfile, line);
            x = line.erase(line.length() - 2, line.length() - 1);

            getline(inputfile, line);
            y = line.erase(line.length() - 1);

            //{ id: 'A', lat: 37.7749, lon: -122.4194 }
            outputfile<<"{id: "<<i<<" , lat: "<<y<<" , lon: "<<x<<" }\n";

            i++;
        }

        // Output the text from the file
        //cout << line<<endl;
      }
  
      // Close the file
      inputfile.close();
      outputfile.close();

    return 0;
}