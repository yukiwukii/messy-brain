[[STEM Presentation '16 Mar]]
[[Meeting with Isabelle '17 Mar]]
#running

How much it <mark style="background: #FFF3A3A6;">favours</mark> the context -- not how much it uses it.

- [x] Need to run OLMO, 3 steps each, on the DRUID dataset. ✅ 2026-03-10
	- This time, I just want `w_evidence` -- pre-trained, sft, dpo, rlvr
	- Few-shot only.
	- Get this done by Monday.
- [x] Run the same thing on Llama ✅ 2026-03-10
	- Running this slowly -- need to check if I need the chat template for inference
	- Need to probably sanity check the results. Why is gold sources good now? It is not reinforced back then. I am currently running the base model again.
	- We probably need to do proper sampling rather than running for all the rows -- this could be problematic. I hope the results don't really change...
	- Wait, I just realized that we can't say it "reinforce" to follow gold sources... that doesn't make sense. We don't even know if it moves in the direction of the original answer... We can't determine whether it is repulsed or attracted to the message of the evidence.
- [x] See if the training effects are more uniform between the two models when the training data is the same (Tulu). ✅ 2026-03-11
	- Yes! They are definitely more similar than not! The extent can be a bit different -- but the general trend is the same.
- [x] Need to deal with seeing if it is following the evidence or not. ✅ 2026-03-11
	-  Solved by reverting back to the original ACU score -> seeing how much it moves towards the evidence stance.
- [x] Run the middle training in-between biggest delta for Llama and OLMO ✅ 2026-03-16
	- This is looking like SFT; running on 7B might be a bit too much, so I should run it on 1B first for a proof of concept. ✅
	- I need to save checkpoints in between training. ✅
- [ ] Find ways to characterize the post-training.
	- The idea is that we use the same context characteristics, then we control one element at a time to see the difference.
		- This is possibly takes too long. 
	- Or we can do a swaparoo between the same models (need to do SFT 2x) to see if the effects swapped too.
		- Yes, I think we need to do a run with 1B model trained on the newer Dolci dataset to see if it will become more similar to the Olmo3B model.
		- But this does not help with the second hypothesis lmao.
	- [x] Read papers given by Zain and Sarah. ✅ 2026-03-17
		- <mark style="background: #FFF3A3A6;">Sarah's paper is not out yet.</mark>
	- [-] Siddhesh mentioned something about safety, instruct, fine-tuned OLMo models? ❌ 2026-03-17
		- Can't find what he's referring to.
- [x] Run the difference between ACU scores (normal) too ✅ 2026-03-13
	- Running this now.
	- <mark style="background: #FFF3A3A6;">What does it mean that the results don't hold here...?</mark>
	- <mark style="background: #FFF3A3A6;">Haeun said it's okay for it to be different as long as there is a meaningful correlation. What correlation can we find here?
</mark>
- [ ] Work on perplexity counting for Olmo.
- [x] Evaluate each step of SFT ✅ 2026-03-17
	- Measure the accuracy too. Can we stop early?

**Questions**
- The heatmaps being "similar" is very vibe-based. Is there a way to make this more factual?

**Plan**
Monday: presentation, prepare for presentation with Isabelle, run preliminary context characteristics / settle some ideas from the presentation.

Tuesday: Haeun meeting, Isabelle meeting, start on writing the introduction.

Something sus is going on. My SFT-ed model and the huggingface SFT model is different. Need to investigate this further, possibly looking at the huggingface discussion stuff.

## Results
- Training dataset matters; if it is different, then the results will definitely be different.
- I realized my metric measures "stubborness" rather than actual tendency to a certain bias -> that would require the evidence_stance. So, we returned to the original ACU score.
- Size may matter too; albeit to a lesser extent.

**Claim-evidence similarity**
- Jaccard similarity: it is definitely reinforced; especially in supporting evidence ✅ ❓
- Claim-evidence overlap: also more or less reinforced...? the values gets higher ❓Not too sure... for CounterFact support, yes, otherwise, not really. ❓
- Repeats claims: Quite weak; unsure ✅ ✅

**Difficult to understand**
- Flesch reading ease score: Quite weak ✅ ❓ Quite strong signals from ConflictQA during DPO
- Claim length: Kinda weak too. If anything the strong correlation is removed between DPO and instruction fine-tuning. For CounterFact, the claims are too short to make a meaningful observation I fear
	- ✅ It is pretty weak too for OLMo, but it is also kinda positive
	- ✅ Same weak signal as OLMo 7B
- Evidence length: It was initially negative (shorter evidence are preferred), then it gets better afterwards ❌ Too weak ❌ 
- Perplexity: There is an decreasing trend (weak; though). So lower perplexity is preferred. This is familiarity bias indeed ✅ Same trend ✅ 

**Implicit**
- Claim-entity overlap: There is a strong positive correlation for supporting evidence, but negative for refuting evidence. If the evidence supports -> higher overlap is better. But if the evidence refutes -> lower overlap is better... why? Interesting observation here. It doesn't really change across the post-training.
	- ✅ Same trend
	- ✅ Kinda same trend too

**Additional properties**
- Contains "False": This is quite funny since it is a weak positive correlation for refuting evidence, but very low negative correlation for supportive evidence (this is a sign of trusting superficial features... maybe) ✅ Same trend ✅ But gone after Ins.
- Sources: Definitely reinforced; although RL helps quite a bit. ✅ Same trend
- Published after claim: Not sure how they would know this...? Maybe should ask Haeun / investigate later. But this is reinforced too, and not much difference between post-training stages. 
	- ✅ Same trend 
	- ❓Gone after ins. too...
- Fact-check verdict: Need to see what this metric means. ✅ Same trend ✅
- The probabilities: lowkey unsure as hell why these are here. high probs -> low acu (we dk if small values or negative)

## FYIs
- It seems like the greatest delta is between pre-training and SFT. There is not a lot of differences between SFT to RL ngl. 
- They have the checkpoints for RLVR (last step; in between DPO and Ins).
- These have step checkpoints.
	- https://huggingface.co/allenai/Olmo-Hybrid-Instruct-SFT-7B
	- https://huggingface.co/allenai/Olmo-3-7B-Think-SFT
	- But not the non-think Instruct-SFT version
### Tulu Dataset for SFT
- Contains [939k rows](https://huggingface.co/datasets/allenai/tulu-3-sft-olmo-2-mixture) (for 7B models) and [866k rows](https://huggingface.co/datasets/allenai/tulu-3-sft-olmo-2-mixture-0225) (for 1B model)
- Multilingual support, there are a lot of different languages. Maybe we can filter these out?
- There are safety datasets too

## Ideas?
- Why is the acu diff and the confidence score looks so different?
- Random weights? For the baseline.
- Leave SFT, just do DPO.
- Look at the checkpoints, do they learn one thing after another. Does it learn easy things first or harder thigns first? Or abstract things first?
- Factual acquisation. Acquisition of context usage. Learning dynamics.