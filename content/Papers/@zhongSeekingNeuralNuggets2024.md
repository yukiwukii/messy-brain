---
title: "Seeking Neural Nuggets: Knowledge Transfer in Large Language Models from a Parametric Perspective"
authors: Ming Zhong, Chenxin An, Weizhu Chen, Jiawei Han, Pengcheng He
year: 2024
created: 2026-03-05T12:27
modified: 2026-03-05T14:32
---
TLDR; Knowledge transfer. From a larger model to a smaller model. Uses LoRA and all. Without any teacher's participation.

## Knowledge Extraction
This is the only part where the teacher is being used. Let's say the teacher's parameter is $\Theta_{T} = [\theta_{1}, \dots, \theta_{N_{T}}]$, we can isolate each parameter $i$ by null-ing every other parameters, $\Theta_{T_{i}} = [0, \dots, \theta_{i}, \dots, 0]$.

We then use the Taylor approximation to find out the effect of each parameter in $\Theta_{T}$.
$$
L(\Theta_{T}) - L(\Theta_{T} - \Theta_{T_{i}}) \approx \Theta_{T_{i}}^{\top}\nabla_{\Theta_{T}} L(x_{j})
$$
We call the above approximated change of loss / sensitivity as $S_{i,j}$. Then, rank all the teacher layer by the summed sensitivity (i.e. $S_{T_{l}}= \sum_{\theta_{i}\in\Theta_{T_{l}}}S_{i}$), and select the top $L_{s}$ layers.

Next, we do dimensionality reduction, which is just choosing the contiguous submatrices (according to the student's layer dimension) with the highest cumulative sensitivity. 

## Knowledge Injection
The extracted matrix is decomposed via SVD.
$$
W_{T_{i},\text{extract}} = U_{i}\Sigma_{i}V_{i}^\top
$$
Then, we can approximate the low-rank matrices using the Eckart-Young-Mirsky thm. 
$$
W_{T_{i}, \text{extract}} = U_{i}[:, :r] \Sigma_{i}[:r, :r]V_{i}^\top[:r, :]
$$
We can initialize the row-rank module $B_{i} = U_{i}[:, :r]$ and $A_{i} = V^\top_{i}[:r, :]$.

## Initialization w/ LoRA
Instead of initializing naively, with $W_{i}^* = W_{i} + B_{i}A_{i}$, we do it a bit differently so as to ensure training starts from original pre-trained weights.
$$
W_{i}^* = W_{i} - W_{T_{i}, \text{extract}, r} + B_{i}A_{i}
$$
In essense, we are doing a "warm start" where the training is informed by the teacher's knowledge -- and we are doing this without disrupting the student's pretrained weights.

## Thoughts
Well there is no "interpretability" on what each parameter is doing. This is only very geared towards knowledge distillation and nothing else.