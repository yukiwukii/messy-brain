---
created: 2025-10-12T16:34
modified: 2025-10-12T17:37
---
# Problem 1: Derivation of Fisher Linear Discriminant

## Problem Setup
We are given two classes of data: Class 1 ($\omega_{1}$) with $N_{1}$ samples and Class 2 ($\omega_{2}$) with $N_{2}$ samples. Each data point $x_{i}$ exists in a d-dimensional space, $x_{i}\in \mathbb{R}^d$. Our goal is to find a projection direction $\mathbf{w}\in \mathbb{R}^d$ that best separates the two classes when we project the data onto a one-dimensional space using:
$$y = \mathbf{w}^T\mathbf{x}$$
This projection maps our d-dimensional data to a scalar value $y$.
## Quantities in the Original Space
Before projecting, we define several important quantities in the original d-dimensional space.

The **class means** are: $$\mathbf{m}_1 = \frac{1}{N_1}\sum_{\mathbf{x}_j \in \mathcal{X}_1}\mathbf{x}_j, \quad \mathbf{m}_2 = \frac{1}{N_2}\sum_{\mathbf{x}_j \in \mathcal{X}_2}\mathbf{x}_j$$
The **within-class scatter matrices** measure how spread out the data is within each class: $$\mathbf{S}_1 = \sum_{\mathbf{x}_j \in \mathcal{X}_1}(\mathbf{x}_j - \mathbf{m}_1)(\mathbf{x}_j - \mathbf{m}_1)^T$$$$\mathbf{S}_2 = \sum_{\mathbf{x}_j \in \mathcal{X}_2}(\mathbf{x}_j - \mathbf{m}_2)(\mathbf{x}_j - \mathbf{m}_2)^T$$The **total within-class scatter matrix** combines both classes: $$\mathbf{S}_w = \mathbf{S}_1 + \mathbf{S}_2$$
The **between-class scatter matrix** measures the separation between class means: $$\mathbf{S}_b = (\mathbf{m}_1 - \mathbf{m}_2)(\mathbf{m}_1 - \mathbf{m}_2)^T$$
These are all taken from the lecture notes.
## Quantities in the Projected Space
After projection, we need to express these quantities in terms of the one-dimensional projected values. The **projected class means** are: $$\tilde{m}_i = \frac{1}{N_i}\sum_{y_j \in \mathcal{Y}_i}y_j = \frac{1}{N_i}\sum_{\mathbf{x}_j \in \mathcal{X}_i}\mathbf{w}^T\mathbf{x}_j = \mathbf{w}^T\left(\frac{1}{N_i}\sum_{\mathbf{x}_j \in \mathcal{X}_i}\mathbf{x}_j\right) = \mathbf{w}^T\mathbf{m}_i$$
For the **projected within-class scatter**, we compute: $$\tilde{S}_i = \sum_{y_j \in \mathcal{Y}_i}(y_j - \tilde{m}_i)^2 = \sum_{\mathbf{x}_j \in \mathcal{X}_i}(\mathbf{w}^T\mathbf{x}_j - \mathbf{w}^T\mathbf{m}_i)^2$$
Factoring out $\mathbf{w}^T$: $$\tilde{S}_i = \sum_{\mathbf{x}_j \in \mathcal{X}_i}[\mathbf{w}^T(\mathbf{x}_j - \mathbf{m}_i)]^2 = \sum_{\mathbf{x}_j \in \mathcal{X}_i}\mathbf{w}^T(\mathbf{x}_j - \mathbf{m}_i)(\mathbf{x}_j - \mathbf{m}_i)^T\mathbf{w}$$
Bringing $\mathbf{w}$ outside the summation: $$\tilde{S}_i = \mathbf{w}^T\left[\sum_{\mathbf{x}_j \in \mathcal{X}_i}(\mathbf{x}_j - \mathbf{m}_i)(\mathbf{x}_j - \mathbf{m}_i)^T\right]\mathbf{w} = \mathbf{w}^T\mathbf{S}_i\mathbf{w}$$
The **total projected within-class scatter** is: $$\tilde{S}_w = \tilde{S}_1 + \tilde{S}_2 = \mathbf{w}^T\mathbf{S}_1\mathbf{w} + \mathbf{w}^T\mathbf{S}_2\mathbf{w} = \mathbf{w}^T\mathbf{S}_w\mathbf{w}$$
The **projected between-class scatter** is the squared distance between projected means: $$\begin{align}
\tilde{S}_b &= (\tilde{m}_1 - \tilde{m}_2)^2  \\
&= (\mathbf{w}^T\mathbf{m}_1 - \mathbf{w}^T\mathbf{m}_2)^2  \\
&= [\mathbf{w}^T(\mathbf{m}_1 - \mathbf{m}_2)]^2 \\
&= \mathbf{w}^T(\mathbf{m}_1 - \mathbf{m}_2)(\mathbf{m}_1 - \mathbf{m}_2)^T\mathbf{w}  \\
&= \mathbf{w}^T\mathbf{S}_b\mathbf{w}
\end{align}$$
## Fisher's Criterion
Fisher proposed finding the projection direction that maximizes the ratio of between-class variance to within-class variance: $$J_F(\mathbf{w}) = \frac{\text{between-class variance}}{\text{within-class variance}} = \frac{(\tilde{m}_1 - \tilde{m}_2)^2}{\tilde{S}_1 + \tilde{S}_2} = \frac{\mathbf{w}^T\mathbf{S}_b\mathbf{w}}{\mathbf{w}^T\mathbf{S}_w\mathbf{w}}$$
Of course, we want the between-class variance to be as large as possible (large numerator) and the within-class variance to be as small as possible (small denominator).

An important observation is that $J_{F}(c\mathbf{w})$ is scale-invariant. If we replace $\mathbf{w}$ with $c\mathbf{w}$ for any non-zero constant $c$: $$J_F(c\mathbf{w}) = \frac{(c\mathbf{w})^T\mathbf{S}_b(c\mathbf{w})}{(c\mathbf{w})^T\mathbf{S}_w(c\mathbf{w})} = \frac{c^2\mathbf{w}^T\mathbf{S}_b\mathbf{w}}{c^2\mathbf{w}^T\mathbf{S}_w\mathbf{w}} = J_F(\mathbf{w})$$
Since only the direction of $\mathbf{w}$ matters, not its magnitude, we can fix the denominator to any positive constant c and simply maximize the numerator. This transforms our problem into: $$\max_{\mathbf{w}} \mathbf{w}^T\mathbf{S}_b\mathbf{w} \quad \text{subject to} \quad \mathbf{w}^T\mathbf{S}_w\mathbf{w} = c$$
## Lagrangian Optimization
We solve this constrained optimization problem using Lagrange multipliers. The Lagrangian is[^1]:
$$L(\mathbf{w}, \lambda) = \mathbf{w}^T\mathbf{S}_b\mathbf{w} - \lambda(\mathbf{w}^T\mathbf{S}_w\mathbf{w} - c)$$
Taking the derivative with respect to **w** and setting it to zero: $$\frac{\partial L}{\partial \mathbf{w}} = 2\mathbf{S}_b\mathbf{w} - 2\lambda\mathbf{S}_w\mathbf{w} = \mathbf{0}$$
This simplifies to: $$\mathbf{S}_b\mathbf{w} = \lambda\mathbf{S}_w\mathbf{w}$$
Assuming $\mathbf{S}_{w}$ is invertible, we multiply both sides by $\mathbf{S}_{w}^{-1}$: $$\mathbf{S}_w^{-1}\mathbf{S}_b\mathbf{w} = \lambda\mathbf{w}$$
This is a generalized eigenvalue problem where **w** is an eigenvector of $\mathbf{S}_{w}^{-1}S_{b}$ with eigenvalue $\lambda$.

The between-class scatter matrix has a special structure: $$\mathbf{S}_b = (\mathbf{m}_1 - \mathbf{m}_2)(\mathbf{m}_1 - \mathbf{m}_2)^T$$
This is an outer product, making $\mathbf{S}_{b}$ a rank-1 matrix. When we apply $\mathbf{S}_{b}$ to any vector $\mathbf{w}$: $$\mathbf{S}_b\mathbf{w} = (\mathbf{m}_1 - \mathbf{m}_2)(\mathbf{m}_1 - \mathbf{m}_2)^T\mathbf{w} = (\mathbf{m}_1 - \mathbf{m}_2) \underbrace{[(\mathbf{m}_1 - \mathbf{m}_2)^T\mathbf{w}]}_{\text{scalar } \alpha}$$
The result is always in the direction of $(\mathbf{m}_{1} - \mathbf{m}_{2})$ scaled by $\alpha = (\mathbf{m}_{1}-\mathbf{m}_{2})^T\mathbf{w}$.

Substituting this into our eigenvalue equation: $$\mathbf{S}_w^{-1}[\alpha(\mathbf{m}_1 - \mathbf{m}_2)] = \lambda\mathbf{w}$$ $$\alpha\mathbf{S}_w^{-1}(\mathbf{m}_1 - \mathbf{m}_2) = \lambda\mathbf{w}$$
This shows that **w** is proportional to $\mathbf{S}_{w}^{-1}(\mathbf{m}_{1}-\mathbf{m}_{2})$. Since we only care about the direction of $\mathbf{w}$, we can ignore the constants $\alpha$ and $\lambda$.

As such, the optimal projection direction is: $$\mathbf{w}^* = \mathbf{S}_w^{-1}(\mathbf{m}_1 - \mathbf{m}_2)$$
where:
- $\mathbf{S}_{w} = \mathbf{S}_{1}+ \mathbf{S}_{2}$ is the total *within-class* scatter matrix.
- $\mathbf{m}_{1}, \mathbf{m}_{2}$ are the means of the tw classes.

[^1]: This is shamelessly taken from the lecture notes.