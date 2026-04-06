#include<bits/stdc++.h>
using namespace std;

int main(){
    string s;
    getline(cin, s);

    int cnt[36] = {0};

    // 遍历字符串，统计每个字符
    for(int c=0; c<s.size(); c++){
        // 判断是数字还是字母，更新 cnt
        if(isdigit(s[c])){
            cnt[s[c]-'0']++;
        }else if(isalpha(s[c])){
            cnt[toupper(s[c])-'A'+10]++;
        }
    }

    // 找最大值 maxVal
    int maxVal=0,max=0;
    for(int c=0;c<36;c++){
        if(cnt[c]>maxVal){
            maxVal=cnt[c];
            max=c;
        }
    }

    // 倒序遍历行
    for(int d=maxVal;d>0;d--){
        // 遍历36列
        for(int e=0;e<36;e++){
            if(cnt[e]>=d) cout<<"* ";
            else cout<<"- ";
        }
        cout<<endl;
    }
    // 输出最后一行标签
    cout<<"0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"<<endl;

    return 0;
}
