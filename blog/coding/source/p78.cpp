#include<bits/stdc++.h>
using namespace std;

int sumFactors(int x){
    // 求 x 所有因数之和（枚举到 √x，成对加）
    int sum=0;
    for(int c=1;c*c<=x;c++){
        if(x%c==0){
            if(c*c==x) sum+=c;
            else sum+=c+x/c;
        }
    }
    return sum;
}

int main(){
    int n;
    cin>>n;
    for(int c=1;c<=n;c++){
        if(sumFactors(c)==2*c){
            cout<<c<<endl;
        }
    }
    return 0;
}
