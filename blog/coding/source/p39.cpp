#include<bits/stdc++.h>
using namespace std;

int main (){
    long long n;
    scanf("%lld", &n);

    long long low=1, high=2000000;
    while(low<high){
        long long mid=(low+high)/2;
        long long f=6*mid*mid*mid+2*mid*mid-mid;
        if(f<n) low=mid+1;
        else if(f>n) high=mid-1;
        else{
            printf("%lld\n",mid);
            return 0;
        }
    }
    printf("%lld\n", low);
    return 0;
}