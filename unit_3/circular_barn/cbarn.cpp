#include <bits/stdc++.h>

using namespace std;

#define FOR(i, a, b) for (int i = a; i < b; i++)
#define F0R(i, a) for (int i = 0; i < a; i++)

#define pb push_back

const int MOD = 1000000007;
double PI = 4 * atan(1);

vector<int> a, b;
int n;

bool need()
{
    F0R(i, n)
    if (a[i] > b[i])
        return 1;
    return 0;
}

void Input()
{
    cin >> n;
    F0R(i, n)
    {
        b.pb(i);
        int t;
        cin >> t;
        F0R(j, t)
        a.pb(i);
    }
}

void Solve()
{
    while (need())
    {
        a.insert(a.begin(), a[n - 1] - n);
        a.erase(a.end() - 1);
    }
    int ans = 0;
    F0R(i, n)
    ans += (a[i] - b[i]) * (a[i] - b[i]);
    cout << ans;
}
int main()
{
    Input();
    Solve();
}