  #include <bits/stdc++.h>
  using namespace std;

  int n, m;
  int h[505][505];
  int memo[505][505];
  int dx[] = {0,0,1,-1};
  int dy[] = {1,-1,0,0};

  int dfs(int r, int c) {
      if (memo[r][c] != 0) return memo[r][c];

      memo[r][c] = 1;
      for (int k = 0; k < 4; k++) {
        int nr = r + dx[k];
        int nc = c + dy[k];
        if (nr>=0&&nr<n&&nc>=0&&nc<m&&h[nr][nc]<=h[r][c]) {
            memo[r][c] = max(memo[r][c], 1+dfs(nr,nc));
        }
      }
      return memo[r][c];
  }

  int main() {
      cin >> n >> m;
      for (int c1 = 0; c1 < n; c1++)
          for (int c2 = 0; c2 < m; c2++)
              cin >> h[c1][c2];

      int ans = 0;
      for (int c1 = 0; c1 < n; c1++)
          for (int c2 = 0; c2 < m; c2++)
              ans = max(ans, dfs(c1, c2));

      cout << ans << "\n";
      return 0;
  }