// p57 · 合唱
#include <bits/stdc++.h>
using namespace std;

int main() {
    int N;
    cin >> N;
    vector<int> a(N);
    for (int c = 0; c < N; ++c) {
        cin >> a[c];
    }

    // f[c] 表示以 c 结尾的最长严格递减子序列长度
    vector<int> f(N, 1);
    for (int c = 0; c < N; ++c) {
        for (int j = 0; j < c; ++j) {
            if (a[j] > a[c]) {
                f[c] = max(f[c], f[j] + 1);
            }
        }
    }

    // g[c] 表示以 c 开始的最长严格递增子序列长度（向右看）
    vector<int> g(N, 1);
    for (int c = N - 1; c >= 0; --c) {
        for (int j = c + 1; j < N; ++j) {
            if (a[j] > a[c]) {
                g[c] = max(g[c], g[j] + 1);
            }
        }
    }

    int max_len = 0;
    for (int c = 0; c < N; ++c) {
        max_len = max(max_len, f[c] + g[c] - 1);
    }

    cout << N - max_len << endl;

    return 0;
}