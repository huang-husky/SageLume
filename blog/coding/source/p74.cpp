#include<bits/stdc++.h>
using namespace std;

int main(){
    int n,sum,k;
    cin>>n;
    for(int c=0;c<10000;c++){
        sum=c*(c+1)/2;
        if((sum-n)%3==0){
            k=(sum-n)/3;
            if(k>=1&&k<=c){
                cout<<c<<" "<<k<<endl;
                return 0;
            }
        }
    }
    cout<<"Impossible!"<<endl;
    return 0;
}
