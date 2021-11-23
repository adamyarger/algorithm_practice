function longestLine(mat) {
  if (!mat.length) return 0;

  const m = mat.length
  const n = mat[0].length;
  const dp = Array(4).fill(null).map(() => Array(m + 1).fill(null).map(() => Array(n + 2).fill(0)))
  let max = 0;

  for (let r = 1; r <= m; r++) {
    for (let c = 1; c <= n; c++) {
      if (!mat[r - 1][c - 1]) continue;

      dp[0][r][c] = dp[0][r][c - 1] + 1; // horizontal
      dp[1][r][c] = dp[1][r - 1][c] + 1; // vertical
      dp[2][r][c] = dp[2][r - 1][c - 1] + 1; // diagonal
      dp[3][r][c] = dp[3][r - 1][c + 1] + 1; // antidiagonal
      max = Math.max(max, dp[0][r][c], dp[1][r][c], dp[2][r][c], dp[3][r][c])
    }
  }
  return max;
}