**Relationship between Context Utilization and Reasoning in LLMs**

**Introduction**  
Recently, large language models (LLMs) increasingly rely on external contexts, such as retrieved documents, chains of thought, or user-provided arguments, to answer questions and solve reasoning tasks. Yet how different styles of arguments (deductive, inductive, analogical, abductive, etc) affect an LLM’s use of that context remains underexplored. In the same vein, there are multiple debates on which argument style an LLM uses when answering queries [\[1\], \[2\], \[3\]](https://www.zotero.org/google-docs/?bmYFiZ). Combining both ideas, we ask: does the argument style that is most utilized by an LLM also yield its strongest reasoning performance?

To answer this, we plan to:
1. Benchmark four argument styles (deductive, inductive, analogical, and abductive) in aligned, contradictory, and controversial scenarios using an open-ended question dataset.  
2. Measure for each example: (a) context utilization via ACU, and (b) reasoning quality via chain-of-thought coherence on its reasoning.  
3. Probe open-sourced models (LLaMA, Qwen, Mistral) with interpretability tools to identify whether the same neural circuits govern both context utilization and reasoning.

Our goal is to bridge the gap between context utilization and reasoning; informing prompt design and general understanding on LLM behavior.

**Relevant Literatures**  
We pinpoint three literature works most relevant to this research:

1. Context Utilization Score: Hagström et al. proposed the Accumulated Context Utilization (ACU) score to quantify how strongly an LLM prediction shift in favor of context-supported answers. This scoring system enables comparison of context influence irregardless of tasks or models [\[4\]](https://www.zotero.org/google-docs/?nY8wYL).
2. Persuasive Evidence: Wan et al. published CONFLICTINGQA, which demonstrates LLMs often over-rely on directly relevant evidence and neglect human-valued stylistic cues such as neutrality and scientific tones. However, the different methods on how the argument is presented is not studied [\[5\]](https://www.zotero.org/google-docs/?7nbpfs).
3. Interpretability: Ortu et al. introduced the concept of “competition of mechanism”, tracing factual recall from parametric knowledge versus counterfactual redefinition in the context, via logit inspection and attention modification. They locate distinct transformer components responsible for each mechanism, determining which circuit govern context utilization [\[6\]](https://www.zotero.org/google-docs/?b1NjHC).

**Research Questions & Hypotheses**
1. **RQ1:** To what extent do context utilization (in terms of ACU) and reasoning accuracy co-vary across argument styles?  
	- We hypothesise that higher ACU will correlate with stronger reasoning accuracy and coherence.  

2. **RQ2:** Does the ACU-reasoning relationship differ by style (deductive, inductive, analogical, and abductive)?  
	- We hypothesise that deductive will show tighter ACU-accuracy coupling, as this is the main way LLM reason in. 

3. **RQ3:** Is the same mechanism responsible for both context uptake and reasoning steps?  
	- Attention heads and neurons that drive most ACU shifts will overlap significantly with those critical for reasoning coherence.

**Methodology**  
*Dataset Creation*  
We plan to generate an MCQ benchmark, perhaps repurposing the ones published by Luo et al [\[7\]](https://www.zotero.org/google-docs/?uKcQkR) and Wan et al [\[5\]](https://www.zotero.org/google-docs/?laepkW).  For each argument style, we want to have two variants:

1. Direct questions, with “correct” answers.   
   2. Example: Is it true that smoking results in lung cancer? Correct answer: Yes.  
3. Conflicting questions with no consensus.  
   4. Example: Does aspartame cause cancer? There are arguments for and against this question.

While the direct question will test the model’s parametric knowledge, conflicting questions will examine how the model performs without parametric knowledge interference. For each of the questions, we ask the LLM to generate a reasoning trace based on each argument style. Then, we feed the reasoning trace back, to determine whether the LLM is persuaded by the generated argument. We measure the reasoning coherence as a proxy of reasoning accuracy, and ACU as a proxy of context utilization.

*Models*  
We are planning to use open-sourced models such as the LLaMA, Mistral, and Qwen family. If budget allows, we will also use proprietary closed-sourced LLMs such as GPT and Claude.

*Mechanistic Probing*  
We will use logit lens tracing to project intermediate residuals to logits to pinpoint layers where context dominates decisions. Then, we also want to identify the top ACU-influencing heads/neurons and ablate them to test the downstream impact on ACU and reasoning coherence. 

**Contribution**
1. Chart correlation between context utilization and reasoning performance across argument styles and models.  
2. Reveal whether the context uptake and reasoning rely on the same shared or distinct mechanism.  
3. Guidelines for prompt engineering and RAG systems for more reliable and trustworthy AI systems.

**References**  
[\[1\]	S. Musker, A. Duchnowski, R. Millière, and E. Pavlick, “LLMs as Models for Analogical Reasoning,” Mar. 18, 2025, *arXiv*: arXiv:2406.13803. doi: 10.48550/arXiv.2406.13803.](https://www.zotero.org/google-docs/?2KKXgd)  
[\[2\]	K. Cheng *et al.*, “Inductive or Deductive? Rethinking the Fundamental Reasoning Abilities of LLMs,” Aug. 07, 2024, *arXiv*: arXiv:2408.00114. doi: 10.48550/arXiv.2408.00114.](https://www.zotero.org/google-docs/?2KKXgd)  
[\[3\]	X. Tang *et al.*, “On the Paradox of Generalizable Logical Reasoning in Large Language Models,” Oct. 2023, Accessed: July 27, 2025\. \[Online\]. Available: https://openreview.net/forum?id=jzvWwv4gMx](https://www.zotero.org/google-docs/?2KKXgd)  
[\[4\]	L. Hagström *et al.*, “A Reality Check on Context Utilisation for Retrieval-Augmented Generation,” Dec. 22, 2024, *arXiv*: arXiv:2412.17031. doi: 10.48550/arXiv.2412.17031.](https://www.zotero.org/google-docs/?2KKXgd)  
[\[5\]	A. Wan, E. Wallace, and D. Klein, “What Evidence Do Language Models Find Convincing?,” Aug. 09, 2024, arXiv:2402.11782. doi: 10.48550/arXiv.2402.11782.](https://www.zotero.org/google-docs/?2KKXgd)   
[\[6\]	F. Ortu, Z. Jin, D. Doimo, M. Sachan, A. Cazzaniga, and B. Schölkopf, “Competition of Mechanisms: Tracing How Language Models Handle Facts and Counterfactuals,” June 06, 2024, *arXiv*: arXiv:2402.11655. doi: 10.48550/arXiv.2402.11655.](https://www.zotero.org/google-docs/?2KKXgd) **[https://arxiv.org/pdf/2402.11782](https://arxiv.org/pdf/2402.11782)**   
[\[7\]	M. Luo *et al.*, “Towards LogiGLUE: A Brief Survey and A Benchmark for Analyzing Logical Reasoning Capabilities of Language Models,” Mar. 31, 2024, *arXiv*: arXiv:2310.00836. doi: 10.48550/arXiv.2310.00836.](https://www.zotero.org/google-docs/?2KKXgd)  **[https://arxiv.org/pdf/2310.00836](https://arxiv.org/pdf/2310.00836)**