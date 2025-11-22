Problem with word dictionary (like in Word2Vec)
1. Can't deal with unknown words -> UNK. Solution: BPE
2. Identical words have the same vector representation. Solution: BERT
## BERT
- Uses Word Piece (similar to BPE) tokenization
- BERT gives contextualized word representation via multi-layer self-attention
- The result is words-in-context representation
## Transfer Learning
Two types of transfer learning:
1. Transductive (same task, label from the source task)
	- Domain adaptation (different domain)
	- Cross-lingual learning (different languages)
2. Inductive (different task, label from target task)
	- Multi-task learning (tasks learned simultaneously)
	- Sequential transfer learning (tasks learned sequentially)
### Sequential Transfer Learning
- We start with pre-trained embeddings and the fine-tune on specific tasks
- May or may not freeze the embedding -> we can specialize the embedding to the target task and domain
- May or may not have task-specific model (for task-unified models)
## Pre-training
- We used to only use pre-trained word embedding models
- But now almost all of parameters in NLP networks are initialized via pre-training
- This is good in:
	1. Building strong representations of language
	2. Parameter initializations for strong NLP models
	3. Probability distribution over language that we can sample from
### Masked Language Modelling
- Idea: replace some fractions of words in the input with a special [MASK] token; predict these words
- Let $\tilde{x}$ be te masked version of $x$, then we want to learn $p_{\theta}(x|\tilde{x})$
### Causal Langauage Modelling
- Given a sequence of words $\mathbf{x}^{(1)}, \dots, \mathbf{x}^{(t)}$, compute the probability distribution of the next word $\mathbf{x}^{(t+1)}$
$$
P(\mathbf{x}^{(t+1)}|\mathbf{x}^{(t)}, \dots, \mathbf{x}^{(1)})
$$
- where $\mathbf{x}^{(t+1)}$ can be any word in the vocabulary $V = \{ \mathbf{w}_{1}, \dots, \mathbf{w}_{|V|} \}$
## Pre-training Paradigms
### Encoders (BERT)
- We are doing MLM here
- Predict a random 15% of (sub)word tokens
	- Replace input word with [MASK] 80% of the time
	- Replace input word with a random token 10% of the time
	- Leave input word unchanged 10% of the time (but you gotta still predict it)
- To fine-tune on sentence classification, we use the hidden representation of the [CLS] token, then add a sentiment classification head
- For token classification, just add NER head to all of the tokens
- Improvements on BERT
	1. RoBERTa: train BERT for longer and remove next sentence prediction
	2. SpanBERT: masking contiguous span of words makes a harder, more useful pre-training task
- But they don't naturally lead to nice autoregressive generation methods
### Decoders
- We fine-tune them by training a classifier on the last word's hidden state
### Encoder-Decoders
$$
\begin{align}
h_{1},\dots,h_{T} &= \text{Encoder}(w_{1},\dots,w_{T}) \\
h_{T+1}, \dots , h_{2T} &= \text{Decoder}(w_{1},\dots,w_{T},h_{1},\dots,h_{T}) \\
y_{i} &\sim \text{softmax}(Ah_{i}+b), \quad i>T
\end{align}
$$
- The encoder portion benefits from bidirectional context
- The decoder portion is used to train the whole model through language modelling
## Decoding Strategies
### Greedy
- Idea: always selects the next token with highest probability
$$
\hat{y}_{t} = \arg\max_{w \in V} P(y_{t}= w|y_{<t})
$$
- Problem: cannot correct previous mistakes
### Beam search
- Idea: on each step of the decoder, keep track of $k$ most probable partial translations
$$
\begin{align}
\text{score}(y_{1}, \dots , y_{t}) &= \log P_{LM}(y_{1}, \dots, y_{t} |x) \\
&= \sum_{i=1}^t\log P_{LM}(y_{i}|y_{1},\dots , y_{i-1}, x)
\end{align}
$$
- Then we backtrack to get the path with the highest score, divided by the number of words
### Top-k sampling
- Only sample from the top $k$ tokens in the probability distribution
- Increase $k$ yields more diverse, but risky outputs
- Decrease $k$ yields more safe but generic outputs
### Top-p sampling
- Sample from all tokens in top $p$ cumulative probability mass
### Decoding with temperature
- Recall that on timestep $t$, the model applies softmax to create the probability distribution
$$
P_{t}(y_{t} = w) = \frac{\exp(S_{w})}{\sum_{w' \in V}\exp(S_{w'})}
$$
- We can apply a temperature hyperparameter $\tau$ to the softmax to rebalance $P_{t}$
$$
P_{t}(y_{t} = w) = \frac{\exp(S_{w}/\tau)}{\sum_{w' \in V}\exp(S_{w'}/\tau)}
$$
## Evaluation for NLG
- Content overlap metrics provide a good starting point, but not good enough on their own
- Model-based metrics can be more correlated with human judgement, but behavior is non-interpretable
- Human judgements are critical, but humans are inconsistent