#include <bits/stdc++.h>
using namespace std;

struct Student {
    string name;
    int net, prog, data, sum;
};

// 排序规则
bool cmp(const Student &a, const Student &b) {
    if (a.sum != b.sum) return a.sum > b.sum;
    if (a.net != b.net) return a.net > b.net;
    if (a.prog != b.prog) return a.prog > b.prog;
    if (a.data != b.data) return a.data > b.data;
    return a.name > b.name; // 字典序降序
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<Student> v(n);

    for (int i = 0; i < n; i++) {
        cin >> v[i].name >> v[i].net >> v[i].prog >> v[i].data;
        v[i].sum = v[i].net + v[i].prog + v[i].data;
    }

    sort(v.begin(), v.end(), cmp);

    // 表头
    cout << "------------------------------------------------\n";
    cout << "|" << setw(10) << "name"
         << "|" << setw(8) << "Network"
         << "|" << setw(8) << "Program"
         << "|" << setw(8) << "Date"
         << "|" << setw(8) << "Sum"
         << "|\n";
    cout << "------------------------------------------------\n";

    // 数据
    for (auto &s : v) {
        cout << "|" << setw(10) << s.name
             << "|" << setw(8) << s.net
             << "|" << setw(8) << s.prog
             << "|" << setw(8) << s.data
             << "|" << setw(8) << s.sum
             << "|\n";
    }

    cout << "------------------------------------------------\n";

    return 0;
}