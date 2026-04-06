#include<bits/stdc++.h>
using namespace std;

int main(){
    int n,m,q,k;
    cin>>n>>m>>q>>k;

    bool rowLine[1001]={false};
    bool colLine[1001]={false};

    for(int c=0;c<q;c++){
        int row;
        cin>>row;
        rowLine[row]=true;
    }

    for(int c=0;c<k;c++){
        int col;
        cin>>col;
        colLine[col]=true;
    }

    for(int c1=1;c1<=n;c1++){
        for(int c2=1;c2<=m;c2++){
            if(rowLine[c1]&&colLine[c2]){
                cout<<"+";
            }else if(rowLine[c1]){
                cout<<"-";
            }else if(colLine[c2]){
                cout<<"|";
            }else{
                cout<<"0";
            }
        }
        cout<<endl;
    }

    return 0;
}
