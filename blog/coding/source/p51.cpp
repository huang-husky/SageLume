// p51.cpp — 成绩单
#include<bits/stdc++.h>
using namespace std;

struct Stu{
    string name;
    int Network,Program,Date,sum;
};

bool cmp(Stu a,Stu b){
    if(a.sum!=b.sum) return a.sum>b.sum;
    if(a.Network!=b.Network) return a.Network>b.Network;
    if(a.Program!=b.Program) return a.Program>b.Program;
    if(a.Date!=b.Date) return a.Date>b.Date;
    return a.name>b.name;
}

int main(){
    vector<Stu> stus;
    int N;
    cin>>N;
    for(int c=0;c<N;c++){
        Stu stu;
        cin>>stu.name>>stu.Network>>stu.Program>>stu.Date;
        stu.sum=stu.Network+stu.Program+stu.Date;
        transform(stu.name.begin(),stu.name.end(),stu.name.begin(),::tolower);
        stus.push_back(stu);
    }
    sort(stus.begin(),stus.end(),cmp);

    printf("------------------------------------------------\n");
    printf("|      name| Network| Program|    Date|     Sum|\n");
    printf("------------------------------------------------\n");
    for(int c=0;c<N;c++){
        printf("|%10s|%8d|%8d|%8d|%8d|\n",
            stus[c].name.c_str(),stus[c].Network,stus[c].Program,stus[c].Date,stus[c].sum);
    }
    printf("------------------------------------------------\n");
    return 0;
}
