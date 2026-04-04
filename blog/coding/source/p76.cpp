#include<bits/stdc++.h>
using namespace std;

//  1的个数 ≥ 0的个数 = 总位数 − 1的个数，巧妙！
int countOnes(int x){
    int count1=0;
    while(x!=0){
        if(x%2==1) count1++;
        x/=2;
    }
    return count1;
}

int countBits(int y){
    int count=0;
    while(y!=0){
        count++;
        y/=2;
    }
    return count;
}

int main(){
    int l,r;
    cin>>l>>r;
    int A=0,B=0;
    for(int c=l;c<=r;c++){
        if(2*countOnes(c)>=countBits(c)) A++;
        else B++;
    }
    cout<<A<<" "<<B<<endl;
    return 0;
}
