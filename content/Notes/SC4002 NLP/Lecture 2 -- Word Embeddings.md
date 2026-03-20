## History
- We had WordNet, which contains synonym sets and hypernyms ("is a" relationship)
	- Problem: Missing nuance, missing new meaning of words, impossible to keep up-to-date, subjective
- We had discrete representation, where each word is a one-hot vector
	- Problem: Cannot calculate word similarity
- Word vectors: dense vector, chosen such that it is similar to the vector of words that appear in similar contexts
## Representing words by their context
- When a word w appears in a text, its context is the set of words that appear nearby (within a fixed-size window)
- Idea: Use many contexts of w to build up a representation of w
### Word2Vec
1. Continuous Bag of Words (CBOW): look a the words before and after the word to create embedding
2. Skipgram: Instead of guessing a word by its context, we guess the neighboring words based on the current word
#### How to use skipgram
- We can calculate how "likely" the surrounding words based on the current word.
$$
\text{Likelihood} = L(\theta) = \prod_{t=1}^T \prod_{-m\leq j\leq m}P(w_{t+j}|w_{t};\theta)
$$
- The objective function $J(\theta)$ is the negative log likelihood.
$$
J(\theta) = -\frac{1}{T} \log L(\theta) = -\frac{1}{T}\sum_{t=1}^T \sum_{-m\leq j\leq m}\log P(w_{t+j}|w_{t};\theta)
$$
- We still need to calculate $P(w_{t+j}|w_{t};\theta)$, where we use two vectors per word w:
	1. $v_{w}$ when $w$ is the center word
	2. $u_{w}$ when $w$ is the context word
- Then, for a center word c and a context word o (it is similar to softmax!):
$$
P(o|c) = \frac{\exp(u_{o}^Tv_{c})}{\sum_{w\in V}\exp(u_{w}^Tv_{c})}
$$
#### Skipgram w/ negative sampling
- Change the task from predicting the neighboring words (which is a softmax problem) into checking if two words are neighbors (which is a binary classification problem)
- We use logistic regression, which is simpler and much faster to calculate
- We need to introduce negative samples into the dataset -- randomly sampled from the vocabulary
- Maximize probability of real outside word appears, minimize hte probability that random words appear aroun the center words ($\{ o_{1},\dots ,o_{k} \}$ are random words)
$$
J_{t}(\theta) = \overbrace{ \log \sigma(u_{o}^Tv_{c}) }^{ \text{target = 1} } + \underbrace{ \sum_{i=1}^k \log\sigma(-u_{o_{i}}^Tv_{c}) }_{ \text{target = 0} }
$$
- Hyperparameter: window size (default = 5), and number of negative samples (5-20, but usually also 5).
### Problems with Word2Vec / GloVe
1. OOV
2. Morphology: for words with the same radicals such as "eat" and "eaten", they don't share the same parameter
Solution: FastText -> make embeddings of subwords (n-grams) instead, and then we sum everything up
## Evaluation of word vectors
### Intrinsic evaluation
- Make sure that the word vector analogies make sense
	- Take cosim of the word vector and check if they make sense
$$
\arg \max_{b^*} (\cos(b^*, b - a + a^*))
$$
### Extrinsic evaluation
- Use neural networks
![[Pasted image 20251122080228.png]]
- Note that the window size is fixed at a certain number.
![[Pasted image 20251122080338.png]]
## Language Modelling
- A language model takes a list of words and attempt to predicts the word that follows them
$$
P(\mathbf{x}^{(1)},\dots, \mathbf{x}^{(T)})=\overbrace{ \prod_{t=1}^T P(\mathbf{x}^{(t)}|\mathbf{x}^{(t-1)},\dots,\mathbf{x}^{(1)}) }^{ \text{this is what our LM provides} }
$$
### Perplexity
$$
\text{perplexity} = \prod_{t=1}^T \left( \frac{1}{P_{LM}(\mathbf{x}^{(t+1)}|\mathbf{x}^{(t)},\dots,\mathbf{x}^{(1)})} \right)^{1/T}
$$
- This is equal to the exponential of cross-entropy lost $J(\theta)$
$$
\text{perplexity} = \exp\left( \frac{1}{T} \sum_{t=1}^T -\log \hat{\mathbf{y}}_{\mathbf{x}_{t+1}}^{(t)} \right)
$$
### N-grams language model
Problems & Solutions
1. Unknown sequence (sparsity) -> smoothing and backoff
2. Storage (increase n or increase corpus increases model size)
### Neural language model
- Similar to NER, but instead of predicting the class of the center word, we want to predict the next word
![[Pasted image 20251122081518.png]]
- With this, we don't have sparsity problem anymore, and we don't have to store all n-grams
Problems:
1. Fixed window size
2. Enlarging window enlarges $W$
3. Window can never be large enough
4. $x^{(1)}$ and $x^{(2)}$ are multiplied by different weights in $W$ -> no symmetry