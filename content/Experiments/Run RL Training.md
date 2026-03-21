---
created: 2026-03-08T11:26
modified: 2026-03-15T22:19
---
#running 

- [x] Need to figure out the OOM issues. ✅ 2026-03-09
	- Something is leaking the memory in-between steps. 
		- Trying to fix this with garbage collection on `prime.py` and `ray_trainer.py`. Currently running on `grpo-train-yuki`.
- [x] Look into evaluation harness ✅ 2026-03-15
	- We are using the unbiased low-variance estimator, as per [[@yueDoesReinforcementLearning2025]]
	- I think it is running properly now.
