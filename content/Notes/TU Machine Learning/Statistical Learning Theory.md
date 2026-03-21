---
created: 2025-10-16T11:14
modified: 2025-10-16T12:24
---
Instead of 100% trusting in the training loss as a metric for model performance, we want to a theoretically rigorous way to ensure learning happens.

Learning is defined as finding a *function* that maps inputs $x$ to outputs $y$. The function is $f(x, \alpha)$, where $\alpha$ is the model parameter.

Some important terms:
1. **Loss Function** $L(y, f(x, \alpha))$: measures how wrong your prediction is.
	- The value $L$ is the penalty of predicting $f(x, \alpha)$ instead of $y$. 
2. **Risk Functional** $R(\alpha)$: measures the expected loss over the entire data distribution $F(x,y)$.
	$$
	R(\alpha)= \int L(y, f(x, \alpha)) dF(x,y)
	$$
	- Note that the value $R(\alpha)$ is the objective function to minimize.

So, we want to find the best function $f(x,\alpha_{0})$ that minimize the expected loss
$$
\alpha_{0} = \arg\min_{\alpha\in \Lambda} R(\alpha)
$$
Basically, we want to search $\alpha$ across all the possible search space $\Lambda$. But we can't do this since we don't know the true distribution $F(x,y)$. So we have to approximate it with empirical risk $R_{emp}$.
$$
R_{emp}(\alpha) = \frac{1}{l}\sum_{i=1}^l L(y_{i}, f(x_{i}, \alpha))
$$
We will then minimize $R_{emp}$. This is called **empirical risk minimization** (EMR).

Furthermore, we have the upper bound of $R_{emp}$ from Vapnik-Chervonenkis inequality.
$$
R(\alpha) \leq R_{emp}(\alpha) + \Phi\left( \frac{h}{l} \right)
$$
where $\Phi(\cdot)$ is a monotonic function and we can expand it to
$$
\Phi\left( \frac{h}{l} \right) = \sqrt{ \frac{ h\left( \ln\left( \frac{2l}{h} \right)+1 \right)-\ln\left( \frac{\eta}{4}  \right)}{l} }
$$
So now, we need to minimize both $R_{emp}$ and $\Phi$.