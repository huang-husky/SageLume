#include<bits/stdc++.h>
using namespace std;

// 假设插入的字符在位置c，验证去掉它之后两半是否相同
bool check(string& U, int c, int L){
    for(int c1=0;c1<L;c1++){
        char ti  = (c1 < c)   ? U[c1]   : U[c1+1];
        char tiL = (c1+L < c) ? U[c1+L] : U[c1+L+1];
        if(ti != tiL) return false;
    }
    return true;
}

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
    int p=-1;
    for(int c=0;c<L;c++){
        if(S[c]!=S[c+L+1]){
            p=c;
            break;
        }
    }
    vector<int> candidates;
    if(p==-1){
        candidates = {L};
    }else{
        candidates = {p, p+L+1};
    }
    for(int c : candidates){
        if(check(S,c,L)){
            string current = (S.substr(0,c)+S.substr(c+1)).substr(0,L);
            if(result.empty()){
                result=current;
            }else if(result!=current){
                only=false;
            }
        }
    }
    if(result.empty()){
        cout<<"NOT POSSIBLE"<<endl;
    }else if(!only){
        cout<<"NOT UNIQUE"<<endl;
    }else{
        cout<<result<<endl;
    }
    return 0;    
}

