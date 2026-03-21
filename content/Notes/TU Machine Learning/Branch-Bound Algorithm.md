---
created: 2025-10-11T10:11
modified: 2025-10-11T10:57
---
Reducing calculations by preparation beforehand. 

How it works:
1. Organize samples as subsets in a tree structure
2. Use a few params to represent a subset (node)
3. Compare with nodes instead of all samples
4. Only compare with individual samples at the end nodes

Symbols:
- $\mathcal{X}_{p}$ : sample subset of node $p$
- $N_{p}$: number of samples in $\mathcal{X}_{p}$
- $M_{p}$: sample mean of $\mathcal{X}_{p}$
- $r_{p} = \max_{x_{i} \in \mathcal{X}_{p}}D(x_{i}, M_{p})$: the farhest distance in $\mathcal{X}_{p}$ from its center
- $B$: record on the current nearest distance

In here, our goal is to find a point that is closer than $B$.

Rule 1:
- For new sample $x$ and node $\mathcal{X}_{p}$, if $D(x, M_{p})> B + r_{p}$, then the nearest neighbor of $x$ cannot be in $\mathcal{X}_{p}$.
- In the drawing below, the two circles are mutually exclusive. It is obvious that $x'$ is the closest neighbor.![[Drawing 2025-10-11 16.40.56.excalidraw]]  
Rule 2:
- For new sample $x$ and training sample $x_{i} \in \mathcal{X}_{p}$, if $D(x, M_{p}) > B + D(x_{i}, M_{p})$, then $x_i$ is not the nearest neighbor of $x$.
- Basically, if you subtract the distance between $x$ with $M_{p}$ and $x_{i}$ with $M_{p}$, it is greater than $B$. This means that $x'$ is still the closest neighbor.
