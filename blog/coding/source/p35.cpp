#include<bits/stdc++.h>
using namespace std;

int main(){
    string c,x,y;
    getline(cin,c);
    getline(cin,x);
    getline(cin,y);

    // 从位置0开始在c里找x，返回找到的下标。
    int pos = c.find(x, 0); 
    while(pos!=string::npos){  // string::npos（一个很大的特殊值，表示"没找到"）
        // 把c从pos开始，长度为x.size()的部分，替换成y。
        c.replace(pos, x.size(), y);
        // 替换完，从pos+y.size()的位置继续往后找下一个x。
        pos = c.find(x, pos+y.size());
  }
    cout<<c<<endl;
    return 0;
}
