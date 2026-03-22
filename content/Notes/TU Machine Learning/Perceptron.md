---
created: 2025-10-10T04:22
modified: 2026-03-22T16:05
---
From [[Normalized Augmented Feature Vector]], we get the value $\boldsymbol{\alpha}^T\mathbf{y}_{i}'$ that we want to maximize. Since cost functions are usually things you wanna minimize, we get
$$
J_{P}(\boldsymbol{\alpha}) = \sum_{\mathbf{y}_{j}\in\mathcal{Y}^k}(-\boldsymbol{\alpha}^T\mathbf{y}_{j})
$$
In which we want to find the $\boldsymbol{\alpha}$ that minimizes the above function.

Obviously, we do differentiation wrt $\boldsymbol{\alpha}$.
$$
\nabla J = \frac{ \partial J_{p}(\boldsymbol{\alpha})}{ \partial \boldsymbol{\alpha} } = -\sum_{\mathbf{y}_{j}\in\mathcal{Y}^k} (-\mathbf{y}_{j})
$$
As such, we get $\boldsymbol{\alpha}(k+1) = \boldsymbol{\alpha}(k) + \rho_{k}\sum_{\mathbf{y}_{j}\in\mathcal{Y}^k}\mathbf{y}_{j}$, where $\rho_{k}$ is the learning rate. This is the backprop formula.

In traditional perceptron, we update the learning rate with the variable increment rule:
$$
\rho_{k} = \frac{|\boldsymbol{\alpha}(k)^T\mathbf{y}_{j}|}{\begin{Vmatrix}
\mathbf{y}_{j}
\end{Vmatrix}^2}
$$
> [!info] Perceptron Convergence Theorem
> If training samples are linearly separable, the Perceptron Algorithm will converge to a solution vector in a finite number of updates.
