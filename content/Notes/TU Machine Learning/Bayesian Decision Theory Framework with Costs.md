---
created: 2025-10-26T07:44
modified: 2025-10-26T08:00
---
The setup is as follow:
1. Random feature vectors $\mathbf{x}$.
2. State space $\Omega = \{\omega_{1},\omega_{2}, \dots, \omega_{c}\}$, $c$ possible classes.
3. Decision space $\mathcal{A} = \{\alpha_{1},\alpha_{2},\dots\alpha_{k}\}$, where we have $k$ possible decisions.
4. Loss function $\lambda(\alpha_{i}, \omega_{j})$, the cost of deciding $\alpha_{i}$ when the true state is $\omega_{j}$.

The goal is to minimize the expected loss. We define the conditional risk for one sample as:
$$
R(\alpha_{i}, \mathbf{x}) = E[\lambda(\alpha_{i}, \omega_{j})|x] = \sum_{j=1}^c \lambda(\alpha_{i}, \omega_{j})P(\omega_{j}|\mathbf{x})
$$
Now, we need to calculate the overall risk for all the samples.
$$
R(\alpha) = \int R(\alpha(\mathbf{x})|\mathbf{x})p(\mathbf{x})d\mathbf{x}
$$
Note that $\alpha(\mathbf{x})$ here is a decision rule that maps each $\mathbf{x}$ to a decision. Next, to find the optimal decision rule $\alpha^*(\mathbf{x})$,
$$
\alpha^* = \arg\min_{\alpha(\cdot)} R(\alpha) = \arg\min_{\alpha(\cdot)} \int R(\alpha(\mathbf{x})|\mathbf{x})p(\mathbf{x})d\mathbf{x}
$$
This might be hard to calculate, so we minimize the integral by minimizing the integrand at each pooint. This is called Minimal Risk Decision.
$$
\alpha^*(\mathbf{x}) = \arg \min_{i=1,\dots,k} R(\alpha_{i}|\mathbf{x}) \quad \text{for each $\mathbf{x}$}
$$
To calculate $R(\alpha_{i}|\mathbf{x})$, same as the above equation actually.
$$
R(\alpha_{i}|\mathbf{x}) = \sum_{j=1}^c\lambda(\alpha_{i}, \omega_{j})\frac{p(\mathbf{x}|\omega_{j})P(\omega_{j})}{\sum_{i=1}^cp(\mathbf{x}|\omega_{i})P(\omega_{i})}
$$
