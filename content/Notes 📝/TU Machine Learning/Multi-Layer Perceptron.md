The main breakthrough here, compared to previous methods is the addition of activation function.

In here, the activation function is the sigmoid function:
$$
f(\alpha) = \frac{1}{1 + e^{-1(\alpha-\theta)}}
$$
Based on the Kolmogorov Theorem,
> [!info] Kolmogorov Theorem
> Any continuous function $g(\mathbf{x})$ defined on the unit hypercube $I^n$ where $I = [0,1]$ and $n\geq 2$ can be represented in the form
> $$
>g(\mathbf{x}) = \sum_{j=1}^{2n+1} \Xi_{j}\left( \sum_{i=1}^d \psi_{ij}(x_{i}) \right)
>$$
>for a properly chosen function $\Xi_{j}$ and $\psi_{ij}$.

As such,
>[!info] Universal Approximation Theorem
> $$
> g_{k}(\mathbf{x}) \equiv y_{k} = f\left( \sum_{j}w_{jk}f\left( \sum_{i}w_{ij}x_{i}+w_{j0} \right)+w_{k0} \right)
>$$
>Which means, MLP is capable of "implementing" any continuous function from input to output, given sufficient number of hidden units, proper activation function and weights.

## Definition of MLP
The model:
$$
g(\mathbf{x})=f\left( \sum_{j} w_{jk}f\left( \sum_{i} w_{ij}x_{i}+w_{j_{0}} \right) +w_{k_{0}} \right)
$$
The training data:
$$
\{(\mathbf{x}_{1}, y_{1}), \dots, (\mathbf{x}_{N}, y_{N})\}, \ \mathbf{x}_{j} \in \mathbb{R}^{d+1}, \ y_{j} \in \mathbb{R}
$$
Objective function:
$$
\min E = \frac{1}{2} \sum_{j=1}^N(g(\mathbf{x}_{j})-y_{j})^2
$$
And finally, the learning algorithm:
$$
\mathbf{w}(k+1) = \mathbf{w}(k) - \rho_{k}\triangledown E
$$
Of course, to get $\triangledown E$ we need to differentiate wrt $\mathbf{w}$. In the following equation, $k$ refers to the output layer, while $z$ refers to the value before activation function and $a$ is after.

For the output layer, we have $\delta_{k}$ which is the value of $\frac{ \partial E }{ \partial z_{k} }$. We assume $f(x)$ is sigmoid.
$$
\delta_{k} = (a_{k} - y_{k})\cdot f'(z_{k}) = (a_{k} - y_{k})a_{k}(1-a_{k})
$$
For the hidden layers, we have
$$
\begin{align}
\delta_{j} &= \frac{ \partial L }{ \partial z_{j} }  \\
&=\sum_{k}\frac{ \partial L }{ \partial z_{k} } \frac{ \partial z_{k} }{ \partial a_{j} } \frac{ \partial a_{j} }{ \partial z_{j} } \\
&=\sum_{k} \delta_{k}w_{kj}f'(z_{j}) \\
&=f'(z_{j}) \sum_{k}w_{kj}\delta_{k}  \\
&=a_{j}(1-a_{j}) \sum_{k}w_{kj}\delta_{k}   
\end{align}
$$
Note that in multi-class classification setting, we usually use cross-entropy loss as the objective function instead.
$$
E_{i} = -\sum_{i=1}^Cy_{i}\log(\hat{y}_{i})
$$
where $\hat{y}_{i}$ is the softmax output of the last layer,
$$
\hat{y}_{i} = \frac{e^{z_{i}}}{\sum_{j}e^{z_{j}}}
$$
