---
title: Stress Testing Factual Consistency Metrics for Long-Document Summarization
authors: Zain Muhammad Mujahid, Dustin Wright, Isabelle Augenstein
year: 2025
url: http://arxiv.org/abs/2511.07689
doi: 10.48550/arXiv.2511.07689
created: 2026-03-17T11:27
modified: 2026-03-20T11:57
---
#### (2025) - Zain Muhammad Mujahid, Dustin Wright, Isabelle Augenstein

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