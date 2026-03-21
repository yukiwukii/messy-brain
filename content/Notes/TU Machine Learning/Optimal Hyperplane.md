---
created: 2025-10-14T14:54
modified: 2025-10-14T16:47
---
In [[Perceptron]], we learn that there might be multiple solutions. To decide which one is best, we have the optimal hyperplane.

For sample set $(x_{1}, y_{1}), \dots, (x_{l},y_{l}), \quad x\in\mathbb{R}^d, \quad y \in \{+1, -1\}$, that can be separated by a hyperplane $(\mathbf{w}\cdot \mathbf{x})+ b = 0$, the optimal hyperplane is the function $f(\mathbf{x}) = \text{sgn}((\mathbf{w}\cdot \mathbf{x}) + b)$ with maximal margin between the samples of the two classes (basically most distance between the two classes), that separate the two classes without error.

Formalizing this, we want to fix the scale by setting it to 1:
$(\mathbf{w} \cdot \mathbf{x}_{i})+b \geq 1. \quad \text{if }y_{i}=1$
$(\mathbf{w} \cdot \mathbf{x}_{i})+b \leq -1. \quad \text{if }y_{i}=-1$
We can do this because we can just freely absorb a scalar to $\mathbf{w}$ and $\mathbf{x}$.

>[!info] Optimal Hyperplane
>$$
>\begin{aligned}
&\min \Phi(\mathbf{w}) = \frac{1}{2}(\mathbf{w}\cdot \mathbf{w}) \text{ w.r.t }\mathbf{w}, \\ &\text{s.t. } y_{i}(\mathbf{w} \cdot \mathbf{x}_{i})+b \geq 1, \quad \text{if }i=1, 2,\dots,l\\ &\text{for training samples } (y_{1}, \mathbf{x}_{1}),\dots,(y_{l}, \mathbf{x}_{l}), \quad y \in \{-1, 1\}
\end{aligned}
>$$

In plain English, $\Phi(\mathbf{w}) = \frac{1}{2}(\mathbf{w}\cdot \mathbf{w})$ is equivalent to maximizing the margin and $y_{i}(\mathbf{w}\cdot \mathbf{x}_{i})+b \geq 1$ is the requirement that there is no misclassification. 

We have to use Langragian equation to get the solution. This is convex optimization problem. We must find the saddle point.
$$
\begin{align}
&\min_{\mathbf{w},b}\max_{\alpha} L(\mathbf{w}, b, \alpha) = \frac{1}{2}(\mathbf{w} \cdot \mathbf{w}) - \sum_{i=1}^l \alpha_{i}\begin{Bmatrix}
[\mathbf{x}_{i}\cdot \mathbf{w}+ b]\ y_{i} -1
\end{Bmatrix} \\
& \text{where } \alpha_{i}^0 \geq 0, \quad i=1,\dots,l
\end{align}
$$
Differentiating with $\mathbf{w}$ and $b$ gives us:
$$
\begin{align}
&\frac{ \partial L(\mathbf{w}_{0},b_{0},\alpha^0) }{ \partial b } = 0 \quad \Rightarrow \quad \sum_{i=1}^l \alpha_{i}^0 y_{i}= 0 \\
&\frac{ \partial L(\mathbf{w}_{0}, b_{0}, \alpha^0) }{ \partial \mathbf{w} } =0 \quad \Rightarrow \quad \mathbf{w}_{0}=\sum_{i=1}^ly_{i}\alpha_{i}^0\mathbf{x}_{i}
\end{align}
$$
From here, we get 3 observations
1. For optimal hyperplane, $\alpha_{i}^0$ is:
$$
\sum_{i=1}^l\alpha_{i}^0y_{i} = 0, \quad \alpha_{i}^0\geq 0, \quad i=1,\dots,l
$$
2. $\mathbf{w}_{0}$ must be the linear combination of the training samples:
$$
\mathbf{w}_{0} = \sum_{i=1}^ly_{i}\alpha_{i}^0\mathbf{x}_{i}, \quad \alpha_{i}^0 \geq {0}, \quad i=1,\dots,l
$$
3. Only support vectors have non-zero coefficient of $\alpha_{i}^0$ in $\mathbf{w}_{0}$.
	- This is based on the [[Kuhn Tucker theorem]].

> [!info] Optimal Hyperplane (Solution)
>$$
>\mathbf{w}_{0} = \sum_{SVs}y_{i}\alpha_{i}^0\mathbf{x}_{i}, \quad \alpha_{i}^0 \geq 0
>$$
>We sum over $SVs$ only because they are the only non-zeros (3rd observation).

Plugging this back to $\mathbf{w}_{0}^T+b_{0}$, we get the decision function
$$
f(\mathbf{x}) = \text{sign}\left( \sum_{SVs}y_{i}\alpha_{i}^0(\mathbf{x}_{i} \cdot \mathbf{x}) + b_{0} \right)
$$
The threshold $b_{0}$ can be obtained from the support vectors of the two classes. We pick a support vector $x^*(+1)$ from the +1 class and $x^*(-1)$ from the -1 class. 
$$
\begin{align}
&y = +1, \quad \mathbf{w}_{0}^Tx^*(1) +b_{0}=1 \quad \Rightarrow \quad b_{0} = 1 - \mathbf{w}_{0}^T\mathbf{x}^*(1) \\
&y = -1, \quad \mathbf{w}_{0}^Tx^*(-1) + b_{0} = -1 \quad \Rightarrow \quad b_{0}=-1-\mathbf{w}_{0}^T\mathbf{x}^*(-1)
\end{align}
$$
Then we take average (to reduce noise) to find $b_{0}$.
$$
b_{0} = -\frac{1}{2}[(\mathbf{w}_{0}\cdot \mathbf{x}^*(1))+(\mathbf{w}_{0}\cdot \mathbf{x}^*(-1))]
$$
