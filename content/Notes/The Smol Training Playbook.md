---
url: https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook#introduction
created: 2025-12-07T02:56
modified: 2025-12-07T03:23
---
## Training Compass
### The Why
- Before training any model, always check if prompting / fine-tuning does the job well.
- If answer to both of them are no, then train the model strictly under the below categories:
	1. Research -- make the hypothesis as concrete as possible, then think if scaling up increases the chance of success.
	2. Production -- only when your domain is very specific, or your deployment is very restrictive
	3. Strategic open-sourced -- concrete goals with gap in the open-sourced community
### The What
- Next, decide what model type, architecture, etc that you want to train.
- Connect each constraint from your "why" to concrete specifications in your "what".
- Principle of derisking: never change anything unless you've tested that it helps.
	- Ask "Will this help my specific use case" and "Will this optimize my training" before testing any modification.
	- Modify one thing at a time. Track parameter count, modify other hyperparameters to make the model sizes roughly the same.
- Rules of engagement
	- Be paranoid, make sure you can reproduce published results. Inspect the answers yourself.
	- Test every change, no matter how small.
	- Train on enough tokens and use sufficient evaluations. Do not cut corners!
