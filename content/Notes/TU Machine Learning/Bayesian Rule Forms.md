---
created: 2025-10-26T06:33
modified: 2025-10-26T06:40
---
1. If $P(\omega_{i}|\mathbf{x}) = \max_{j}P(\omega_{j}|x)$, then $\mathbf{x} \in \omega_{i}$
2. If $p(\mathbf{x}|\omega_{i})P(\omega_{i}) = \max_{j}p(\mathbf{x}|\omega_{j})P(\omega_{j})$, then $x \in \omega_{i}$
3. If $l(\mathbf{x})=\frac{p(\mathbf{x}|\omega_{1})}{p(\mathbf{x}|\omega_{2})} > \frac{P(\omega_{2})}{{P(\omega_{1})}}$, then $\mathbf{x} \in \omega_{1}$, and vice versa.
4. Let $h(\mathbf{x}) = -\ln[l(x)]= -\ln p(\mathbf{x}|\omega_{1}) + \ln p(\mathbf{x}|\omega_{2})$.
	- If $h(\mathbf{x}) < \ln\left( \frac{p(\omega_{1})}{p(\omega_{2})} \right)$, then $\mathbf{x} \in \omega_{1}$, and vice versa.
We call $l(\mathbf{x})$ as the likelihood ratio, and $h(\mathbf{x})$ as the log-likelihood ratio.