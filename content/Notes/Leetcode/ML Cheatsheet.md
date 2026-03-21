---
created: 2026-03-21T14:15
modified: 2026-03-21T15:04
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

## Attention
Beware of the dimensions. Let $\mathbf{w}_{1:n}$ be the sequence of words in vocabulary $V$. For each $\mathbf{w}_{i}$, let $\mathbf{x}_{i} = E \mathbf{w}_{i}$, where $E \in \mathbb{R}^{d \times |V|}$ is an embedding matrix. Remember that $\mathbf{w}_{i}$ is a one-hot matrix in $\mathbb{R}^{|V|}$, so $E\mathbf{w}_{i}$ is a look-up to produce $\mathbf{x}_{i} \in \mathbb{R}^d$.

Therefore, $\mathbf{x} \in \mathbb{R}^{n\times d}$, where $n$ is the `seq len` (or ctx window), and $d$ is the dimension, or `d_model`.

Then, the attention mechanism.
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
	scores = np.einsum('...ij,...kj->...ik', Q, K)
	scores /= np.sqrt(d_k)
	if mask is not None:
		scores = np.where(mask, scores, -1e9)
	weights = softmax(scores, axis=-1)
	return np.einsum('...ik,...kj->ij', weights, V) 
```

Read [[Lecture 4 -- Attention & Transformer]] for more details.

- [ ] Need to write about multi-headed attention and FFN, along with the dimensional changes.
	-  The dimensionality of the QKV weights will be slightly different, as they need one extra dimension for the `num_heads` or $h$. But $d_{k}$ and $d_{v}$ can be smaller!

What's important is that everything must return to $\mathbb{R}^{n\times d}$, until the end, where you multiply with $E^T$ to get $\mathbb{R}^{n \times |V|}$, the logits, ready for you to do sampling on.