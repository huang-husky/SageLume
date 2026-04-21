#include<bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<long long> x(n+1), y(n+1);
    for (int c = 1; c <= n; c++) cin >> x[c] >> y[c];
    long long d;
    cin >> d;

    auto dist = [&](int a, int b) -> long long {
        long long ax = (a == 0) ? 0 : x[a];
        long long ay = (a == 0) ? 0 : y[a];
        return abs(x[b]-ax) + abs(y[b]-ay);
    };

    const long long INF = 1e18;
    vector<vector<long long>> dp(n+1, vector<long long>(n+1, INF));

    for (int c = 1; c <= n; c++)
        dp[c][1] = dist(0, c);

    for (int k = 2; k <= n; k++)
        for (int c1 = 1; c1 <= n; c1++)
            for (int c2 = c1+1; c2 <= n; c2++)
                if (dp[c1][k-1] != INF)
                    dp[c2][k] = min(dp[c2][k], dp[c1][k-1] + dist(c1, c2));

    int ans = 0;
    for (int k = 1; k <= n; k++) {
        long long best = INF;
        for (int c = 1; c <= n; c++)
            best = min(best, dp[c][k] + dist(c, 0));
        if (best <= d) ans = k;
    }

    cout << ans << endl;
    return 0;
}
