Building a very good classifier is hard, but building a weak one is easy (just need to be slightly better than pure chance). So, can we combine several weak classifiers to build a better one?

We can perhaps, take the weighted average, and then do activation function?

Let's say we have classifiers $h_{1}(x), \dots, h_{m}(x)$, then the weighted average becomes
$$
H(x) = \alpha_{1}h_{1}(x) + \dots + \alpha_{m}h_{m}(x)
$$
where $\alpha_{j}$ is the voting weight assigned to classifier $h_{j}(\cdot)$. Then the final prediction is $y(x) = \text{sign}H(x)$.

Some ensemble learning examples:
- [[Ada Boost]]
- XGBoost