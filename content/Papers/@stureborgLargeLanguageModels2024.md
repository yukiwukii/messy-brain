---
title: Large Language Models are Inconsistent and Biased Evaluators
authors: Rickard Stureborg, Dimitris Alikaniotis, Yoshi Suhara
year: 2024
---
TLDR; Familiarity bias. Average perplexity decreases as score increases. Round number bias -- assigning some scores more frequently than others. Anchoring effects -- multiple labels are predicted in one output.

Datasets used: SummEval, RoSe.

Mitigations approaches:
1. Low glanurality for distinguishing summaries -> Widen scores to 1 to 10 scale.
2. CoT prompting requires tuning temp -> No CoT and set temp to 0.
3. Removing source documents impact perf -> Keep source even for attributes which don't require it.
4. Multi-attribute labels are highly correlated -> Predict only one attribute per generation.
