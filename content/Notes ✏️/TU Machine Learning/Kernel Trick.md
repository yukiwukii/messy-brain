This is mainly about how we deal with nonlinear classification.

The idea is that we want to do a non-linear transformation $\mathbf{z} = \phi(\mathbf{x})$ such that the nonlinear input space becomes a linearly separable feature space.

Let's say we want to model a 2nd order polynomial (quadratic) decision function, we have to do transformation $X \rightarrow Z$, where $X \subset \mathbb{R}^D$ and $Z \subset \mathbb{R}^{D}$, where $D = \frac{d(d+3)}{2}$. 

We would have to do mapping for three different terms:
1. Linear -> $z^1 = x^1, \dots , z^d = x^d$ (total of $d$ coordinates): to model straight lines
2. Square -> $z^{d+1} = (x^1)^{2}, \dots, (z^d)^{2}$ (total of $d$ coordinates): to model circles / ellipses
3. Cross -> $z^{2d+1} =x^1x^{2}, \dots, z^D$ (total of $\frac{d(d-1)}{2}$ coordinates): to model curves

This is bad because (1) A lot of compute is needed, (2) Dimensionality increasing.

So we have the kernel trick. Following [[Optimal Hyperplane]] solution, we have:
$$
f(\mathbf{x}) = \text{sgn}\left\{ \sum_{i=1}^n \alpha^*y_{i}(\mathbf{x}_{i}\cdot \mathbf{x}) + b^* \right\}
$$
Notice that we are only using the inner-products of the transformed vector. We can just define $\mathbf{x} \rightarrow \phi(\mathbf{x})$ and then $(\phi(x_{i}) \cdot \phi(\mathbf{x}_{j})) = K(\mathbf{x}_{i}, \mathbf{x}_{j})$. In this way, we don't have to store each of the mapping, just take the inner product!
>[!info]- Dual Problem with Kernel Trick
>$$
>\max_{\alpha} Q(\alpha) = \sum_{i=1}^l\alpha_{i} - \frac{1}{2}_{i,j =1}^l \alpha_{i}\alpha_{j}y_{i}y_{j}K(\mathbf{x}_{i}, \mathbf{x}_{j})
>$$

We transform the decision function into:
$$
f(\mathbf{x}) = \text{sgn}\left\{ \sum_{i=1}^l \alpha^*_{i}y_{i}K(\mathbf{x}_{i}, \mathbf{x}) + b^* \right\}
$$
To determine whether the Kernel $K$ is a proper kernel, we have to fulfill the [[Mercer Theorem]]. And Here is a list of [[Commonly Used Kernels]].


