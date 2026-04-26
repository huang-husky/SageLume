// p56 · 数
#include <bits/stdc++.h>
using namespace std;

// 试除法判断素数
bool isPrime(int n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;
    int limit = sqrt(n);
    for (int i = 3; i <= limit; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int L, R;
    cin >> L >> R;

    int count = 0;
    for (int i = L; i <= R; i++) {
        if (isPrime(i)) {
            count++;
        }
    }

    // 如果区间包含 2，则将其从统计结果中减去（因为题目只要求奇素数）
    if (L <= 2 && R >= 2) {
        count--;
    }

    cout << count << endl;
    return 0;
}