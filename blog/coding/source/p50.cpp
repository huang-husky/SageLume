#include<bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;

int main(){
    int n;
    cin>>n;

    vector<long long> yh_triangle(n+1,0);
    yh_triangle[0]=1;
    for(int c=0;c<n;c++){
        for(int d=c+1;d>0;d--){
            yh_triangle[d]=(yh_triangle[d]+yh_triangle[d-1])%MOD;
        }
    }

    for(int e=0;e<=n;e++){
        cout<<yh_triangle[e]<<" ";
    }
    return 0;
}