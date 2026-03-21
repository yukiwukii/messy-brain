---
created: 2025-10-11T06:40
modified: 2025-10-11T06:49
---
Instead of finding $\boldsymbol{\alpha}^T\mathbf{y}>0$ for all samples, we find for as many samples as possible.

One method to do this is by introducing an error / bias term. Basically, we change from the cost function of [[Perceptron]]
$$
J_{P}(\boldsymbol{\alpha}) = \sum_{\mathbf{y}_{j}\in\mathcal{Y}^k}(-\boldsymbol{\alpha}^T\mathbf{y}_{j})
$$
to
$$
J_{s}(\boldsymbol{\alpha}) = \sum_{i=1}^N(\boldsymbol{\alpha}^T\mathbf{y}_{i}-b_{i})^2
$$
We then perform differentiation for gradient descent to get
$$
\triangledown J_{s}(\boldsymbol{\alpha})= 2\mathbf{Y}^T(\mathbf{Y}\boldsymbol{\alpha}-\mathbf{b})
$$
and so we update the weights for every example with
$$
\boldsymbol{\alpha}(k+1)=\boldsymbol{\alpha}(k) + \rho_{k}(b_{k}-\boldsymbol{\alpha}(k)^T\mathbf{y}^k)\mathbf{y}^k
$$
This is the [[ADALINE]] / LMS algorithm.