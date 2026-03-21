---
title: Weight-sparse transformers have interpretable circuits
authors: Leo Gao, Achyuta Rajaram, Jacob Coxon, Soham V Govande, Bowen Baker, Dan Mossing
year:
created: 2025-11-22T12:33
modified: 2025-11-22T12:34
---
- Created a competition of attribution graphs using transformers.
- Trained transformers where the vast majority of the weights are zero -> model is discouraged from distributing concept representations across multiple neurons.
- Hopefully, one neuron = one concept
- But require training from scratch, which is very expensive I suppose -> Check Appendix B.

Isn't this bridge thing not the same as SAE? What is the difference? It is the same. Probably gotta look into how SAE are used, to see the difference.