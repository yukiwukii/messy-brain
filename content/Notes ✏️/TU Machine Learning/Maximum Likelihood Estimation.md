## Setting of the problem
1. Samples $\mathcal{X}_{i} = 1, \dots, c$ are i.i.d from the density $p(x|\omega_{i})$
2. $p(\mathbf{x}|\omega_{i})$ is of the form $p(\mathbf{x}|\boldsymbol{\theta}_{i})$, in which the parameters $\boldsymbol{\theta}_{i}$ are unknown, deterministic vectors.
We need to estimate $\boldsymbol{\theta}_{i}$ from the given samples.

## Solution
We have the likelihood function,
$$
l(\theta) = p(\mathcal{X}|\boldsymbol{\theta}) = p(\mathbf{x}_{1}, \mathbf{x}_{2},\dots,\mathbf{x}_{N}|\theta) = \prod_{i=1}^Np(\mathbf{x}_{i}|\theta)
$$
Let's simplify this by taking the $\ln$,
$$
H(\theta) = \ln l(\theta)
$$
We can define the optimal $\theta$ as,
$$
\hat{\boldsymbol{\theta}} = \arg\max_{\boldsymbol{\theta}} H(\boldsymbol{\theta})
$$
## Examples
For Gaussian distribution, the ML estimation for mean and variance is
$$
\begin{align}
\hat{\mu}&= \hat{\theta}_{1} = \frac{1}{N}\sum_{k=1}^N x_{k} \\
\hat{\sigma}^2 &= \hat{\theta}_{2} = \frac{1}{N}\sum_{k=1}^N(x_{k} - \hat{\mu})^2
\end{align}
$$
But remember that the value of $\hat{\sigma}$ here is biased. The unbiased variance estimator is,
$$
\hat{\sigma}^2 = \frac{1}{N-1} \sum_{k=1}^N (x_{k}- \hat{\mu})^2
$$
