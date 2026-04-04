#include<bits/stdc++.h>
using namespace std;

int maxPrime(int x){
    int max=1;
    for(int c=2;c*c<=x;c++){
        if(x%c==0){
            while(x%c==0){
                max=c;
                x/=c;
            }
        }
    }
    if(x>1) max=x;
    return max;
}

int main(){
    int l,r;
    cin>>l>>r;
    for(int c=l;c<=r;c++){
        cout<<maxPrime(c)<<" ";
    }
    return 0;
}
