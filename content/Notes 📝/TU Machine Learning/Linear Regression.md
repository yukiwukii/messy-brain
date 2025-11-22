‘The basic formula:
$$
f(\mathbf{x}) = \sum_{i=0}^dw_ix_i = \mathbf{w}^T\mathbf{x}
$$
The training data:
$$
\{(\mathbf{x}_1, y_1), ..., (\mathbf{x}_N, y_N)\}, \\\ \mathbf{x}_j \in R^{d+1}, y_j \in R 
$$
Objective function:
$$
\min E = \frac{1}N \sum_{j=1}^N (f(\mathbf{x}_j)-y_j)^2
$$
In here, $E$ is the mean squared error.

We get the optimal weight $w^*$ when we differentiate $E$ w.r.t. $w$.
Let's expand $E$ first.
$$
\begin{align}
E &= \frac{1}N ||\mathbf{X}\mathbf{w} - \mathbf{y}||^2 \\
&= \frac{1}N (\mathbf{X}\mathbf{w}-\mathbf{y})^T(\mathbf{X}\mathbf{w}-\mathbf{y}) \\
&= \frac{1}N (\mathbf{w}^T\mathbf{X}^T\mathbf{X}\mathbf{w} + \underbrace{\mathbf{w}^T\mathbf{X}^T\mathbf{y} - \mathbf{y}^T \mathbf{X}\mathbf{w}}_{\text{scalar}} + \mathbf{y^T\mathbf{y}})\\
&=\frac{1}N (\mathbf{w}^T\mathbf{X}^T\mathbf{X}\mathbf{w} + 2 \mathbf{y}^T\mathbf{X}\mathbf{w} + \mathbf{y^T\mathbf{y}})\\
\end{align}
$$

Next, we have to use [[Standard Results of Matrix Calculus]], equation (4) and (1).
$$

$$
$$
\begin{align}
\frac{\partial E}{\partial w} &= \frac{1}N(\underbrace{\mathbf{w}(\mathbf{X}^T\mathbf{X + (\mathbf{X}^T\mathbf{X})^T})}_{\text{equation(4), } \mathbf{A =\mathbf{X}^T\mathbf{X}}}- \underbrace{(2\mathbf{y}^T\mathbf{X})^T}_{\text{equation(1)}}) \\
&= \frac{1}N (\underbrace{2\mathbf{X}^T\mathbf{X}\mathbf{w}}_{\text{Since }\mathbf{X}^X\mathbf{X} \text{ is symmetric}}  - 2\mathbf{X}^T\mathbf{y}) \\
&= \frac{2}N\mathbf{X}^T(\mathbf{X}\mathbf{w}-\mathbf{y})
\end{align}
$$

We set $\frac{\partial E}{\partial w} = 0$.
$$
<span style="color:rgb(0, 32, 96)">\begin{align}<br>\mathbf{X}^T\mathbf{X}\mathbf{w} &= \mathbf{X}^T\mathbf{y} \\<br>\mathbf{w}^* &= (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}<br>\end{align}</span>
$$
Note that <span style="color:rgb(0, 32, 96)">the last line</span> is only applicable if $\mathbf{X}^T\mathbf{X}$ is [[Invertible Matrices|invertible]].

To determine the fitness of the model, we have [[R2 Goodness of Fit]].