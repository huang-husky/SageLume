#include<bits/stdc++.h>
using namespace std;

// 辅助函数：判断左右括号是否匹配
bool isMatch(char left, char right) {
    if (left == '(' && right == ')') return true;
    if (left == '[' && right == ']') return true;
    if (left == '{' && right == '}') return true;
    if (left == '<' && right == '>') return true;
    return false;
}

// 核心检查函数
void solve(string s) {
    stack<char> st;
    bool valid = true;

    for (char c : s) {
        if (c == '(' || c == '[' || c == '{' || c == '<') {
            st.push(c);
        }
        else {
            if (st.empty()) {
                valid = false;
                break;
            }
            char topChar = st.top();
            if (!isMatch(topChar, c)) {
                valid = false;
                break;
            }

            st.pop();
        }
    }

    if (valid && st.empty()) {
        cout << "YES" << endl;
    } else {
        cout << "NO" << endl;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    string line;
    for(int i = 0; i < 3; i++) {
        if (cin >> line) {
            solve(line);
        }
    }

    return 0;
}