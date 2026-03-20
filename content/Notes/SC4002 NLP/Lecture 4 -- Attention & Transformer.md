- In RNNs, we have a bottleneck in the encoder. 
- This is because the decoder never sees the input text, but only the final vector
- This many-to-one compression results in many lost information
## Attention
Core idea: We use direct connection to encoder to focus on the relevant part of the source sentence
- We have encoder hidden states $h_{1}, \dots , h_{N} \in \mathbb{R}^h$
- On timestep $t$, we have decoder hidden state $s_{t} \in \mathbb{R}^h$
- We get the attention scores $e^t$ for this timestep:
$$
\mathbf{e}^t = [s_{t}^Th_{1},\dots,s_{t}^Th_{N} ] \in \mathbb{R}^N
$$
- We take softmax to get the attention distribution $\alpha^t$ for this step
$$
\alpha^t = \text{softmax}(\mathbf{e}^t)\in \mathbb{R}^N
$$
- We use $\alpha^t$ to take a weighted sum of the encoder hidden states to get the attention output $\mathbf{a}_{t}$
$$
\mathbf{a}_{t} = \sum_{i=1}^N \alpha_{i}^t\mathbf{h}_{i} \in \mathbb{R}^h
$$
- Concatenate the attention output $\mathbf{a}_{t}$ with the decoder hidden state, then compute $\hat{y}_{1}$ as before
$$
\hat{y}_{t} = \text{softmax}(W_{y}\cdot[a_{t};s_{t}]+b_{y})
$$
### Why attention?
1. Attention improves MT performance significantly
2. It solves the bottleneck problem
3. It helps with vanishing gradient problem
4. It provides interpretability in terms of attention patterns

### Attention as QKV computation
- From the above example,
	- The encoder hidden states $h_{1},\dots, h_{N} \in \mathbb{R}^h$ are the keys/values
	- The decoder hidden state $s_{t} \in \mathbb{R}^h$ are is the query
## Self-attention
- Usually attentions are applied between encoder and decoder for seq2seq learning
- For one single sequence only, we have self-attention
- In RNNs, we do things in sequence, which is unparallelizable
- With self-attention, we can parallelize per layer, as all words interact at every layer

Let $\mathbf{w}_{i:n}$ be the sequence of words in vocabulary $V$.
For each $\mathbf{w}_{i}$, let $\mathbf{x}_{i} = E \mathbf{w}_{i}$, where $E \in \mathbb{R}^{d \times |V|}$ is an embedding matrix.
1. Transform each word embedding with weight matrices $Q,K,V$, each in $\mathbb{R}^{d\times d}$
$$
q_{i} = Q\mathbf{x}_{i} \quad k_{i}=K\mathbf{x}_{i} \quad v_{i} = V\mathbf{x}_{i}
$$
2. Compute pairwise similarities between keys and queries, normalize with softmax
$$
e_{ij} = q_{i}^Tk_{j} \quad \quad \alpha_{ij} = \frac{\exp(\mathbf{e}_{ij})}{\sum_{j'}\exp(\mathbf{e}_{ij'})}
$$
3. Compute output for each word as weighted sum of values
$$
o_{i} = \sum_{j} \alpha_{ij}v_{j}
$$
## Transformer
Needs to add:
1. Positional embeddings
2. Non-linearity
3. Single to multi-head self attention
4. Multiple layers
### Positional embeddings
- We have positional embedding $\mathbf{p}_{i} \in \mathbb{R}^d$, and we just add this to the embedding
$$
\mathbf{x}_{i} = \mathbf{x}_{i} + \mathbf{p}_{i}
$$
- We can make these positional embedding learned parameter, but in doing so, we can't extrapolate to indices outside $1,\dots, n$.
### Non-linearity
- Self-attention is just re-averaging the value vectors, there's no non-linearity here
- We add a feed-forward network to post-process each output vector
$$
m_{i}= \text{MLP}(o_{i}) = W_{2} \times \text{ReLU}(W_{1}o_{1}+b_{1}) +b_{2}
$$
### Multi-head self-attention
- We just do self-attention multiple times, but with different projection matrices $Q, K, V$
- After we get each head's attention score, we concatenate everything to get the overall score
- Each head should focus on different "feature" of the sentence
### Add & Norm
- We add as a residual connection to help the gradient flows better
	- We let $X^{(i)}=X^{(i-1)} + \text{Layer}(X^{(i-1)})$
- We also do layer norm to help models train faster
	- Idea: cut down uninformative variation in hidden vector values by normalizing to unit mean and standard dev within each layer