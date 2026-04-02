#include<bits/stdc++.h>
using namespace std;

int days[] = {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};  // 2024 是闰年，2月有29天

long long toMin(int m, int d, int h, int mn){
    long long total = 0;
    for(int c = 1; c < m; c++) total += days[c];  // 累加前几个月的天数
    total += d - 1;                                // 加上当月已过的天数
    total = total * 24 * 60 + h * 60 + mn;        // 换算成分钟
    return total;
}

int main(){
    int m1, d1, h1, mn1;
    int m2, d2, h2, mn2;
    scanf("%d %d %d %d", &m1, &d1, &h1, &mn1);
    scanf("%d %d %d %d", &m2, &d2, &h2, &mn2);
    printf("%lld\n", toMin(m2, d2, h2, mn2) - toMin(m1, d1, h1, mn1));
    return 0;
}
