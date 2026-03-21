---
created: 2026-03-03T09:10
modified: 2026-03-20T11:40
---
#done
[[How does the training process of judge model affect their judgement?]]

- [x] Running `big-qwen-base`. Still dealing with some multi-GPU and VLLM issues. ✅ 2026-03-05
- [ ] Running `thinking-qwen-base`. Maybe thinking models solve positional bias?

## Results
- No, it is still really bad. Using 30B model, the positional bias is 24.60%
- Maybe it would be better if we use thinking models...