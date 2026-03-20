---
authors: Zain Muhammad Mujahid, Dustin Wright, Isabelle Augenstein
year: 2025
url: "http://arxiv.org/abs/2511.07689"
doi: "10.48550/arXiv.2511.07689"
---
# Stress Testing Factual Consistency Metrics for Long-Document Summarization
#### (2025) - Zain Muhammad Mujahid, Dustin Wright, Isabelle Augenstein

## Abstract
```
Evaluating the factual consistency of abstractive text summarization remains a significant challenge, particularly for long documents, where conventional metrics struggle with input length limitations and long-range dependencies. In this work, we systematically evaluate the reliability of six widely used reference-free factuality metrics, originally proposed for short-form summarization, in the long-document setting. We probe metric robustness through seven factuality-preserving perturbations applied to summaries, namely paraphrasing, simplification, synonym replacement, logically equivalent negations, vocabulary reduction, compression, and source text insertion, and further analyze their sensitivity to retrieval context and claim information density. Across three long-form benchmark datasets spanning science fiction, legal, and scientific domains, our results reveal that existing short-form metrics produce inconsistent scores for semantically equivalent summaries and exhibit declining reliability for information-dense claims whose content is semantically similar to many parts of the source document. While expanding the retrieval context improves stability in some domains, no metric consistently maintains factual alignment under long-context conditions. Finally, our results highlight concrete directions for improving factuality evaluation, including multi-span reasoning, context-aware calibration, and training on meaning-preserving variations to enhance robustness in long-form summarization. We release all code, perturbed data, and scripts required to reproduce our results at https://github.com/zainmujahid/metricEval-longSum.
```
## Notes
Was recommended this paper as they are doing dataset pertubation, which what I am also interested in doing -- pertubation -> see effects in terms of preference.

Main metric here is factuality score, which is the log-likelihood scores. Figure 2 is the change in factuality score (perturbed minus original). In the figure, there are obvious shifts. **-ve** shift means higher score for pertubed. **+ve** shift means higher original score. 

Pertubations used:
1. Paraphrased -- summary is rewritten with alternate phrasings and syntactic structures
2. Simplified -- where complex or compound constructions are rewritten into shorter, more readable sentences
3. Synonym replaced -- where content words are substituted with close synonyms to test for lexical invariance
4. Less diverse -- summaries that reduce vocabulary variation
5. Negated -- introduce logically equivalent negations to prbe sensititvity to syntactic polarity
6. Summarized -- further compresses the summary for brevity
7. Added source text -- inserts a factual sentence directly from the source

Another finding is that claim that are more general (highly similar to many other claims in the original document) are harder to fact-check.
- Measured by mean pair-wise cosine similarity between each summary sentence and the entire document. 
- Higher cosine sim -> more general

## Thoughts
The pertubation methods should be kept in mind. But running this entire thing in a big SFT dataset seems impossible.