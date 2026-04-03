#include<bits/stdc++.h>
using namespace std;

int main(){
    int N;
    string S;
    cin>>N>>S;
    if(N%2==0){
        cout<<"NOT POSSIBLE"<<endl;
        return 0;
    }
    int L = (N-1)/2;
    string result;
    bool only=true;
    for(int c=0;c<N;c++){
        string T=S.substr(0, c)+S.substr(c+1);
        if(T.substr(0, L) == T.substr(L)) {
            if(result.empty()){
                result=T.substr(0,L);;
            }else if(T.substr(0,L)!=result){
                only=false;
                cout<<"NOT UNIQUE"<<endl;
                return 0;
            }
        }
    }
    if(result.empty()) cout<<"NOT POSSIBLE"<<endl;
    else cout<<result<<endl;
    return 0;
}