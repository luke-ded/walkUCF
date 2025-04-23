#include<iostream>


using namespace std;

int main(void)
{
    int point1, point2;

    cout<<"Enter a range of points in format \"1 10\": ";
    cin>>point1;

    while(point1 != -1)
    {
        cin>>point2;

        cout<<point2<<" ";
        for(int i = point2 - 1; i >= point1 + 1; i--)
        {
            cout<<i<<" "<<i<<" ";
        }
        cout<<point1<<"\n\n";

        cout<<"Enter a range of points in format \"1 10\": ";
        cin>>point1;
    }
    return 0;
}