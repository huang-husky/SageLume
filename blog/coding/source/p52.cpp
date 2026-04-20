#include <bits/stdc++.h>
using namespace std;

// 快速幂
int qpow(long long b, long long n, long long mod) {
    b%=mod;  
    long long ans=1%mod;
    while (n) {             
        if (n & 1) {    
            ans = ans * b % mod;
        }
        n >>= 1;   
        b = b * b % mod; 
    } 
    return ans;             
}

int main() {
    long long b,n,k;
    cin>>b>>n>>k;
    cout<<qpow(b,n,k);
    
    return 0;
}
