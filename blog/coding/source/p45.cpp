// Day 025 · 选位置
// acm.scu.edu.cn 45
// 列DP
#include<bits/stdc++.h>
using namespace std;

const long long MOD = 998244353;

int main(){
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m, x, y;
    cin>>n>>m>>x>>y;

    // 题目是 1-indexed，转成 0-indexed
    x--;
    y--;

    // dp[r] 表示当前列第 r 行的合法路径数
    vector<long long> dp(n, 0);

    // ====================== 1. 初始化第 0 列 ======================
    for (int r = 0; r < n; r++) {
        // 判断第 0 列、第 r 行是否合法
        bool ok = true;
        if (0 == y) {
            // 当前列 == y：必须 r == x
            ok = (r == x);
        } else if (0 == y - 1 || 0 == y + 1) {
            // 当前列是 y±1：不能在 [x-1, x+1]
            ok = !(r >= x - 1 && r <= x + 1);
        }
        // 其他列：全部合法
        if (ok) dp[r] = 1;
    }
    // ====================== 2. 逐列推进 c 从 1 到 m-1 ======================
    for (int c = 1; c < m; c++) {
        // 先求当前 dp 总和 S
        long long S = 0;
        for (auto num : dp) S = (S + num) % MOD;

        // 新建 next dp
        vector<long long> ndp(n, 0);
        for (int r = 0; r < n; r++) {
            // 判断当前列 c、行 r 是否合法
            bool ok = true;
            if (c == y) {
                ok = (r == x);
            } else if (c == y - 1 || c == y + 1) {
                ok = !(r >= x - 1 && r <= x + 1);
            }

            if (!ok) continue; // 不合法直接跳过

            // 合法：总和 - 自己（不能同行）
            ndp[r] = (S - dp[r] + MOD) % MOD;
        }

        // 更新 dp
        dp = move(ndp);
    }

    // ====================== 3. 答案：最后一列总和 ======================
    long long ans = 0;
    for (auto num : dp) ans = (ans + num) % MOD;
    cout<<ans<<"\n";

    return 0;
}
