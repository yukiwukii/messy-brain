---
created: 2025-10-15T19:24
modified: 2026-03-22T16:04
---
## For Multiclass Classification
Decision function:
$$
f(\mathbf{x}) = \text{sgn} \left( \sum_{i=1}^l\alpha_{i}^*y_{i}K(\mathbf{x}_{i}, \mathbf{x}) + b^\ast \right)
$$
The standard SVM only separate 2 classes. So we have 2 strategies to deal with multiclass classification:
- One-vs-All (OvA)
	- Train one binary classifier per class. Either in that class or out of that class.
	- Pick the classifier that gives the highest score.
	- But this may lead to overlapping regions and the negative class being very unbalanced.
- Multicategory SVM
	- Actually quite confusing, but basically instead of $y_{i} = \{-1, +1\}$ we have class codes. $K$ refers to the number of classes.
$$
y_{ij} = \begin{cases}
1, \quad \text{if sample $i$ belongs to class $j$}\\
-\frac{1}{K-1} \quad \text{otherwise}.
\end{cases}
$$
	- Then we set the objective function as
$$
\frac{1}{n} \sum_{i=1}^nL(\mathbf{y}_{i}) \cdot (\mathbf{f}(x_{i}) - y_{i})_{+} + \frac{\lambda}{2} \sum_{j=1}^K \Vert h_{j} \Vert^2_{\mathcal{H}_{K}}
$$
		where $\mathbf{f}(x_{i}) = (f_{1}(x_{i}), \dots, f_{K}(x_{i}))$ is the predicted score vector for sample $i$, $y_{i}$ is the target class code for sample $i$, and $(\mathbf{f}(x_{i}) -y_{i})_{+}$ refers to the hinge penalty – how far the prediction is for the target. Note that $(a)_{+} = \max{(0, a)}$. Basically, this means that you only penalize when misclassified.

		Next, you have some regularization term $\Vert h_{j}\Vert^2_{\mathcal{H}_{K}}$ and the hyperparameter cost $L$.
## For Regression
Here is the function you want to minimize:
$$
\max W(\alpha, \alpha^*) = \varepsilon \sum_{i=1}^l (\alpha_{i}^*, \alpha_{i}) + \sum_{i=1}^ly_{i}(\alpha_{i}^* - \alpha_{i}) - \frac{1}{2} \sum_{i,j = 1}^l (\alpha^*_{i} - \alpha_{i})(\alpha_{j}^* -\alpha_{j}) K(\mathbf{x}_{i}, \mathbf{x}_{j})
$$
- There is an addition of $\varepsilon$ which is a part of $\varepsilon$-insensitive loss function – basically to take into account some error.