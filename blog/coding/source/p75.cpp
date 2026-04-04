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

int reverse(int x){
    int rev=0;
    while(x!=0){
        rev=rev*10+x%10;
        x/=10;
    }
    return rev;
}

int main(){
    int l,r;
    cin>>l>>r;
    bool notFound=true;
    for(int c=l;c<=r;c++){
        int re=reverse(c);
        if(isPrime(c)&&isPrime(re)){
            cout<<c<<" ";
            notFound=false;
        }
    }
    if(notFound) cout<<"No!"<<endl;
    return 0;
}
