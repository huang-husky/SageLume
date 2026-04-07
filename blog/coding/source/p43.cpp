// Day 023 · 朋友
// acm.scu.edu.cn 43
// 并查集
#include<bits/stdc++.h>
using namespace std;

int parent[100001];

int find(int x){
    if(parent[x]==x) return x;
    return parent[x]=find(parent[x]);
}

void unite(int x,int y){
    parent[find(x)]=find(y);
}

int main(){
    int q,n; // 询问次数，总人数
    cin>>q>>n;
    for(int c=1;c<=n;c++){
        parent[c]=c;
    }
    for(int c=0;c<q;c++){
        int a,x,y;
        cin>>a>>x>>y;
        if(a==1){
            unite(x,y);
        }else if(a==2){
            if(find(x)==find(y)){
                cout<<"YES"<<endl;
            }else{
                cout<<"NO"<<endl;
            }
        }
    }

    return 0;
}