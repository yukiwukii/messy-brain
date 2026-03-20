#done 

Final Comments: Experiment deprecated because I have been using zero-shot prompts, which performed terribly (presumably because base model cannot understand shit). 
Follow up experiment: [[Showing Preference Changes during IFT]]

<mark style="background: #FFF3A3A6;">I NEED TO FILTER TO ONLY `MODEL = LLAMA` !!!!!!!!!</mark>
- [x] Running `generate-base` to get the token log probs for the base model -> Running on runpod right now. ✅ 2026-03-04
- [x] Checking the difference between instruct and non-instruct ✅ 2026-03-04
- Difference between instruct and non-instruct does not really show correlation with the context characteristics.
	- This means that the context characteristics don't really determine which gets forgotten and reinforced. Hmm.
	- Or at least it does so, very weakly. 
	- I think I am missing something here...  especially on cases where it is a binary value.
	- What does a **-ve correlation** mean? Low acu values (forgotten / switched) -> True. Or rather, True -> forgotten / switched. 
	- I think this is an interesting method to see what is discouraged / encouraged during post-training. Maybe we can use this for biases? To see which biases is encouraged? That might work?
---
- [x] Read the papers Haeun sent ✅ 2026-03-06
- [-] Work on activation patching pipeline
- [x] See how instruct models fare in ACU scores compared to the base model ✅ 2026-03-05
	- Running at the moment as `druid-all`
	- Why the hell is it only 11k samples for the `wo_evidence` version?
- [x] Check the difference between ACU score for instruct and non-instruct ✅ 2026-03-07
	- The difference is only pronounced if we are using the 3-shot version.
	- Things that are reinforced:
		1. Claim-evidence overlap
		2. Evidence length
	- Things that are 'forgotten':
		1. Perplexity
		2. Fact-check source
		3. Gold source
		4. Evidence is published after claim
	- Bad news: Strong correlation in original, but not very strong correlation for instruct (my results)
	- [x] Some fuckery is afoot. Somehow some of the context characteristics, like `memory_conflict` is NaN for some of the datasets. Why? ✅ 2026-03-06
- [x] Need to figure out the observations. ✅ 2026-03-09
	- Look into the key observations from the original paper. Make up some hypothesis.
	- What is the difference between `supports` and `refutes` anyways? Why do we need to split them apart?

## Key Observations
How to understand the difference heatmap:
- It is the difference between spearman correlation of instruct and non-instruct ACU with context characteristics.
- **-ve values** means that the correlation is suppressed after post-training
- **+ve values** means that the correlation is reinforced after post-training

Would be good to double cross-check with directly calculating the difference between instruct and non-instruct -> Way better results with the few-shot compared to zero-shot.

Ohno, the original paper uses pearson and not spearman... Changing everything to pearson.

Interesting observations:
1. Evidence Length is is really being reinforced after the post-training. I can see this on the original method as well, albeit to a lesser extent. Weirdly, this only seen in "refutes" examples.
	- Originally, shorter -> higher context utilization.
	- But after post-training, longer -> context utilization (weak correlation, though)
2. For DRUID, fact-check source, gold source and whether it is published after the claim matters in refuting evidence.
	- Originally, Fact check articles / Gold source / Evidence means higher context utilization (*perhaps they rely on them more? do they have a reference on what is considered as good?*)
	- But after post-training, this relationship does not exist anymore. (maybe the model becomes fairer?)
3. P(False|C) for refutes is always consistently increases.
	- Originally, they are weakly negatively correlated -- meaning as P(False | C) decreases, ACU tends to increase. This is the probability of False without evidence.
	- After post-training, this become a weakly positive correlation.
	- I don't really know how to make of this observation.
	- For supporting evidence, the opposite happened. After post-training, the correlation become more negative. High probability of False -> Lower ACU.
4. P(True|C) for supporting CounterFact, for some reason, becomes really negative.
	- Well, CounterFact is the most synthetic...?
	-  After post-training, high True (context-faithful, w/o the claim), uses the less context. This slighty makes sense -- if the evidence is already supporting, why do you need to use the context for?

Ugggh I think I am confusing myself here. There is a fundamental different between CounterFact and ConflictQA + DRUID. That's why the results are so weird.
- For CounterFact, the claim is always wrong, so P(True|C) should be low due to parametric knowledge. P(False|C) should be high.
- So after given "supporting evidence"; aligned with the contextual knowledge. We expect for "supporting" examples, the P(False|C) to decrease and P(True|C) to increase. We expect the answer to be "True".
- In reality, we observe **-ve correlation** for P(False|C) and **+ve correlation** for P(True|C) in base ver. *Why does high P(False|C) mean lower ACU?* We expect the answer to be "True". So the fact that it has high False probability, it should be repressed -> higher ACU. Maybe they get too confident in the parametric knowledge? Context repulsion? This is even worse in instruct ver. What the helly.
- For P(True|C), it is expected to be -ve since high P(True|C) should lead to lower ACU as the answer is already correct. 
- If we give "refuting evidence" instead, which is aligned with parametric knowledge, we expect the answer to be "False".
- We observe **-ve correlation** for P(False|C) and **+ve correlation** for P(True|C) in base ver. High P(False|C) should use less ACU as the answer is already correct. High P(True|C) should have high ACU, as the answer changes. This makes sense.

<mark style="background: #FFF3A3A6;">I honestly don't really understand these three context characteristics. </mark>They are also not really explored in the paper...

OK so, for CounterFact, the "refuting" evidence is actually the correct answer, but before it is redefined by the the context. Meanwhile, the "supporting" evidence is a reiteration of the wrong context. 

For ConflictQA, the evidence are the factually correct answer, regardless of refute or support. The claim is the one that is differing.

|   Dataset   |                       Claim                       | Refuting Evidence | Supporting Evidence |
| :---------: | :-----------------------------------------------: | :---------------: | :-----------------: |
| CounterFact |                   Wrong context                   |      Factual      |        Wrong        |
| ConflictQA  | When "refute" -> Wrong<br>When "support" -> Right |      Factual      |       Factual       |
|    DRUID    | When "refute" -> Wrong<br>When "support" -> Right |      Factual      |       Factual       |

What is fact-check verdict? 
Run it again on OLMO.
register hook transformer.......?