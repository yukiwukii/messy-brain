---
created: 2025-10-26T06:59
modified: 2025-10-26T07:44
---
Remember that for classification, we want to find:
$$
P(\omega_{i}|\mathbf{x}) = \frac{P(\mathbf{x}|\omega_{i})P(\omega_{i})}{P(\mathbf{x})}
$$
To classify, we just pick the class with the maximum posterior probability:
$$
\hat{\omega} = \arg\max_{i} P(\omega_{i}|\mathbf{x}) = \arg\max_{i}P(\mathbf{x}|\omega_{i})P(\omega_{i})
$$
The naive assumption assumes all features are conditionally independent given the class.
$$
P(\mathbf{x}|\omega_{i}) = P(x_{1},x_{2},\dots,x_{d}|\omega_{i}) = \prod_{j=1}^d P(x_{j}|\omega_{i})
$$
To make it less naive, we have a smarter [[Bayesian Decision Theory Framework with Costs]].
