#include<bits/stdc++.h>
using namespace std;

int cnt[20001];  // 桶数组，下标 0~20000 对应值 -10000~10000

int main(){
    int n;
    scanf("%d", &n);
    for(int c = 0; c < n; c++){
        int x;
        scanf("%d", &x);
        cnt[x + 10000]++;  // +10000 偏移，将负数下标变为非负，往桶里扔一个球
    }
    bool first = true;  // 用于控制输出格式，避免开头多一个空格
    for(int c1 = 0; c1 <= 20000; c1++){  // 从小到大扫所有桶
        for(int c2 = 0; c2 < cnt[c1]; c2++){  // 这个桶有几个球就输出几次
            if(!first) printf(" ");
            printf("%d", c1 - 10000);  // -10000 还原真实值
            first = false;
        }
    }
    printf("\n");
    return 0;
}
