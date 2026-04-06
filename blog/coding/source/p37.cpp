#include<bits/stdc++.h>
using namespace std;

int main(){
    int board[15][10];
    int piece[4][4];

    // 读入棋盘
    for(int c1=0;c1<15;c1++)
        for(int c2=0;c2<10;c2++)
            cin>>board[c1][c2];

    // 读入拼图
    for(int c1=0;c1<4;c1++)
        for(int c2=0;c2<4;c2++)
            cin>>piece[c1][c2];

    int ans=0;

    for(int i=0;i<12;i++){
        for(int j=0;j<7;j++){
            bool fit=true;
            for(int d=0;d<4;d++){
                for(int e=0;e<4;e++){
                    if(piece[d][e]==1){
                        if(board[i+d][j+e]!=0){
                            fit=false;
                            break;
                        }
                    }
                }
                if(!fit) break;
            }
            if(fit) ans++;
        }
    }

    cout<<ans<<endl;
    return 0;
}
