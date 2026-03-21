---
title: "OffsetBias: Leveraging Debiased Data for Tuning Evaluators"
authors: Junsoo Park, Seungyeon Jwa, Ren Meiying, Daeyoung Kim, Sanghyuk Choi
year: 2024
created: 2026-02-08T16:57
modified: 2026-02-08T17:26
---
TLDR; Created a benchmark for biases, and then dataset that can make LLM more robust against biases. The dataset is called OffsetBias. It is a collection of counter-examples to biases. It contains an instruction $I$, then two responses: good, $R_{g}$ and bad, $R_{b}$. They must be challenging, so $R_{b}$ must have better qualities than $R_{g}$.

Biases they checked:
1. Verbosity bias
2. Concreteness bias -- which is similar to authority bias, but also include examples where judge models favor more complex answers
3. Empty reference bias -- the judge favors hallucinated instructions
4. Content continuation bias -- the judge favors one that continues the instruction
5. Familiar knowledge bias -- favoring well-known facts rather than following the instruction

Their methodology:
- They have two types of producing $R_{b}$: (1) Off-topic response method, and (2) Errorneous Response method.
	1. Off topic response method --> create a different instruction, $I'$, and then make a weaker model produce an answer to the original instruction $I$, and a stronger model to produce an answer to $I'$.
	2. Create wrong answer based on specific errors -- this is the same as the Can You Trick The Grader paper.
- Then they used some fancy weight merging method instead of normal fine-tuning.

Comments: Lowkey unsure about what is the point of this paper, other than giving me more bias examples.
