---
created: 2025-10-16T12:48
modified: 2025-10-21T12:53
---
[[Fisher Criterion]] is basically projecting into a 1D line for separability. The solution is 
$$
\mathbf{w}^* = S_{w}^{-1}(\mathbf{m}_{1}-\mathbf{m}_{2})
$$
which we gets from maximizing
$$
\max J_{F}(\mathbf{w}) = \frac{\mathbf{w}^T\mathbf{S}_{b}\mathbf{w}}{\mathbf{w}^T\mathbf{S}_{w}\mathbf{w}}
$$
We can generalize this. If we have separability criteria $J_{1}, J_{2}, J_{3}, J_{4}, J_{5}$, all the criteria can be mazimized by using eigenvectors corresponding to the largest eigenvalues of $S_{w}^{-1}S_{b}$. Hence, the feature extraction matrix
$$
W = [u_{1}, u_{2}, \dots, u_{d}]
$$
contains the top $d$ eigenvectors.

It is a good time to introduce [[Karhunen-Loeve Transform]]
$$
\mathbf{w}* = S_{w}^{-1}(\mathbf{m}_{1}-\mathbf{m}_{2})
$$
$$
\max J_{F}(\mathbf{w}) = (\mathbf{w}^T\mathbf{S}_{b})
$$