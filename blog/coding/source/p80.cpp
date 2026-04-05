#include<bits/stdc++.h>
using namespace std;

bool isValid(int n, int x){
    // 检查n的每一位是否都<x
    while(n!=0){
        if(n%10>=x){
            return false;
        }
        n/=10;
    }
    return true;
}

int toDecimal(int n, int x){
    // 把 n从x进制转成十进制
    int gewei=0,decimal=0,power=1;
    while(n!=0){
        gewei=n%10;
        decimal+=gewei*power;
        n/=10;
        power*=x;
    }
    return decimal;
}

bool check(int a, int b, int c, int x){
    // 验证a×b==c在x进制下是否成立
    if(!isValid(a,x)||!isValid(b,x)||!isValid(c,x)){
        return false;
    }
    bool find=false;
    if(toDecimal(a,x)*toDecimal(b,x)==toDecimal(c,x)){
        find=true;
        return find;
    }
    return find;
}

int main(){
    int a, b, c;
    cin>>a>>b>>c;
    for(int x=2;x<=16;x++){
        if(check(a, b, c, x)){
            cout<<x<<endl;
            return 0;
        }
    }
    cout<<0<<endl;
    return 0;
}
