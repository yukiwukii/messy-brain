---
created: 2025-10-11T11:02
modified: 2025-10-11T16:19
---
We find a few representative samples to reduce storage.
1. Separate $\mathcal{X}^N$ as $\mathcal{X}_{S}$ and $\mathcal{X}_{G}$.
2. Start with only 1 sample in $\mathcal{X}_{S}$ and all others are in $\mathcal{X}_{G}$.
3. Iterate through each sample in $\mathcal{X}_{G}$, if it can be correctly classified with $\mathcal{X}_{S}$ then stay. If not, move to $\mathcal{X}_{G}$.
4. Use only samples in $\mathcal{X}_{S}$ to classify the test set.