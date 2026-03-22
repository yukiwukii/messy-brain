---
created: 2026-03-21T14:15
modified: 2026-03-22T17:55
---
## Matrix Multiplications
I use einsum.
```python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = np.einsum('ij, jk -> ik', A, B)
```

## Softmax
In math,
$$
\text{softmax}(x_{i}) = \frac{e^{x_{i}}}{\sum_{j=1}^Ne^{x_{j}}}
$$
```python
def softmax(x):
	# We calculate the e^x for each element
	e_x = np.exp(x - x.max()) # For stability
	return e_x / e_x.sum()
```

## Transformer
>[!caution]
>Beware of the dimensions. 
### Embedding
Two steps here, embedding lookups + positional encoding.
#### Look-ups
Let $\mathbf{w} \in \mathbb{R}^n$ be the sequence of words in vocabulary $V$. Then, we do lookups with $E$, where $E \in \mathbb{R}^{|V| \times d}$, the embedding matrix. For each $\mathbf{w}_{i} \in \{ 1, \dots ,|V|\}$ (a scalar), the embedding lookup is $\mathbf{x}_{i} = E_{\mathbf{w}_{i}} \in \mathbb{R}^d$.

>[!Info]
>If $\mathbf{w} \in \mathbb{R}^{n \times |V|}$  and $\mathbf{w}_{i}$ is a one-hot vector $\in \mathbb{R}^{|V|}$, instead of a scalar, then $\mathbf{x}_{i} = \mathbf{w}_{i}^\top E \in \mathbb{R}^d$. This is a full-fledged matrix multiplication, and not a lookup (although it essentially work as a lookup).

Therefore, $\mathbf{x} \in \mathbb{R}^{n\times d}$, where $n$ is the `seq len` (or ctx window), and $d$ is the dimension, or `d_model`.

#### Positional Encoding
Positional encoding, as per the transformer formula is this
$$
\begin{align}
PE_{(1, 2j)} &= \sin\left( \frac{i}{10000^{2j/d}} \right) \\
PE_{(1, 2j+1)} &= \cos\left( \frac{i}{10000^{2j/d}} \right)
\end{align}
$$
where $i \in \{0, \dots, n-1\}$ is the token position and $j \in \{0, \dots, \frac{d}{2}-1\}$ is the dimension index. Even dimensions get sine and odd dimensions get cosine. Then, we just add the positional encoding to $\mathbf{x}$.

Note that the `[None, :]` means that you add a dimension to become `(1, d/2)`.

```python
def positional_encoding(n, d):
    PE = np.zeros((n, d))
    pos = np.arange(n)[:, None]          # (n, 1)
    i   = np.arange(0, d, 2)[None, :]   # (1, d/2)
    div = 10000 ** (i / d)
    PE[:, 0::2] = np.sin(pos / div)      # even dims
    PE[:, 1::2] = np.cos(pos / div)      # odd dims
    return PE                             # (n, d)

def embed(tokens, E, n, d):
	# In this case, tokens: (n,)
    X = E[tokens]                        # (n, d)
    X = X + positional_encoding(n, d)   # (n, d)
    return X
```

### Attention
#### Normal Attention
The attention mechanism.
$$
\text{attention} = \text{softmax}\left(\frac{QK^T}{\sqrt{d_{k}}}\right)V
$$
Initially, the $W_{Q}, W_K$ matrix are of the same size, $\mathbb{R}^{d\times d_{k}}$. Only $W_{V}$ may be different, at $\mathbb{R}^{d\times d_{v}}$.

Once we multiply $\mathbf{x}$ with the QKV weights, we get $Q \in \mathbb{R}^{n \times d_{k}}$, $K \in \mathbb{R}^{n \times d_{k}}$ and $V \in \mathbb{R}^{n \times d_{v}}$. We then calculate the attention scores, with $QK^T \in \mathbb{R}^{n \times n}$. Since $\sqrt{ d_{k} }$ is a scalar, the softmax-ed vector is of $\mathbb{R}^{n\times n}$.

Softmax is applied row-wise -- every row in the $n \times n$ matrix now sums up to 1. The resulting matrix is still $n \times n$.

Finally, we do matrix multiplication with $V$, to get $\text{attention} \in \mathbb{R}^{n \times d_{v}}$. 

```python
def attn(Q, K, V, mask=None):
	d_k = K.shape[-1]
	scores = np.einsum('nk,mk->nm', Q, K)
	scores /= np.sqrt(d_k)
	if mask is not None:
		scores = np.where(mask, scores, -1e9)
	weights = softmax(scores, axis=-1)
	return np.einsum('nm,mv->nv', weights, V) 
```

Read [[Lecture 4 -- Attention & Transformer]] for more details.

#### Multi-Head Attention
The difference with normal attention the $d_{k}$ and the $d_{v}$ are divided with $h$, the number of head. Then, we proceed with attention as per normal. So, the QKV weights are $\in \mathbb{R}^{d \times h \times d_{k}}$.

After attention, we concatenate all the heads, and then output a projection by multiplying with $W_{O} \in \mathbb{R}^{d \times (hd_{v})}$.

```python
def mha(X, W_Q, W_K, W_V, W_O, h):
    B, n, d = X.shape
    d_k = W_Q.shape[-1] // h
    d_v = W_V.shape[-1] // h

    # 1. Project + reshape into heads in one einsum
    Q = np.einsum('nd,dhk->hnk', X, W_Q.reshape(d, h, d_k))
    K = np.einsum('nd,dhk->hnk', X, W_K.reshape(d, h, d_k))
    V = np.einsum('nd,dhv->hnv', X, W_V.reshape(d, h, d_v))

    # 2. Attention scores
    scores = np.einsum('hnk,hmk->hnm', Q, K) / np.sqrt(d_k)
    weights = softmax(scores, axis=-1)

    # 3. Weighted sum
    attn = np.einsum('hnm,hmv->hnv', weights, V)

    # 4. Concat heads
    concat = np.einsum('hnv->nhv', attn).reshape(n, h * d_v)
    
    # 5. Project to output
    out = np.einsum('nx,xd->nd', concat, W_O)
    return out
```

What's important is that everything must return to $\mathbb{R}^{n\times d}$, until the end, where you multiply with $E^\top$ to get $\mathbb{R}^{n \times |V|}$, the logits, ready for you to do sampling on.

### LayerNorm
Right after MHA, we do LayerNorm.
$$
\text{LayerNorm}(x)= \frac{x-\mu}{\sqrt{ \sigma^2+\epsilon }} \cdot \gamma + \beta
$$
where $\mu = \frac{1}{d} \sum_{i=1}^dx_{i}$ and $\sigma^2 = \frac{1}{d} \sum_{i=1}^d(x_{i}-\mu)^2$ are computed over the feature dimension $d$.

```python
def layer_norm(x, gamma, beta, eps=1e-5):
	# Remember that x: (n, d)
	mean = x.mean(axis=-1, keepdims=True) # (n, 1)
	var = x.var(axis=-1, keepdims=True) # (n, 1)
	x_hat = (x - mean) / np.sqrt(var + eps) # (n, d)
	return gamma * x_hat + beta
```

$\epsilon$ is a small constant to prevent division by zero. $\gamma$ and $\beta$ are learned weights $\in \mathbb{R}^d$. When you multiply and add in the end (last line of the code), broadcasting happened over $n$ (`seq len`).

### Feed-Forward Network (FFN)
```python
def ffn(x, W1, b1, W2, b2):
	z = np.einsum('nd,df->nf', x, W1) + b1 # (n, dff)
	h = np.maximum(0, z) # ReLU
	return np.einsum('nf,fd->nd', h, W2) + b2 # (n, d)
```
Normal weights + activation + weights. Remember that only the hidden layer output goes through activation function. The final weights don't. Why would you zero out half of the signal?

### One Transformer Block
```python
def transformer_block(x, W_Q, W_K, W_V, W_O, h,
						gamma1, beta1, W1, b1, W2, b2,
						gamma2, beta2):
	# Remember. x: (n, d)
	attn_out = mha(x, W_Q, W_K, W_V, W_O, h) # (n,d)
	x = layer_norm(x + attn_out, gamma1, beta1) # (n, d)
	ffn_out = ffn(x, W1, b1, W2, b2) # (n, d)
	x = layer_norm(x + ffn_out, gamma2, beta2) # (n, d)
	return x
```

Attention -> Add + Layer Norm -> FFN -> Add + Layer Norm. By adding, I mean adding to the residual stream.

### The Entire Transformer Mechanism
```python
def transformer(tokens, E, W_Q, W_K, W_V, W_O, h, gamma1, beta1,
				W1, b1, W2, b2, gamma2, beta2, n_layers=6):
	# tokens: (n,) -- as above
	n = len(tokens)
	d = E.shape[1]
	
	# 1. Embed + PE
	x = embed(tokens, E, n, d) # (n, d)
	
	# 2. Stack transformer blocks
	for _ in range(n_layers):
		x = transformer_block(
			x, W_Q, W_K, W_V, W_O, h, gamma1, beta1
			W1, b1, W2, b2, gamma2, beta2) # (n, d)
	
	# 3. Final logits
	logits = np.einsum('nd,vd->nv', x, E) # (n, |V|)
	
	# 4. Softmax
	probs = softmax(logits, axis=-1) #(n, |V|)
	return probs
```