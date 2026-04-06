#include<bits/stdc++.h>
using namespace std;

int main(){
    int n;
    cin>>n;

    vector<int> a(n); // 存放每轮中人的个数
    for(int c=0;c<n;c++) cin>>a[c];

    vector<int> v(n); // 存放还在圈里的人的编号
    for(int c=0;c<n;c++) v[c]=c+1;

    int cur=0;  // 当前起始位置（0-indexed）

    for(int c=0;c<n;c++){
        int pos = (cur + a[c] - 1) % v.size();
        cout<<v[pos]<<" "; // 输出被淘汰的人
        v.erase(v.begin()+pos);
        if(v.size()>0) cur=pos%v.size(); // 防止最后一轮除零
    }

    return 0;
}
