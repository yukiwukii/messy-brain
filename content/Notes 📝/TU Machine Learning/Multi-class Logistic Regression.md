Instead of normal [[Logistic Regression]] which is binary, we want to classify it to multiple classes.

Binary classification:
- Weighted sum -> Logistic function -> Compare with threshold -> Classification.
Multiclass classification:
- Weighted sum -> Compare among peers (Max function) -> Classification.

But max functions don't sum up to 1. We need softmax.
$$
P(y = j|\mathbf{x}) = \frac{e^{\mathbf{w}_{j}x}}{\sum_{k=1}^K e^{\mathbf{w}_{k}x}}, \ j = 1,\dots,K
$$
And the loss function is cross-entropy loss.
$$
\text{Cross entropy loss} = -\frac{1}{N}\sum_{i=1}^N\sum_{j=1}^Ky_{i,j}\log p_{i,j}
$$
Note that $p_{i,j}$ is the output probability of the $i$th sample being in $j$th class, and $y_{i,j}$ is the indicator of the correct class label.