#include<bits/stdc++.h>
using namespace std;

int main(){
    long long n;
    scanf("%lld", &n);
    long long lo = 1, hi = 2000000;    // x 的搜索范围上界
    while(lo < hi){
        long long mid = (lo + hi) / 2;
        long long f = 6*mid*mid*mid + 2*mid*mid - mid;    // f(x) = 6x³+2x²-x
        if(f < n) lo = mid + 1;
        else if(f > n) hi = mid - 1;
        else { printf("%lld\n", mid); return 0; }
    }
    printf("%lld\n", lo);
    return 0;
}
