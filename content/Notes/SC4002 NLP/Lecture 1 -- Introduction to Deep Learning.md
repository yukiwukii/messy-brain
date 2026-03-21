---
created: 2025-11-20T13:31
modified: 2025-11-23T16:34
---
## Linear Regression
Crucial components:
- Input vector: $x = [x_{1}, x_{2},\dots,x_{n}]$
- Weight vector (one per feature): $W = [w_{1}, w_{2},\dots,w_{n}]$
	- Note that the weight vector tells how important each feature are.
- And it outputs a predicted class $\hat{y} \in \{0,1\}$
$$
\hat{y}_{i} = \mathbf{x}_{i}^T\mathbf{w}
$$
- Objective function: minimize the residual sum of squares (RSS)
$$
\begin{align}
J(\theta) &= \arg \min_{\mathbf{w}}\sum_{i=1}^N(y_{i}-\hat{y}_{i})^2 \\
&=\sum_{i=1}^N(y_{i}-\mathbf{x}_{i}^T\mathbf{w})^2 = (\mathbf{y}-\mathbf{X}\mathbf{w})^T(\mathbf{y}-\mathbf{X}\mathbf{w})
\end{align}
$$
TODO: I should look through the derivation of the derivative and try it by hand.

## Logistic Regression (Single Class)
- We do the same as above, but we add a sigmoid function -> $\sigma(z_{i})$
$$
\sigma(z_{i}) = \frac{e^{z_{i}}}{e^{z_{i}} + 1}
$$
- We set the threshold at 0.5
$$
\hat{y} =
\begin{cases}
1 & \text{if } \sigma(\mathbf{w}x + b) > 0.5 \\
0 & \text{otherwise}
\end{cases}
$$
- Objective function: Cross Entropy error function
$$
\mathbf{w}^* = \arg \min_{w} - \sum_{i=1}^N(y_{i}\log \mu_{i} + (1-y_{i})\log(1-\mu_{i}))
$$
## Logistic Regression (Multi-Classs)
- Instead of sigmoid function, we use softmax
$$
\mathcal{P}(y_{i}=c|\mathbf{x}_{i, \mathbf{W}}) = \frac{\exp(\mathbf{w}_{c}^T\mathbf{x}_{i})}{\sum_{c'=1}^C \exp(\mathbf{w}_{c'}^T\mathbf{x}_{i})}
$$
- So our objective function is
$$
\begin{align}
\mathbf{W}^* &= \sum_{i=1}^N \sum_{c=1}^Cy_{ic}\log(\text{softmax}(\mathbf{w}_{c}^T\mathbf{x}_{i}))\\
&= \arg\max_{\mathbf{W}} \sum_{i=1}^N\left[ \left( \sum_{c=1}^C y_{ic}\mathbf{w}_{c}^T\mathbf{x}_{i} \right)-\log\left( \sum_{c'=1}^C\exp(\mathbf{w}_{c'}^T\mathbf{x}_{i}) \right) \right]
\end{align}
$$
## Gradient Descent
1. Batch gradient descent: uses the entire dataset. $\theta \leftarrow \theta - \eta \cdot \triangledown_{\theta} \frac{1}{N}\sum_{i=1}^NJ_{i}$
2. Stochastic gradient descent: uses one data point. $\theta \leftarrow \theta - \eta \cdot \triangledown_{\theta} J_{\pi(i)}$
3. Mini-batch gradient descent combines both. $\theta \leftarrow \eta \cdot \triangledown_{\theta} \frac{1}{S}\sum_{i=b_{1}}^{b_{S}}J_{i}$
## Backpropagation
$$
\frac{ \partial z }{ \partial x } = \sum_{i=1}^n \frac{ \partial z }{ \partial y_{i} } \frac{ \partial y_{i} }{ \partial x }
$$
- Just slowly go back from the last layer
- Remember that the weights are between $a$ and $z$
## Regularization
1. Dropout -- make the model learns a sparse representation, has an ensemble effect
2. L1/2 regularization -- discourages the weights from being too large
$$
\arg \min_{\theta} \text{Loss}(\boldsymbol{\theta}) + \lambda \begin{Vmatrix}
\boldsymbol{\theta}
\end{Vmatrix}_{p}^p
$$
	- where $\lambda$ is the penalty hyperparameter and $p = 2$ or $1$, where
$$
\begin{Vmatrix}
\boldsymbol{\theta}
\end{Vmatrix}_{1} = \sum_{j=1}^d|\theta_{j}|
$$
3. Gradient clipping, we put a threshold on the gradient update. If it is above the threshold, we scale it down.