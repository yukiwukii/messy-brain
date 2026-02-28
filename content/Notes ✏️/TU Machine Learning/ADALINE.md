Also called the Windrow-Hoff algorithm, it is as follows:
1. Normalize the augmented feature vectors $\mathbf{z}_{j}$ of all the training samples (refer to [[Normalized Augmented Feature Vector]]):
	$$
\mathbf{z}_{i}'= \begin{cases}
\mathbf{z}_{i} & \text{if $\mathbf{z}_{i} \in \omega_{i}$} \\
-\mathbf{z}_{i} & \text{if $\mathbf{z}_{i}\in\omega_{2}$}
\end{cases}
$$
2. Initialization: Set $k=0$ and all initial weights to zero $\boldsymbol{\alpha}(0) = \mathbf{0}$. Set proper target values $b_{i}$ for all samples.
3. Pick up sample $\mathbf{z}_{j}$ from the training set, compute the gradient and update the weight
	$$
\boldsymbol{\alpha}(k+1)=\boldsymbol{\alpha}(k) + \rho_{k}(b_{j}-\alpha(k)^T\mathbf{z}_{j})\mathbf{z}_{j}
$$
4. Let $k = k+1$, and repeat step 3 for all samples until the stopping criterion is met.

There are a few options on how to set the value of $\mathbf{b}$.
1. If we follow [[Linear Discriminant Analysis]], we can 
	$$
	b_{i} = \begin{cases}
	\frac{N}{N_{1}} & \text{if $\mathbf{y}_{i}\in\omega_{1}$} \\
	\frac{N}{N_{2}} & \text{if $\mathbf{y}_{i}\in\omega_{2}$}
	\end{cases}
	$$
	And set $w_{0}=\hat{m}$.

2. Otherwise, we can approximate Bayesian Discriminant instead.$$
b_{i}= 1, \ i = 1, \dots, N
	$$
This is kinda beyond the course, so I am not gonna try to understand what's going on.