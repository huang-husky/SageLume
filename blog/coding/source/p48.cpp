#include<bits/stdc++.h>
using namespace std;

bool canAchieve(int d, const vector<int>& pos, int K) {
    int needed = 0;
    for (int c=0;c<pos.size()-1;++c) {
        int gap = pos[c+1] - pos[c];
        if (gap>d) {
            // 需要在这段中间加摄像头
            needed+=(gap+d-1)/d-1; // ceil(gap/d)-1
            if (needed>K) return false;
        }
    }
    return needed <= K;
}

int main() {
    int L, N, K;
    cin >> L >> N >> K;
    vector<int> pos(N);
    for (int i = 0; i < N; ++i) {
        cin >> pos[i];
    }

    // 找最大间隔作为右边界
    int max_gap = 0;
    for (int i = 0; i < N - 1; ++i) {
        max_gap=max(max_gap,pos[i+1]-pos[i]);
    }

    int left=1,right=max_gap,ans=max_gap;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (canAchieve(mid, pos, K)) {
            ans = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    cout<<ans<<endl;
    return 0;
}