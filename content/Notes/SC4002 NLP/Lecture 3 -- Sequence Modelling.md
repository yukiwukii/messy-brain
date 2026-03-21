---
created: 2025-11-22T01:18
modified: 2025-11-23T17:04
---
## RNN
### Training an RNN
From feedforward,
$$
\begin{align}
\mathbf{h}^{(t)} &= g(\mathbf{W}_{e}\mathbf{e}^{(t)})\\
\mathbf{y}^{(t)} &= \text{softmax} (\mathbf{U}\mathbf{h}^{(t)})
\end{align}
$$
To recurrent unit,
$$
\begin{align}
\mathbf{h}^{(t)} &= g(\mathbf{W}_{h}\mathbf{h}^{(t-1)} + \mathbf{W}_{e}\mathbf{e}^{(t)}) \\
\mathbf{\hat{y}}^{(t)} &= \text{softmax}(\mathbf{U}\mathbf{h}^{(t)})
\end{align}
$$
To find the loss function, we use cross-entropy, where $\mathbf{y}^{(t)}$ is a one-hot vector for the ground truth,
$$
J^{(t)}(\theta) = CE(\mathbf{y}^{(t)}, \hat{\mathbf{y}}^{(t)}) = -\sum_{w \in V}\mathbf{y}_{w}^{(t)} \log \mathbf{\hat{y}}_{w}^{(t)}
$$
We average it to get the overall loss of the entire training set,
$$
J(\theta) = \frac{1}{T}\sum_{t=1}^T J^{(t)} (\theta)
$$
Computing the loss and gradient for the entire corpus $x^{(1)},\dots,x^{(T)}$ is to expensive, so we consider only sentence / document level.
### Generating text using RNN
- We can just sample a word from $\hat{\mathbf{y}}^{(t)}$ to get the word chosen word at step $t$
### Problems with RNNs
1. Vanishing gradient
	- When we do backprop with $J^{(t)}(\theta)$ w.r.t to $W_{h}$, we need to multiply the derivative throughout the previous time steps
	- When the vallues of $\frac{ \partial h^{(t)} }{ \partial h^{(t-1)} }$ are small, then the resulting gradient will also be small
	- This also means that gradient signals from faraway is effectively lost
		- RNN-LMs are better at learning from sequential recency rather than syntactic recency
2. Recurrent computation is slow since it is parallel
### Benefits of RNNs
1. Can process any length input
2. Model size does not increase for longer input context 
3. Same weights applied at each step, so it is easy to plug and play
## LSTM
Three gates:
1. Forget gate: $f^{(t)} = \sigma(\mathbf{W}_{f}h^{(t-1)}+\mathbf{U}_{f}\mathbf{x}^{(t)} + \mathbf{b}_{f})$
2. Input gate: $i^{(t)} = \sigma(\mathbf{W}_{i}\mathbf{h}^{(t-1)}+\mathbf{U}_{i}\mathbf{x}^{(t)}+\mathbf{b}_{i})$
3. Output gate: $o^{(t)}= \sigma(\mathbf{W}_{o}\mathbf{h}^{(t-1)}+\mathbf{U}_{o}\mathbf{x}^{(t)}+\mathbf{b}_{o})$

Now, we compute how much to forget,  update and output,
1. New cell content, $\tilde{c}^{(t)} = \tanh (\mathbf{W}_{c}\mathbf{h}^{(t-1)}+\mathbf{U}_{c}\mathbf{x}^{(t)}+\mathbf{b}_{c})$
2. Cell state, $c^{(t)}=f^{(t)}\cdot c^{(t-1)} + i^{(t)} \cdot \tilde{c}^{(t)}$
3. Hidden state, $h^{(t)} = o^{(t)}\cdot \tanh c^{(t)}$

- Note that LSTM does not guarantee no vanishing / exploding gradient, but it just helps the model learn long-distance dependencies
## Against vanishing gradient
- A possible solution is to add more direct connections, i.e. in ResNet
- Instead of calculating, where $F'(x)$ might be very very very small
$$
\frac{ \partial L }{ \partial x } = \frac{ \partial L }{ \partial y } \times F'(x)
$$
- We calculate
$$
\frac{ \partial L }{ \partial x } = \frac{ \partial L }{ \partial y } \times (F'(x)+1)
$$
- This is because the forward pass is $y = F(x)+x$ instead of $y=F(x)$
## Sequence modelling with RNNs
1. Sequence tagging (POS tagging / NER tagging), just apply softmax: $\hat{y} = \text{softmax}(Uh^{(t)} +b)$
2. Sequence classification
	- We can take the final hidden state, $h^{(t)}$ as the summary of the sentence -> $g = \text{softmax}(Uh^{(t)} + b)$
	- Or we can take max/average pooling -> $h^{(s)}= \text{avg}\left( \sum_{t=1}^Th^{(t)} \right)$
## Bidirectional RNNs
$$
\begin{align}
\text{backward }h^{(t)} &= \sigma(W_{bx}x^{(t)}+W_{bh}h^{(t+1)}+b_{b}) \\
\text{forward }h^{(t)}&= \sigma(W_{fx}x^{(t)} + W_{fh}h^{(t-1)}+b_{f})
\end{align}
$$
- We have two new matrices: $W_{bx}$ and $W_{bh}$
- To get the hidden state, we concatenate the backward and forward hidden state
$$
h^{(t)} = [\text{forward }h^{(t)}; \text{backward }h^{(t)}]
$$
- Only applicable when we have access to the entire input sequence
- Bidirectionality is powerful for encoding
## Stacked RNNs
- Basically multi-layer RNNs
- The hidden states from RNN layer $i$ are the inputs to RNN layer $i+1$
- In deeper layers (e.g. 8 layers), we need skip-connections
## Machine Translation
Given a foreign sentence $F$, find an English sentence $E$
$$
\hat{E} = \arg\max_{E \in \text{English}}\overbrace{ P(F|E) }^{ \text{Translation model} }\underbrace{ P(E) }_{ \text{Language model} }
$$
### Faithfulness modelling $P(F|E)$
- Goal is to compute $P(F|E)$ from a bitext $(E,F)$ corpus
1. Consider sentence-pairs $(E,F)$ to compute $P(F|E)$?
	- Same problem with n-grams, sparsity
2. Consider word-pairs $(e_{i}, f_{j})$ of the sentences and then take conditional independence assumption to compute $P(F|E)$?
	- This is what we do in word alignment
3. Consider phrase-pairs to compute $P(F|E)$?
	- Phrasal alignment
### Seq2Seq
- Two models are put together: an encoder and a decoder
- Encoder RNN produces an encoding of the source sentence, provides initial hidden state for decoder
$$
h_{x}^1 = f(W_{xe}\cdot e_{\text{les}}+ W_{xh} \cdot h_{x}^0 + b_{x})
$$
- Decoder RNN is a conditional language model that generates target sentence, conditioned on the encoding
$$
h_{y}^1 = f(W_{ye}\cdot e_{\text{<START>}}+W_{yh}\cdot \overbrace{ h_{x}^4 }^{ \text{last hidden encoder state} } + b_{y})
$$
- Training objective, where $p(y|x)$ is the softmax-ed output of the RNN
$$
J_{t} = \sum_{(x,y) \in \mathcal{D}} - \log p(y|x)
$$
### Evaluating MT
- BLEU compares machine-written translation to one or several human-written translations
- Giving similarity score based on n-grams + penalty on too short system translation
- Problem: n-gram is not a good method...
### Pros and Cons of MT
Pros
1. Better performance, in terms of fluency, context, and phrase similarities
2. Single neural network, optimized end to end
3. No need for feature engineering, same for all language pairs

Cons
1. Less interpretable = hard to debug
2. Difficult to control in terms of safety
### Other Seq2Seq problems
1. Summarization (long text -> short text)
2. Dialogue (previous utterance -> next utterance)
3. Parsing (input text -> output parse tree)
4. Code generation (natural langauge -> python code)
5. Segmentation (input text -> output tag sequence)