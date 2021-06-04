#include <bits/stdc++.h>

using namespace std;

int n, q;
int p1[100015], p2[100015], p3[100015];

void Input()
{
    cin >> n >> q;
    for (int i = 1, x; i <= n; ++i)
    {
        cin >> x;
        p1[i] = p1[i - 1] + (x == 1);
        p2[i] = p2[i - 1] + (x == 2);
        p3[i] = p3[i - 1] + (x == 3);
    }
}

void Solve()
{
    while (q--)
    {
        int l, r;
        cin >> l >> r;
        cout << p1[r] - p1[l - 1] << ' ' << p2[r] - p2[l - 1] << ' ' << p3[r] - p3[l - 1] << '\n';
    }
}

int main()
{
    Input();
    Solve();
}