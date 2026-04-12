#include<bits/stdc++.h>
using namespace std;

int main(){
    int n,k; // 总人数，k个中找max
    cin>>n>>k;

    vector<int> wealth(n);
    for(int c=0;c<n;c++){
        cin>>wealth[c];
    }

    deque<int> dq;
    for(int i=0;i<n;i++){
        // 弹出窗口外的下标
        while(!dq.empty() && dq.front() <= i-k) dq.pop_front();
        // 弹出所有比当前元素小的元素
        while(!dq.empty() && wealth[dq.back()] < wealth[i]) dq.pop_back();
        dq.push_back(i);

        // 当窗口形成后，输出当前窗口的最大值（队首）
        if(i >= k-1){
            cout<<wealth[dq.front()];
            if(i!=n-1) cout<<' ';
        }
    }
    cout << '\n';
    return 0;
}