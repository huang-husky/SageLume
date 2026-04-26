// p58 · 命运
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
const int LOG = 17; // 2^17=131072 > 1e5

int n;
long long A[MAXN];
int B[MAXN];
long long st_min[LOG][MAXN], st_max[LOG][MAXN];

/**
 * 构建稀疏表（Sparse Table）用于区间最值查询
 * 预处理数组A，建立st_min和st_max表，分别存储区间最小值和最大值
 */
void build() {
    // 初始化第一层：长度为2^0=1的区间最值就是元素本身
    for (int i = 0; i < n; ++i) {
        st_min[0][i] = A[i];  // 长度为1的区间[i,i]的最小值
        st_max[0][i] = A[i];  // 长度为1的区间[i,i]的最大值
    }
    
    // 动态规划构建更高层的稀疏表
    // k表示区间长度的幂次，区间长度为2^k
    for (int k = 1; (1 << k) <= n; ++k) {
        // i为区间起始位置，确保区间[i, i+2^k-1]不超过数组边界
        for (int i = 0; i + (1 << k) - 1 < n; ++i) {
            // 将长度为2^k的区间[i, i+2^k-1]分为两部分：
            // [i, i+2^(k-1)-1] 和 [i+2^(k-1), i+2^k-1]
            // 区间最小值为两部分最小值的较小者
            st_min[k][i] = min(st_min[k-1][i], st_min[k-1][i + (1 << (k-1))]);
            // 区间最大值为两部分最大值的较大者
            st_max[k][i] = max(st_max[k-1][i], st_max[k-1][i + (1 << (k-1))]);
        }
    }
}

/**
 * 查询区间[l,r]内的最小值
 * 使用已构建的稀疏表进行O(1)时间复杂度的区间最值查询
 * @param l 左端点（包含）
 * @param r 右端点（包含）
 * @return 区间[l,r]内的最小值
 */
long long query_min(int l, int r) {
    // 计算覆盖整个区间[l,r]所需的最大幂次k
    // 区间长度为r-l+1，找到最大的k使得2^k <= r-l+1
    int k = log2(r - l + 1);
    
    // 将区间[l,r]分成两个可能重叠的子区间：
    // [l, l+2^k-1] 和 [r-2^k+1, r]
    // 这两个子区间的长度都是2^k，并且完全覆盖了[l,r]
    // 返回这两个子区间最小值的较小者
    return min(st_min[k][l], st_min[k][r - (1 << k) + 1]);
} 

/**
 * 查询区间[l,r]内的最大值
 * 使用已构建的稀疏表进行O(1)时间复杂度的区间最值查询
 * @param l 左端点（包含）
 * @param r 右端点（包含）
 * @return 区间[l,r]内的最大值
 */
long long query_max(int l, int r) {
    // 计算覆盖整个区间[l,r]所需的最大幂次k
    // 区间长度为r-l+1，找到最大的k使得2^k <= r-l+1
    int k = log2(r - l + 1);
    
    // 将区间[l,r]分成两个可能重叠的子区间：
    // [l, l+2^k-1] 和 [r-2^k+1, r]
    // 这两个子区间的长度都是2^k，并且完全覆盖了[l,r]
    // 返回这两个子区间最大值的较大者
    return max(st_max[k][l], st_max[k][r - (1 << k) + 1]);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    
    cin >> n;
    for (int i = 0; i < n; ++i) cin >> A[i];
    for (int i = 0; i < n; ++i) cin >> B[i];
    
    build();
    
    for (int i = 0; i < n; ++i) {
        int l = i - B[i] + 1; // 因为 B[i] 表示长度，左端点 = i - B[i] + 1
        int r = i;
        long long mn = query_min(l, r);
        long long mx = query_max(l, r);
        cout << mn * mx << '\n';
    }
    
    return 0;
}