Following [[Optimal Hyperplane]], we have generalized optimal hyperplane that deals with non-separable cases.

Actually, we just need to add a slack / error variable $\xi_{i}\geq 0$ to relax the constraint:
$$
y_{i} ((\mathbf{w}\cdot \mathbf{x}_{i})+b) \geq 1 - \xi_{i}, \quad i=1,2,\dots,l
$$
We then define a function $F_{\sigma}(\xi) = \sum_{i=1}^l\xi_{i}^\sigma \quad \sigma >0$ , which reflects how much of the original constraints are violated.

>[!info] Generalized Optimal Hyperplane
>$$
>\begin{align}
>&\min \Phi(\mathbf{w}, \boldsymbol{\xi}) = \frac{1}{2}(\mathbf{w}\cdot \mathbf{w}) + C\left( \sum_{i=1}^l \xi_{i} \right) \quad \text{w.r.t } \mathbf{w} \\
> &\text{s.t. } y_{i}((\mathbf{w} \cdot \mathbf{x}_{i}) + b) \geq 1-\xi_{i}, \quad i=1,2,\dots,l
\end{align}
>$$
>Where parameter $C$ controls the penalty on errors.

I am kinda too tired to derive everything like we did in [[Optimal Hyperplane]], but we need to use [[Kuhn Tucker theorem]] as well, but with the error term $\xi_{i}$.

Here are the revised theorem:

>[!note]- Primal Problem
>$$
>\begin{align}
>&\min \psi(\mathbf{w}, \boldsymbol{\xi}) = \frac{1}{2}(\mathbf{w}\cdot \mathbf{w}) + C\left( \sum_{i=1}^n \xi_{i} \right) \\
>&\text{s.t. } y_{i}[(\mathbf{w}\cdot \mathbf{x}_{i})+b] -1 + \xi_{i} \geq 0, \quad \xi_{i} \geq 0, \quad i=1,..,l
\end{align}
>$$

>[!note]- Dual Problem
>$$
>\max_{\alpha} W(\alpha) = \sum_{i=1}^l \alpha_{i} - \frac{1}{2} \sum_{i,j=1}^l \alpha_{i}\alpha_{j}y_{i}y_{j}(\mathbf{x}_{i}\cdot \mathbf{x}_{j})
>$$
>s.t. $\sum_{i=1}^ly_{i}\alpha_{i} = 0,$ and $0 \leq \alpha_{i} \leq C, \quad i=1,\dots,l$

The decision function solution:
$$
f(\mathbf{x})= \text{sgn}\left( \sum_{i=1}^n \alpha^*y_{i}(\mathbf{x}_{i}\cdot \mathbf{x})+b^*\right)
$$