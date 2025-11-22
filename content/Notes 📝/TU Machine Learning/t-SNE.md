This is developed since PCA cannot handle non-linear data.
The logic is that we want to create probability of the high-dimensional data, and then find the most similar probability for the low-dimensional data.

1. Model the neighborhood of the high dimensional data as distribution
	- We use t-distribution here (that's where the t in t-SNE comes from)
	$$
	p_{j|i} = \frac{\exp(-\begin{Vmatrix}
	x_{i}-x_{j}
	\end{Vmatrix}^2/2\sigma_{i}^2)}{\sum_{k \neq i}\exp(-\begin{Vmatrix}
	x_{i}-x_{k}
	\end{Vmatrix}^2/2\sigma_{i}^2)}
	$$
	- The value of $\sigma_{i}$ is chosen by hand
	- The value of $k$ is the number of local neighbor to care about, or the **perplexity**
2. Model the neighborhood of the low dimensional data as distribution
$$
q_{j|i} = \frac{\exp(-\begin{Vmatrix}
y_{i}-y_{j}
\end{Vmatrix}^2)}{\sum_{k\neq i}\exp(-\begin{Vmatrix}
y_{i} - y_{k}
\end{Vmatrix}^2)}
$$
3. Find the cost function, which is the KL-divergence
$$
\text{KL-Div} = \sum_{j}p_{j|i}\log \frac{p_{j|i}}{q_{j|i}}
$$
4. Gradient dexcent to find the distribution of low dimensional data