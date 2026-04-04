#include<bits/stdc++.h>
using namespace std;

string convert(int a, int b){
    string digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string rever="";
    while(a!=0){
        rever+=digits[a%b];
        a/=b;
    }
    reverse(rever.begin(),rever.end());
    return rever;
}


int main(){
    int a,b;
    cin>>a>>b;
    cout<<convert(a,b)<<endl;
    return 0;
}
