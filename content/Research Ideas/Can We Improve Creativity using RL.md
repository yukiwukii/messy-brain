---
created: 2026-03-08T11:22
modified: 2026-03-15T19:47
---
i.e. fucking around and finding out; RL version.
[[Run RL Training]]
## Idea
Previous work has shown that reasoning models (that went through RL) has lowered Pass@K metrics as compared to base model. This means that reasoning models don't really produce diverse answers [[@yueDoesReinforcementLearning2025]].

This work should look into whether we can RL the diversification as to increase Pass@K, basically? We are trying to do this in the coding domain first.

Experiment setup so far: Reward diversity through RL itself, and see if this is good enough to increase pass@k, at least to the same extent as normal base model (or better).