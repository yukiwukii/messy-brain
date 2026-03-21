---
created: 2025-10-11T08:08
modified: 2025-10-11T08:41
---
Let's say we have a sample set $S_{N} = \begin{Bmatrix}(x_{1},\theta_{1}, \dots,(x_{N},\theta_{N})\end{Bmatrix}$ and $x_{i}$ is the sample while $\theta_{i} = \begin{Bmatrix}1,2,\dots,c\end{Bmatrix}$.

We want to measure the distance (let's say, using Euclidean distance):
$$
\delta(x_{i}, x_{j}) = \begin{Vmatrix}
x_{i}-x_{j}
\end{Vmatrix}
$$
And so, the nearest neighbor decision is
$$
\text{If $\delta(x, x') = \min_{j=1,\dots,N}\delta(x, x_{j}) \cap \omega(x') = \theta'$ then $\hat{\omega_{1}}(x) = \theta'$}
$$
Note here that $\omega(x)$ is the ground truth class of $x$, while $\hat{\omega}(x)$ is the predicted class of $x$. 

> [!info] Nearest-Neighbor
> We find the nearest value ($x'$) to our target value $x$. Then, we copy whatever is the label of $x'$ to $x$.

Some questions that you may have:
1. [[Distances for NN Methods | What distance to use?]]
2. How many samples should we base it on, data could be too noisy.
