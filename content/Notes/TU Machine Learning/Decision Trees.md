---
created: 2025-10-21T12:55
modified: 2025-10-21T14:01
---
In trees, we have to decide which feature to split first?

An idea is to use [[Shannon Entropy]].
- High entropy -> High impurity -> Poor classification
- Small entropy -> Low impurity -> Good classification

We can also use [[Information Gain]], where we split based on feature of the highest information gain.

An example of decision tree that deals with continuous value is [[Regression Trees]].

A possible problem with decision tree is overfitting if the tree is too deep. In response, we can do either[[Pruning in Decision Trees | pruning]] or introduce [[Random Forest|democracy]] in decision-making.
