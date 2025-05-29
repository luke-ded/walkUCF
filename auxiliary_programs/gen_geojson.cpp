/*
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [
      -81.200238,
      28.5948268
    ]
  },
  "properties": {
    "id": 99520044
  }
},
*/
#include<iostream>
#include<iomanip>
#include<fstream>
#include<regex>

using namespace std;

int main(void) 
{
  ifstream inputfile("Auxiliary Files/used_points.json");
  ofstream outputfile("Auxiliary Files/generated_geojson.json");

  outputfile<<"{\n\"type\": \"FeatureCollection\",\n\"features\": [\n";

  string line;

  while (getline(inputfile, line)) 
  {
    regex delimiter(" "); 
    vector<string> result(sregex_token_iterator(line.begin(), line.end(), delimiter, -1), sregex_token_iterator());

    outputfile<<"{\"type\": \"Feature\",\n\"geometry\": {\n\"type\": \"Point\",\n\"coordinates\": [\n";
    outputfile<<setprecision(7)<<fixed<<result[7]<<",\n";
    outputfile<<setprecision(7)<<fixed<<result[4]<<"\n]\n},\n";

    outputfile<<"\"properties\": {\n";
    outputfile<<"\"id\": "<<result[1]<<"\n}\n},";
  }

  inputfile.close();
  outputfile.close();

  return 0;
}