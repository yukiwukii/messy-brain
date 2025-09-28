---
date: 2025-08-04 13:35
tags:
  - "#note"
  - cot
  - "#interp"
---
The paper posits that current AI systems satisfy the externalized reasoning property:

> [!NOTE] Externalized Reasoning Property
> For sufficiently difficult tasks, Transformers must use chain of thought as a form of working memory. By default, humans can understand this chain of thought.

Their reasoning is because LLMs learn a strong "natural language prior" during pre-training.
This This results in them using CoT in a similar manner that humans use natural languages.

Note that this property does not guarantee monitorability: not all of the reasoning is contained within CoT. Additionally, this does not apply to future models.

---
# References
[[@korbakChainThoughtMonitorability]]