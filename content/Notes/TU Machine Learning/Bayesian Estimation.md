## Setting
1. Samples $\mathcal{X}_{i} = 1,\dots,c$ are i.i.d from density $p(\mathbf{x}|\omega_{i})$
2. $p(\mathbf{x}|\omega_{i})$ is of the form $p(\mathbf{x}|\boldsymbol{\theta}_{i})$ where $\boldsymbol{\theta}_{i}$ are random vectors with prior density of $p(\boldsymbol{\theta}_{i})$
	- Remember that it is different from [[Maximum Likelihood Estimation]] where the $\boldsymbol{\theta}_{i}$ are unknown deterministic vectors.

## Solution
We need to do minimal risk estimation.
**Loss Function of an Estimation**
$$
\lambda(\hat{\boldsymbol{\boldsymbol{\theta}}}, \boldsymbol{\theta}), \quad \text{e.g., }\lambda(\hat{\theta}, \theta) = (\theta - \hat{\theta})^2
$$
**Expected Risk**
$$
\begin{align}
R &= \int_{E^d}\int_{\theta} \lambda(\hat{\boldsymbol{\theta}}, \boldsymbol{\theta})p(\mathbf{x},\boldsymbol{\theta}) d\theta d\mathbf{x} \\
&=\int_{E^d}\int_{\theta}\lambda(\hat{\boldsymbol{\theta}}, \boldsymbol{\theta})p(\boldsymbol{\theta}|\mathbf{x}) p(\mathbf{x}) d\theta d\mathbf{x} \\ \\
&=\int_{E^d} R(\hat{\boldsymbol{\theta}}|\mathbf{x}) p(\mathbf{x})d\mathbf{x}
\end{align}
$$
**Risk conditional on $\mathbf{x}$**
$$
R(\hat{\boldsymbol{\theta}}|\mathbf{x}) = \int_{\theta} \lambda(\hat{\boldsymbol{\theta}}, \boldsymbol{\theta}) p(\boldsymbol{\theta}|\mathbf{x})d\boldsymbol{\theta}
$$
**Empirical Risk on all training data**
$$
R(\hat{\boldsymbol{\theta}}|\mathcal{X}) = \int_{\theta}\lambda(\hat{\boldsymbol{\theta}}, \boldsymbol{\theta})p(\boldsymbol{\theta}|\mathcal{X})d\boldsymbol{\theta}
$$
**Bayesian Estimation**
$$
\hat{\boldsymbol{\theta}} = \arg\min_{\theta} R(\boldsymbol{\theta}|\mathcal{X})
$$
## Example
With the loss function $\lambda(\hat{\theta}, \theta)$, the optimal value of $\theta$ is,
$$
\begin{align}
\hat{\theta} &= E[\theta|\mathbf{x}] = \int_{\theta}\theta p(\theta|\mathbf{x}) d\theta, \quad \text{or} \\ \\
\hat{\theta} &= E[\theta|\mathcal{X}] = \int_{\theta} \theta p(\theta|\mathcal{X})d \theta
\end{align}
$$
But we still don't know what is $p(\theta|\mathbf{x})$ or $p(\theta|\mathcal{X})$.
1. We set the prior $p(\theta)$
2. Write down the joint density (conditional density):
$$
p(\mathcal{X}|\theta) = p(x_{1}, x_{2}, \dots,x_{N}|\theta)= \prod_{i=1}^Np(x_{i}|\theta)
$$
3. Calculate the posterior
$$
p(\theta|\mathcal{X}) = \frac{p(\mathcal{X}|\theta)p(\theta)}{\int_{\theta}p(
\mathcal{X}|\theta
)p(\theta)d\theta}
$$
We do Bayesian Estimation iteratively. When we obtain a new sample,
$$
\begin{align}
p(\mathcal{X}^N|\theta) &= p(x_{N}|\theta)p(\mathcal{X}^{N-1}|\theta) \\ \\
p(\theta|\mathcal{X}^N) &= \frac{p(x_{N}|\theta)p(\theta|\mathcal{X}^{N-1})}{\int_{\theta}p(x_{N}|\theta)p(\theta|\mathcal{X}^{N-1})d\theta}
\end{align}
$$

