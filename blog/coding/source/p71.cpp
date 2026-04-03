#include<bits/stdc++.h>
using namespace std;

bool isPrime(int x){
    bool prime_flag=true;
    for(int c=3;c*c<=x;c+=2){
        if(x%c==0){
            prime_flag=false;
        }
    }
    if(x<2){
        return false;
    }else if(x==2){
        return true;
    }else if(x%2==0){
        return false;
    }else if(!prime_flag){
        return false;
    }else{
        return true;
    }
}

int main(){
    int n;
    cin>>n;
    bool first=true;
    for(int c=0;c<n;c++){
        int l,r;
        cin>>l>>r;
        for(int c1=l;c1<=r;c1++){
            if(isPrime(c1)){
                if(!first) cout<<" ";
                cout<<c1;
                first=false;
            }
        }
        first=true;
        cout<<""<<endl;
    }
    return 0;
}
