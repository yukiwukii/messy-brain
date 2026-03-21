---
title: "Context-Parametric Inversion: Why Instruction Finetuning Can Worsen Context Reliance"
authors: Sachin Goyal, Christina Baek, J. Zico Kolter, Aditi Raghunathan
year: 2025
created: 2026-03-05T14:31
modified: 2026-03-06T08:52
---
TLDR; work on knowledge conflicts. during instruction fine-tuning (IFT), model follows parametric knowldedge more than contextual knowledge.

## Findings
In specific, during IFT, the **context reliance** increases for a while, then sharply decreases. The authors trace this behavior to the composition of IFT data, which contains 2 types of context-based examples:
1. **Context-critical**: The context provides different information than parametric knowledge. The model must read the context to answer the question.
2. **Non-context-critical**: The context is redundant with parametric knowledge. The model can answer without looking at the context.

Early in the training, context-critical samples dominate the gradient, pushing the model to be more context-reliant. As loss drops, non-context critical examples take over the gradient signal, and the model learns that it can decrease loss by leaning on parametric knowledge instead.

## Methods
First, they fine-tune the models on 3 IFT datasets, for 2 epochs, evaluation is done every 50 steps. 

They measure context-reliance by using **parametric accuracy** and **counterfactual / context accuracy** as a proxy. 