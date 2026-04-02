#include<bits/stdc++.h>
using namespace std;

int main(){
    double x;
    cin >> x;
    long long fx = (long long)floor(x);  // 用long long，因|x|可达1e9
    double frac = x - fx;
    double ans;
    if(fx % 2 == 0)
        ans = frac;
    else
        ans = 1.0 - frac;
    printf("%.2f\n", ans);
    return 0;
}
