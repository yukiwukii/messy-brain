### Prior Probability
Basically a probability of seeing an outcome -> normal probability.
- $\text{Error} = \min\{P(\omega_{1}), P(\omega_{2})\}$
- Intuition is to make the decision with minimal error probability.
### Posterior Probability
The probability of the cause given the results.
- $\text{Error} = \min\{P(\omega_{1}|x), P(\omega_{2}|x)\}$
- Also minimize the error.
Calculating the posterior $P(\omega_{i}|x)$.
$$
P(\omega_{i}|x) = \frac{p(x, \omega_{i})}{p(x)} = \frac{p(x|\omega_{i})P(\omega_{i})}{p(x)}
$$
