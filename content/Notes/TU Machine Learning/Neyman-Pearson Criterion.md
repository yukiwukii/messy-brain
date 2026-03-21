---
created: 2025-10-26T08:04
modified: 2025-10-29T04:09
---
I want to minimize the error of one class, but keep the error of the other class fixed.
$$
\min P_{1}(e), \quad \text{s.t.} P_{2}(e) = \epsilon
$$
To do this, we need to use the Langragian
$$
L = P_{1}(e) + \lambda(P_{2}(e) - \varepsilon) = (1-\lambda\varepsilon) + \int_{R_{1}}[\lambda p(x|\omega_{2}) - p(x|\omega_{1})]dx
$$
where $R_{1}$ is the decision region of class $\omega_{1}$. Then we want to set $\triangledown L =0$.

I have no idea what's going on afterwards in solving for $L$. Maybe one day I can revisit this when it is clearer.