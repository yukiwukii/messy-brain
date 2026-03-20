---
title: Large Language Models are not Fair Evaluators
authors: Peiyi Wang, Lei Li, Liang Chen, Zefan Cai, Dawei Zhu, Binghuai Lin, Yunbo Cao, Lingpeng Kong, Qi Liu, Tianyu Liu, Zhifang Sui
year: 2024
---
TLDR; a paper focused on position bias -- where the judge favor the first option. Then it talks about some mitigation strategies.

Strategies they talked about:
1. Multiple Evidence Calibration
	- This is highly similar to test-time scaling. Explain the thought process first, then give the score.
2. Balanced Position Calibration
	- Run it twice, and filter to only examples where both runs yield the same answer.
3. Human-in-the-Loop Calibration
	- Based on Balanced Position Diversity Entropy (BPDE) -- the entropy of the evaluation results, across multiple runs.
	- Then, they pick the top 20% of examples with the highest BPDE for human evaluation.
