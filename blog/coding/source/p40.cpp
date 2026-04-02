#include<bits/stdc++.h>
using namespace std;

int main(){
    int day_in_month[12]={31,29,31,30,31,30,31,31,30,31,30,31};
    int m1,d1,h1,f1,m2,d2,h2,f2;
    cin>>m1>>d1>>h1>>f1;
    cin>>m2>>d2>>h2>>f2;

    // 第一步：算出这一天是今年第几天
    int total_days1=0;
    int total_days2=0;
    for(int c=0;c<m1-1;c++){
        total_days1+=day_in_month[c];
    }
    total_days1+=d1-1;
    for(int c=0;c<m2-1;c++){
        total_days2+=day_in_month[c];
    }
    total_days2+=d2-1;

    // 第二步：天数乘1440换算成分钟
    int total_min1=1440*total_days1;
    int total_min2=1440*total_days2;

    // 第三步：加上当天的小时和分钟
    int today_min1=60*h1+f1;
    int today_min2=60*h2+f2;
    total_min1+=today_min1;
    total_min2+=today_min2;

    // 第四步：后减前
    int output=total_min2-total_min1;
    cout<<output<<endl;

    return 0;
}
