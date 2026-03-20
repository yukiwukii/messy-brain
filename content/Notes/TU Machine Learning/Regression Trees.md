Imagine we have two continuous tuple $(x, y)$ where $x, y \in \mathbb{R}$. We have the within-leave variance $S$ of leaf $c$.
$$
S = \sum_{c\in \text{leaves}(T)} \sum_{i \in C} (y_{i}-m_{c})^2
$$
where $m_{c} = \frac{1}{n_{c}}\sum_{i\in C}y_{i}$, the mean $y$ values of leaves in the class.

The basic algorithm is as follows:
1. Start with a single node containing all points. Calculate $m_{c}$ and S.
2. If the points have all the same values for all the independent variables, stop. Otherwise, search over all possible splits and take the one that minimizes $S$. If the value of $\max S$ is $\leq\delta$, or the new node would contain less than $q$ points, then stop. Otherwise take the split to create two new nodes.
3. In each new node, start over with step 1.