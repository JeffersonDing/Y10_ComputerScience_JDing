#include <bits/stdc++.h>

using namespace std;

#define FOR(i, a, b) for (int i = a; i < b; i++)
#define F0R(i, a) for (int i = 0; i < a; i++)

int N, K;
vector<int> nums;

void Input()
{
    cin >> N >> K;
    F0R(i, N)
    {
        int n;
        cin >> n, nums.push_back(n);
    }
    sort(nums.begin(), nums.end());
}

void Solve()
{
    for (int R = 0;; ++R)
    {
        int count = 0, index = 0;
        while (count < K && index < N)
        {
            int temp = nums[index] + 2 * R;
            while (nums[index] <= temp && index < N)
                index++;
            count++;
        }
        if (index == N)
        {
            cout << R;
            return;
        }
    }
}
int main()
{
    Input();
    Solve();
}