---
created: 2025-11-04T09:22
modified: 2025-11-04T09:28
---
Remember that Naive Bayes only work when the features are uncorrelated to each other. 
We can use PCA to derive a new set of variables that are:
1. Linear combinations of the original variables
2. Are uncorrelated
3. Are in a decreasing order of importance

## Setting
Let $x_{1}, \dots, x_{p}$ be the original variables and $z_{i},i=1,\dots ,p$ be the linear combinations of these variables
$$
z_{i} = \sum_{j=1}^pa_{ij}x_{j}, \quad \text{or } \mathbf{z} = A^T\mathbf{x}
$$
We want to find the *orthogonal transformation* $A$ yielding new variables $z_{i}$ that have stationary values of their variances. The point is that you want to project into a new direction where **the variance is the largest**.

## Solution
There are two interesting points in the derivation of PCA
1. The direction where the variance is the largest is an eigenvector.
2. The eigenvalue of the eigenvector is the variance.
As, such, we can find all the eigenvectors, and then sort them based on their eigenvalue, to see which direction we can use in our new dimension.