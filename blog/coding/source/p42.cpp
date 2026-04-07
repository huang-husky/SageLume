#include<bits/stdc++.h>
using namespace std;

int main(){
    int q;
    cin>>q;
    deque<int> dq;
    for(int c=0;c<q;c++){
        int a;
        cin>>a;
        if(a==1){
            int x;
            cin>>x;
            dq.push_back(x);
        }else if(a==2){
            int y;
            cin>>y;
            dq.push_front(y);
        }else if(a==3){
            dq.pop_front();
        }else if(a==4){
            dq.pop_back();
        }else if(a==5){
            cout<<dq.front()<<endl;
        }
    }

    return 0;
}
