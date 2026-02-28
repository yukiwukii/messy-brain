A generalization of [[Nearest-Neighbor Method]].

We have the same setup. Let's say we have a sample set $S_{N} = \begin{Bmatrix}(x_{1},\theta_{1}, \dots,(x_{N},\theta_{N})\end{Bmatrix}$ and $x_{i}$ is the sample while $\theta_{i} = \begin{Bmatrix}1,2,\dots,c\end{Bmatrix}$.

We have the formula
$$
g_{i}(x) = k_{i}
$$
where $k_{i}, \ i = 1,\dots, c$ is the number of samples belonging to $\omega_{i}$ among the $k$ nearest neighbors of $x$.

Note again that $i$ is the class number and $\omega_{i}$ is the class name.

The decision is
$$
\text{If $g_{j}(x) = \max_{i=1,\dots,c}g(x)$ then $x \in \omega_{j}$}
$$
Basically, each neighbor has one voting rights. Whichever has the highest vote, wins.

What's the issue with this method?
- May not work if number of samples, $N$ is small.
- Is still risky if the data is noisy.
	- To help with this, we have [[Editing Nearest Neighbor Method]]
- Huge memory (from storing all the training samples) and computation (from comparing with all samples) required.
	- To help with this, we have [[Branch-Bound Algorithm]] to help with computation and [[Condensed Nearest Neighbor Method]] to help with memory.

In what scenario should we use KNN?
- Dimensionality is not too high -> the higher the dimension, the sparser it is, and the less accurate KNN is.
- Sample size is not too small -> prevent sparsity

How do we choose the best value of $k$?
- Avoid ties in voting.
- Balancing the sample size and complexity (bias-variance trade-off)
	- You sometimes needs to choose between your model being overfitted (low bias high variance) or underfitted (high bias low variance).
	- Bias here means error or misclassification.