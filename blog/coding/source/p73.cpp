#include<bits/stdc++.h>
using namespace std;

double average(int m){
    int sum=0,x;
    for(int c=0;c<m;c++){
        cin>>x;
        sum+=x;
    }
    return (double)sum/m;
}

int main(){
    int n,m;  // 选手，评委
    cin>>n>>m;
    for(int c=0;c<n;c++){
        double result=average(m);
        printf("%.2f\n",result);
    }
    return 0;
}
