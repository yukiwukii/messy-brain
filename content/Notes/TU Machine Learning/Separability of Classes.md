---
created: 2025-10-16T12:32
modified: 2025-10-16T12:39
---
If we want to do feature selection, we can't just do trial and error to find the features that correspond to the lowest error --> too expensive!

So, we have to determine the separability of the features. The more separable they are, the better classification work and therefore higher accuracy. Doing this requires some metrics, and there are a bunch of metrics.

## Metrics based on distributions
To measure the overlapping of two distributions:
$$
J_{p}(\cdot) = \int g[p(\mathbf{x}, \omega_{1}), p(\mathbf{x},\omega_{2}), P_{1}, P_{2}] d\mathbf{x}
$$
$\mathbf{x}$ is the feature vector; $\omega_{1}, \omega_{2}$ are the two classes; $P_{i}$ is the probability of class $\omega_{i}$; and $g[\cdot]$ is the function that computes the overlap between the distributions.

There are many equations, but unnecessary for now.
## Metrics based on information theory
We have Shannon entropy, for feature $x$:
$$
H = -\sum_{i=1}^cP(\omega_{i}|x)\log_{2}P(\omega_{i}|x)
$$
