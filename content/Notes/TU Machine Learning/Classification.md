---
created: 2025-10-09T06:22
modified: 2025-10-11T06:40
---
Classification is similar to linear regression, insofar we are making a line in a high dimensional space. But instead of using this line to predict, we are using this line to segregate different classes.

The classification equation is
$$
y = \text{sgn}\left( \sum_{i=1}^n w_{i}x_{i} + w_{0} \right) = \text{sgn}(\mathbf{w}^T\mathbf{x}+w_{0})
$$
where if $y=1$ then $\mathbf{x}\in\omega_{1}$ and vice versa.

In this course, we learn to derive the optimal equation using [[Linear Discriminant Analysis]] and [[Fisher Criterion]].

However, both of them only explains how to get the optimal direction of projection (i.e. the value of $\mathbf{w}$), while we still need the value of $w_{0}$.

We have a few option for the value of $w_{0}$, 
1. $w_{0} = -\frac{1}{2}(\tilde{m}_{1}+ \tilde{m}_{2})$
2. $w_{0} = -\tilde{m}$
3. $w_{0}=-\frac{1}{2}( \tilde{m}_{1}+\tilde{m}_{2}) + \frac{1}{N_{1}+N_{2} -2} \ln\frac{P(\omega_{1})}{P(\omega_{2})}$

You have to choose based on (1) Domain situation, (2) Threshold with the ROC curve.

Note that you can't just classify everything and anything -- it depends on whether they are [[Linearly Separable]] or not. Using the [[Normalized Augmented Feature Vector]], we can derive the cost function for a [[Perceptron]] to help with classification.

So what should we do if we have linearly non-separable cases? We have to use models with the least [[Minimum Squared Error]].
