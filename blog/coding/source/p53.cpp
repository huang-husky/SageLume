#include <bits/stdc++.h>
using namespace std;

// 返回一个n*n的棋盘
vector<vector<int>> build(int n) {
    if (n == 2) { // 递归终点
        return {
            {1, 1},
            {0, 1}
        };
    }
    // 构造一个更小的棋盘
    auto half = build(n / 2);
    // 创建一个全0的棋盘
    vector<vector<int>> res(n, vector<int>(n, 0));

    // 遍历小棋盘，并复制到大棋盘左上右上右下
    for (int i = 0; i < n / 2; i++) {
        for (int j = 0; j < n / 2; j++) {
            res[i][j] = half[i][j]; // 左上
            res[i][j + n/2] = half[i][j]; // 右上
            res[i + n/2][j + n/2] = half[i][j]; // 右下
            // 左下默认0
        }
    }

    return res;
}

int main() {
    int n;
    cin >> n;

    auto ans = build(n);
    for (auto &row : ans) {
        for (int i = 0; i < n; i++) {
            cout << row[i];
            if (i != n - 1) cout << " ";
        }
        cout << "\n";
    }
    return 0;
}