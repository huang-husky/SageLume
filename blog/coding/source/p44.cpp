// Day 024 · 希望的田野
// acm.scu.edu.cn 44
// 二维前缀和
#include<bits/stdc++.h>
using namespace std;


int main(){
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n,m,q; // 行数，列数，询问次数
    cin>>n>>m>>q;
    
    vector<vector<long long>> pre(n+1, vector<long long>(m+1,0));
    for(int c=1;c<=n;c++){
        for(int d=1;d<=m;d++){
            int value;
            cin>>value;
            pre[c][d]=pre[c-1][d]+pre[c][d-1]-pre[c-1][d-1]+value;
        }
    }

    for(int e=0;e<q;e++){
        long long x1,y1,x2,y2,output;
        cin>>x1>>y1>>x2>>y2;
        output= pre[x2][y2]-pre[x1-1][y2]-pre[x2][y1-1]+pre[x1-1][y1-1];                               
        cout<<output<<"\n";
    }

    return 0;
}