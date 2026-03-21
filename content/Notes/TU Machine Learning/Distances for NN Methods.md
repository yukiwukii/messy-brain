---
created: 2025-10-11T08:32
modified: 2025-10-11T08:38
---
## Mikovski Metric
$$
\delta(\mathbf{x}_{k},\mathbf{x}_{l}) = \left[ \sum_{i=1}^d |x_{ki}-k_{li}|^s \right]^{1/s}
$$
## Euclidean Distance
$$
\delta_{E}(\mathbf{x}_{k}, \mathbf{x}_{l}) = [(\mathbf{x}_{k}-\mathbf{x}_{l})^T(\mathbf{x}_{k}-\mathbf{x}_{l})]^{1/2}
$$
## City Block Distance / Manhattan Distance
$$
\delta(\mathbf{x}_{k}, \mathbf{x}_{l}) = \sum_{i=1}^d|x_{ki}-x_{li}|
$$
## Chobychev Distance
$$
\delta(\mathbf{x}_{k}, \mathbf{x}_{l}) = \max_{i}|x_{ki} - x_{li}|
$$
## Squared Distance
$$
\delta(\mathbf{x}_{k}, \mathbf{x}_{l}) = (\mathbf{x}_{k} - \mathbf{x}_{l})^TQ(\mathbf{x}_{k} - \mathbf{x}_{l})
$$
## Nonlinear Distances
$$
\delta(\mathbf{x}_{k}, \mathbf{x}_{l}) = \begin{cases}
H & \text{if $\delta_{E}(\mathbf{x}_{k}, \mathbf{x}_{l}) \geq T$} \\
0 & \text{ if $\delta_{E}(\mathbf{x}_{k}, \mathbf{x}_{l}) < T$}
\end{cases}
$$
