---
created: 2025-10-14T16:14
modified: 2025-10-15T18:37
---
 At the saddle point, the following equalities hold:
## Primal feasibility
Inside the room.
$$
\begin{align}
&\min \Phi(\mathbf{w}) = \frac{1}{2}(\mathbf{w}\cdot \mathbf{w}) \quad \text{w.r.t } \mathbf{w},  \\
&\text{ s.t. } y_{i}[(\mathbf{x}_{i} \cdot \mathbf{w})+b] \geq 1, \quad i=1,2,\dots,l 
\end{align}
$$
## Dual room
Nonnegative wall forces $\alpha_{i}\geq 0$.
$$
\begin{align}
&\max_{\boldsymbol{\alpha}} W(\boldsymbol{\alpha}) = \sum_{i=1}^l\alpha_{i} - \frac{1}{2}\sum_{i,j}^l \alpha_{i}\alpha_{j}y_{i}y_{j} (\mathbf{x}_{i} \cdot \mathbf{x}_{j}) \\
&\text{s.t. } \alpha_{i} \geq 0, \quad i=1,\dots,l \\
&\text{and }\sum_{i=1}^l \alpha_{i}y_{i}=0
\end{align}
$$
## Stationary
Forces balance.
$$
\mathbf{w}= \sum_{i}\alpha_{i}y_{i}x_{i}, \quad \sum_{i}\alpha_{i}y_{i} = 0
$$
## Complementary slackness 
Only touching walls push.
$$
\alpha_{i}^0 \begin{Bmatrix}
[\mathbf{x}_{i} \cdot \mathbf{w}_{0} + b_{0}] \ y_{i}-1
\end{Bmatrix} =0, \quad i=1,\dots,l
$$
Since $y_{i}[(\mathbf{x}_{i}\cdot \mathbf{w})] \geq 1$, we have $\alpha_{i} \neq 0$ only for cases where $y_{i}[(\mathbf{x}_{i}\cdot \mathbf{w}) +b] = 1$, which are the support vectors.