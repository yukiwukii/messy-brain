---
created: 2025-10-21T14:01
modified: 2025-10-21T14:07
---
Bootstrapping method to introduce democracy in decision making.

General steps:
1. Generate multiple trees by bootstrapping the samples.
	- choosing $N$ times with replacement from all $N$ available training cases.
2. For each node of the tree, randomly choose $m$ variables on which t base that decision at that node.
	- You only consider these $m$ nodes to do the splitting, and ignore the rest of the nodes.
3. The final classifier outputs the class that is most agreed by the individual trees -> voting!