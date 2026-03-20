---
title: Justice or Prejudice? Quantifying Biases in LLM-as-a-Judge
authors: Jiayi Ye, Yanbo Wang, Yue Huang, Dongping Chen, Qihui Zhang, Nuno Moniz, Tian Gao, Werner Geyer, Chao Huang, Pin-Yu Chen, Nitesh V. Chawla, Xiangliang Zhang
year: 2024
---
Mostly about bias in LLM judges. Introduced a novel framework to measure biases in LLM judges, called CALM. It tests:
1. Correctness of scientific reasoning
	- Verbosity (favoring longer responses)
	- Fallacy oversight (ignoring logical errors in reasoning)
	- Sentiment (preference for positive and negative expressions) -> This is related to the findings we have regarding ACU
2. Improvement on answer refinement
	- Check if the LLM judge favours the refined answer
3. Alignment with human feedback
	- Assess which answer better aligns with human feedback when provided with two or more answers
	- Positional bias
	- Self-preference (favoring its own generation)

## Metrics
LLM judge is executed twice. First, select the better answer, $y$. Second, two judgement at once:
- Exactly the same as the first one, $y_{\text{rand}}$
- With bias introduced, $\hat{y}$
1. Robustness rate, measuring how much LLM judge decision remain the same before and after introducing the bias
$$
\text{RR}= \frac{1}{|D|}\sum^{|D|}_{i=1}\mathbb{I}(y^i=\hat{y}^i)
$$
2. Consistency rate, measuring how consistent the model's decision when asked to make the same judgement twice
$$
\text{CR} = \frac{1}{|D|}\sum_{i=1}^{|D|}\mathbb{I}(y^i=y^i_{\text{rand}})
$$

## Key Findings
1. Position bias increases with more answer candidates
2. Some models prefer longer answers, others don't
3. There is a self-enhancement bias
4. LLM is distracted by irrelevant content in responses
5. LLM is easily convinced by books and quotes, but not really by urls
6. LLM prefers content without emotional elements (for revision)
7. Some LLMs prefer minority groups
8. CoT improves LLMs evaluation accuracy

## Discussion
- There is a difference between explicit and implicit bias
- Implicit bias is when the model doesn't acknowledge the bias in their reasoning
- Explicit bias is when the model knowingly choose the biased answer