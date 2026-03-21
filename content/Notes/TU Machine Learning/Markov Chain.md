---
created: 2025-10-26T06:42
modified: 2025-10-26T06:58
---
1st-order Markov Chain: The time $i$ value depends only on the $i-1$ value.
Transition probability:
$$
a_{st} = P(x_{i} = t|x_{i-1}=s)
$$
Probability of an instance $x$:
$$
P(x) = P(x_{1})\prod_{i=2}^La_{x_{i-1}x_{1}}
$$
To use this, you should make transition probability for all the classes.
$$
S(x) = \log\left( \frac{P(x|+)}{P(x|-)} \right) = \sum_{i=1}^L\frac{\log(a^+_{x_{i-1}, x_{i}})}{\log (a^-_{x_{i-1}, x_{i}})} = \sum_{i=1}^L\beta_{x_{i-1}, x_{i}}
$$
Then,
$$
\text{If } S(x) = \begin{cases}
&\geq \lambda,  \quad \text{then $x\in \omega^+$}\\
&< \lambda, \quad \text{then $x\in \omega^-$}
\end{cases}
$$
In here, $\lambda$ is called the threshold value. Its value highly depends on the circumstances of the problem. It can be based on the cost of misclassification, prior probabilities, or fixed at 0.
