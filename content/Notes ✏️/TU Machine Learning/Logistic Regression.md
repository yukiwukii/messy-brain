The model is
$$
h(\mathbf{x})= \theta(\mathbf{w}^T\mathbf{x})
$$
Then the training data is
$$
\begin{Bmatrix}
(\mathbf{x}_{1},y_{1}), \dots, (\mathbf{x}_{N}, y_{N})
\end{Bmatrix},
 \ \mathbf{x}_{j} \in \mathbb{R}^{d+1}, \ y_{j} \in \{-1, 1\}
$$
For objective function,
We get the likelihood of $(\mathbf{x}_{j}, y_{j})$ (trust me):
$$
P(y_{j}|\mathbf{x}_{j}) = \theta(y_{j}\mathbf{w}^T\mathbf{x}_{j})
$$
Then we do maximum likelihood estimation...
$$
L(\mathbf{w}) = \prod_{j=1}^N P(y_{j}|\mathbf{x}_{j}) = \prod_{j=1}^N \theta(y_{j}\mathbf{w}^T\mathbf{x}_{j})
$$
$$
\begin{align}
\min E(\mathbf{w}) &= -\frac{1}{N}\ln(L(\mathbf{w})) = -\frac{1}{N}\ln\left( \prod_{j=1}^N \theta(y_{j}\mathbf{w}^T\mathbf{x}_{j})\right) \\ \\
&= \frac{1}{N}\sum_{j=1}^N \ln\left( \frac{1}{\theta(y_{j}\mathbf{w}^T\mathbf{x}_{j})} \right) = \frac{1}{N}\sum_{j=1}^N\ln(1+e^{-y_{n}\mathbf{w}^T\mathbf{x}_{j}})
\end{align}
$$
Then we differentiate wrt $\mathbf{w}$.
$$
\triangledown E = -\frac{1}{N}\sum_{j=1}^N \frac{y_{j}\mathbf{x}_{j}}{1+ e^{y_{j}\mathbf{w}(k)^T\mathbf{x}_{j}}}
$$
And so, the learning algorithm is
$$
\mathbf{w}(k+1) = \mathbf{w}(k) - \rho_{k}\triangledown E
$$
