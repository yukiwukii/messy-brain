---
created: 2025-10-12T17:50
modified: 2025-10-12T18:03
---
# Backpropagation Derivation for 3-Layer MLP
ReLU Hidden Layer + Softmax Output + Cross-Entropy Loss
# Network Architecture
**Layers:**
- Input layer: $\mathbf{x} \in \mathbb{R}^d$ (d features)
- Hidden layer: $\mathbf{h} \in \mathbb{R}^m$ (m hidden units with ReLU)
- Output layer: $\hat{\mathbf{y}} \in \mathbb{R}^k$ (k classes with Softmax)

**Parameters:*

| Parameter          | Dimension    | Description              |
| ------------------ | ------------ | ------------------------ |
| $\mathbf{W}^{(1)}$ | $m \times d$ | Input-to-hidden weights  |
| $\mathbf{b}^{(1)}$ | $m \times 1$ | Hidden layer biases      |
| $\mathbf{W}^{(2)}$ | $k \times m$ | Hidden-to-output weights |
| $\mathbf{b}^{(2)}$ | $k \times 1$ | Output layer biases      |

---
# Forward Pass

## Hidden Layer (ReLU Activation)
**Pre-activation:** $$\mathbf{z}^{(1)} = \mathbf{W}^{(1)}\mathbf{x} + \mathbf{b}^{(1)}$$

**Activation (ReLU):** $$\mathbf{h} = \text{ReLU}(\mathbf{z}^{(1)}) = \max(0, \mathbf{z}^{(1)})$$

Element-wise: $h_j = \max(0, z_j^{(1)})$ for $j = 1, \ldots, m$

> **ReLU Function:** $$\text{ReLU}(z) = \begin{cases} z & \text{if } z > 0 \\ 0 & \text{if } z \leq 0 \end{cases}$$
---
## Output Layer (Softmax Activation)

**Pre-activation:** $$\mathbf{z}^{(2)} = \mathbf{W}^{(2)}\mathbf{h} + \mathbf{b}^{(2)}$$
**Activation (Softmax):** $$\hat{y}_i = \frac{\exp(z_i^{(2)})}{\sum_{j=1}^k \exp(z_j^{(2)})} \quad \text{for } i = 1, \ldots, k$$
Properties:
- $\hat{y}_i \in (0, 1)$ for all $i$
- $\sum_{i=1}^k \hat{y}_i = 1$
- Interpretable as class probabilities

## Loss Function (Cross-Entropy)

Given true label $\mathbf{t}$ (one-hot encoded vector):

$$L = -\sum_{i=1}^k t_i \log(\hat{y}_i)$$

For a single sample with true class $c$: $L = -\log(\hat{y}_c)$

---
# Backward Pass (Backpropagation)

**Goal:** Compute $\frac{\partial L}{\partial \mathbf{W}^{(2)}}$, $\frac{\partial L}{\partial \mathbf{b}^{(2)}}$, $\frac{\partial L}{\partial \mathbf{W}^{(1)}}$, $\frac{\partial L}{\partial \mathbf{b}^{(1)}}$
## Softmax + Cross-Entropy Gradient

>**Theorem:** For softmax output with cross-entropy loss: $$\frac{\partial L}{\partial \mathbf{z}^{(2)}} = \hat{\mathbf{y}} - \mathbf{t}$$
### Proof

We need to compute $\frac{\partial L}{\partial z_j^{(2)}}$ for each output $j$. Gradient of loss w.r.t. softmax output:

$$\frac{\partial L}{\partial \hat{y}_i} = \frac{\partial}{\partial \hat{y}_i}\left(-\sum_{k=1}^K t_k \log \hat{y}_k\right) = -\frac{t_i}{\hat{y}_i}$$

Gradient of softmax w.r.t. pre-activation; The Jacobian of softmax has two cases:

$$\frac{\partial \hat{y}_i}{\partial z_j^{(2)}} = \begin{cases} \hat{y}_i(1 - \hat{y}_i) & \text{if } i = j \ -\hat{y}_i \hat{y}_j & \text{if } i \neq j \end{cases}$$

Applying chain rule

$$\frac{\partial L}{\partial z_j^{(2)}} = \sum_{i=1}^k \frac{\partial L}{\partial \hat{y}_i} \cdot \frac{\partial \hat{y}_i}{\partial z_j^{(2)}}$$

For component $j$:

$$\begin{align} \frac{\partial L}{\partial z_j^{(2)}} &= \left(-\frac{t_j}{\hat{y}_j}\right) \cdot \hat{y}_j(1 - \hat{y}_j) + \sum_{i \neq j} \left(-\frac{t_i}{\hat{y}_i}\right) \cdot (-\hat{y}_i \hat{y}_j) \ &= -t_j(1 - \hat{y}_j) + \sum_{i \neq j} t_i \hat{y}_j \ &= -t_j + t_j\hat{y}_j + \sum_{i \neq j} t_i \hat{y}_j \ &= -t_j + \hat{y}_j \sum_{i=1}^k t_i \ &= -t_j + \hat{y}_j \quad \text{(since } \sum_i t_i = 1\text{)} \ &= \hat{y}_j - t_j \end{align}$$

Therefore: **$$\boldsymbol{\delta}^{(2)} = \hat{\mathbf{y}} - \mathbf{t}$$**
## Output Layer Gradients
Define the error signal: $\boldsymbol{\delta}^{(2)} = \frac{\partial L}{\partial \mathbf{z}^{(2)}} = \hat{\mathbf{y}} - \mathbf{t}$

**Gradient w.r.t. $\mathbf{W}^{(2)}$:** $$\frac{\partial L}{\partial \mathbf{W}^{(2)}} = \boldsymbol{\delta}^{(2)} \mathbf{h}^\top$$
Element-wise: $\frac{\partial L}{\partial W_{ij}^{(2)}} = \delta_i^{(2)} \cdot h_j = (\hat{y}_i - t_i) \cdot h_j$

**Gradient w.r.t. $\mathbf{b}^{(2)}$:** $$\frac{\partial L}{\partial \mathbf{b}^{(2)}} = \boldsymbol{\delta}^{(2)}$$
Element-wise: $\frac{\partial L}{\partial b_i^{(2)}} = \delta_i^{(2)} = \hat{y}_i - t_i$
## Hidden Layer Gradients
Backpropagate error to hidden layer:

$$\frac{\partial L}{\partial \mathbf{h}} = (\mathbf{W}^{(2)})^\top \boldsymbol{\delta}^{(2)}$$

Applying ReLU derivative:
$$\frac{\partial \text{ReLU}(z)}{\partial z} = \begin{cases} 1 & \text{if } z > 0 \ 0 & \text{if } z \leq 0 \end{cases} = \mathbb{1}(z > 0)$$
The error at pre-activation of hidden layer: $$\boldsymbol{\delta}^{(1)} = \frac{\partial L}{\partial \mathbf{z}^{(1)}} = \frac{\partial L}{\partial \mathbf{h}} \odot \text{ReLU}'(\mathbf{z}^{(1)})$$
$$\boxed{\boldsymbol{\delta}^{(1)} = [(\mathbf{W}^{(2)})^\top \boldsymbol{\delta}^{(2)}] \odot \mathbb{1}(\mathbf{z}^{(1)} > 0)}$$

where $\odot$ denotes element-wise multiplication (Hadamard product).

**Gradient w.r.t. $\mathbf{W}^{(1)}$:** $$\frac{\partial L}{\partial \mathbf{W}^{(1)}} = \boldsymbol{\delta}^{(1)} \mathbf{x}^\top$$

Element-wise: $\frac{\partial L}{\partial W_{ij}^{(1)}} = \delta_i^{(1)} \cdot x_j$

**Gradient w.r.t. $\mathbf{b}^{(1)}$:** $$\frac{\partial L}{\partial \mathbf{b}^{(1)}} = \boldsymbol{\delta}^{(1)}$$