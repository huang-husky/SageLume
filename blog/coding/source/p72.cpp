#include<bits/stdc++.h>
using namespace std;

double dist(double x1, double y1, double x2, double y2){
    double distance=sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    return distance;
}

int main(){
    double x0,y0,x1,y1,x2,y2,result;
    cin>>x0>>y0>>x1>>y1>>x2>>y2;
    result=dist(x0,y0,x1,y1)+dist(x0,y0,x2,y2)+dist(x1,y1,x2,y2);
    printf("%.2f\n", result);
    return 0;
}

