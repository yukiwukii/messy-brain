---
created: 2025-10-09T05:19
modified: 2025-10-11T07:48
---
This is for classification tasks. We want to know how to best separate features.

Let's say we have two features.
Sample set: $\mathcal{X} = \{\mathcal{x}_1, ..., \mathcal{x}_N\}$
	where, Class 1$(\omega_1): \mathcal{X}_1 = \{\mathcal{x}_1^1, ..., \mathcal{x}_{N_1}^1\}$ and Class 2$(\omega_2): \mathcal{X}_2 = \{\mathcal{x}_1^2, ..., \mathcal{x}_{N_2}^2\}$
	
Projection is
$$
\mathcal{X} \rightarrow \mathcal{Y}: y_i = \mathbf{w}^T\mathbf{x}_i, \ i = 1,..., N
$$
You need to find the value of $\mathbf{w}$ that is best separate the two classes,
where `within class` : as close as possible, and `between class`: as far as possible.

In the $\mathcal{X}$ space,
1. Class mean: $\mathbf{m}_i = \frac{1}{N_i}\sum_{x_j\in\mathcal{X}_i}\mathbf{x}_j \ i=1,2$
2. `within class` scatter matrix: $\mathbf{S}_i = \sum_{x_j \in \mathcal{X_i}} (\mathbf{x}_j - \mathbf{m}_i)(\mathbf{x}_j - \mathbf{m}_i)^T \ i=1,2$
	- Total `within class` scatter matrix: $\mathbf{S}_\mathbf{w} = \mathbf{S_1} + \mathbf{S_2}$
3. `between class` scatter matrix: $\mathbf{S}_b = (\mathbf{m_1} - \mathbf{m_2})(\mathbf{m_1}-\mathbf{m_2})^T$

In the $\mathcal{Y}$ space,
1. Class mean: $\widetilde{m}_i=\frac{1}{N_i}\sum_{y_j\in\mathcal{Y}_i}y_j$
2. `within class` scatter matrix: $\widetilde{S}_i=\sum_{y_j\in\mathcal{Y}_i}(y_j-\widetilde{m}_i)(y_j - \widetilde{m}_i)^T$
	- total `within class` scatter matrix: $\widetilde{S}_w = \widetilde{S}_i + \widetilde{S}_2$
3. `between class` scatter matrix: $\widetilde{S}_b = (\widetilde{m}_1 -\widetilde{m}_2)^2$

