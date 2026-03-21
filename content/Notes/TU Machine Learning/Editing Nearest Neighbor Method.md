---
created: 2025-10-11T10:57
modified: 2025-10-11T16:19
---
Samples in the overlapping region can confuse the algorithms, so just delete them.

How do we know if the samples are in the confusing zone?
- Pre-classification to detect samples in confusing zone using nearest neighbor.
- Then remove misclassified examples.

To see improvement in performance:
$$
P_{1}^E(e) = \frac{P_{1}(e)}{2[1-P_{1}(e)]}
$$
Note that $P_{1}^E$ is the asymptotic error after editing and $P_{1}(e)$ is the error before editing.