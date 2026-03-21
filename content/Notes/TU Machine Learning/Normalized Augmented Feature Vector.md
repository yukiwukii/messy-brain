---
created: 2025-10-09T09:00
modified: 2025-10-10T04:18
---
Used in [[Classification]], where we want to separate different classes.

Remember that the linear discriminant function is
$$
g(\mathbf{x})=\mathbf{w}^T\mathbf{x}+w_{0}=\boldsymbol{\alpha}^T\mathbf{y}
$$
where
$$
\mathbf{y}=\begin{bmatrix}
1 \\
\mathbf{x}
\end{bmatrix}
$$
and 
$$
\alpha=\begin{bmatrix}
w_{0} \\
\mathbf{w}
\end{bmatrix}
$$
In here, note that:
- $g(\mathbf{x}) > 0$ means that the point lies on the 1st class
- $g(\mathbf{x}) <0$ means that that point lies on the 2nd class

We then have to normalize the function using
$$
\mathbf{y}'_{i}=\begin{cases}
\mathbf{y}_{i}, & \text{if $\mathbf{y}_{i} \in \omega_{1}$} \\
-\mathbf{y}_{i} & \text{if $\mathbf{y}_{i}\in\omega_{2}$}
\end{cases}
$$
then we would have $\alpha^T \mathbf{y}_{i}' > 0$ for $i=1,\dots,N$
We call $\mathbf{y}_{i}$ as the **normalized augmented feature vector**.

It's very hard-coded to binary classification problems.