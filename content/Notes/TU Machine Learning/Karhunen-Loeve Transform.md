---
created: 2025-10-16T12:59
modified: 2025-10-16T13:04
---
Intutively, we want to transform the samples into a different coordinate system where the new axes are uncorrelated, and most of the information is concentrated in just a few axes.

Let's say you have a random vector $x \in \mathbb{R}^D$. The covariance matrix of the data is:
$$
\Psi = E[(x-\mu)(x-\mu)^T] = E[x x^T]
$$
The covariance matrix reflects how spread out the data is, and how correlated one dimension with another. 

We have to perform eigen-decomposition $\Psi$ next.
$$
\Psi u_{i} = \lambda_{i}u_{i}
$$
where $u_{i}$ is the eigenvector and $\lambda_{i}$ is the eigenvalue. Next, we project the original data $x$ to new axes:
$$
c_{i} = u_{i}^Tx
$$

Following [[Feature Extraction]], we should only keep the first $d$ coefficient with the largest eigenvalues, to get a compressed representation:
$$
\tilde{x} = \sum_{i=1}^d c_{i}u_{i}
$$
