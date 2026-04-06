#include<bits/stdc++.h>
using namespace std;

int main(){
    int n, m, q, k;
    cin>>n>>m>>q>>k;

    bool rowLine[1001] = {false};
    bool colLine[1001] = {false};

    // 读入 q 个行号
    for(int c=0;c<q;c++){
        int row;
        cin>>row;
        rowLine[row]=true;
    }

    // 读入 k 个列号
    for(int d=0;d<k;d++){
        int col;
        cin>>col;
        colLine[col]=true;
    }

    // 双重循环输出棋盘
    for(int e=1;e<=n;e++){
        for(int f=1;f<=m;f++){
            if(rowLine[e]&&colLine[f]){
                cout<<"+";
            }else if(rowLine[e]&&!colLine[f]){
                cout<<"-";
            }else if(!rowLine[e]&&colLine[f]){
                cout<<"|";
            }else{
                cout<<"0";
            }
        }
        cout<<endl;
    }

    return 0;
}
