---
created: 2025-09-29T05:33
modified: 2025-09-29T05:37
---
Consider the linear regression equation:
$$
y_i = w_0 + \mathbf{w}^T\mathbf{x}_i + \epsilon_i = w_0 + \sum_{j=1}^d
w_jx_{ij}+\epsilon_i$$
where the value of $\epsilon$ can be modelled using normal distribution:
$$
\epsilon_i \sim N(0, \sigma^2), \\\ i = 1, \ldots,  N
$$

You can test for the statistical significance of regression coefficient using t-test.
$$
\frac{\hat{w}_j - w_j}{s_{\hat{w}_j}} \sim t_{N-d-1}, \\\  j = 0,\ldots, d
$$
