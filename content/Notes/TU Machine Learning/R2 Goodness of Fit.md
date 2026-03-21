---
created: 2025-09-29T05:26
modified: 2025-09-29T05:33
---
Also called the coefficient of determination.
$$
R^2 = 1 - \frac{\sum_{i=1}^N(y_i -\hat{y}_i)^2}{\sum_{i=1}^N(y_i -\bar{y})^2}
$$
Note that $0 \leq R^2\leq 1$,
$R^2 = 1$ : Perfect regression.
$ R^2=0$ : Baseline model. Predictions are the averge.

You can think of it as the "% of dependent variable variations that the linear model explains".

Note that $R^2$ does not indicate whether the linear regression model is "good enough". To see this, you must evaluate the statistical significance of each coefficient.