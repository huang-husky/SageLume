#include<bits/stdc++.h>
using namespace std;

int main(){
    int q;
    cin>>q;
    for(int c=0;c<q;c++){
        int n;
        stack<int> s;
        int order=0;

        cin>>n;        
        vector<int> in(n);
        for(int f=0;f<n;f++){
            cin>>in[f];
        }
        vector<int> out(n);
        for(int e=0;e<n;e++){
            cin>>out[e];
        }
        for(int d=0;d<n;d++){
            s.push(in[d]);
            
            while(!s.empty()&&s.top()==out[order]){
                s.pop();
                order++;
            }
        }
        if(s.empty()) cout<<"YES"<<endl;
        else cout<<"N0"<<endl;
    }
    return 0;
}
