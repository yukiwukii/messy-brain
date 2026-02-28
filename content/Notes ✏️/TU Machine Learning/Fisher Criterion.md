Following [[Linear Discriminant Analysis|LDA]], we can then formalize Fisher's Criterion for best separation
$$
\max_{\mathbf{w}}J_{F}(\mathbf{w})= \frac{(\tilde{m}_{1}-\tilde{m}_{2})^2}{\tilde{S}_{1}+\tilde{S}_{2}} 
$$
where $y_{i}=\mathbf{w}^T\mathbf{x}_{i}$

So the optimal w, $\mathbf{w}^*=\arg\max_{\mathbf{w}} J_{F}(\mathbf{w})$
$$
J_{F}(\mathbf{w}) = \frac{\mathbf{w}^T\mathbf{S}_{b}\mathbf{w}}{\mathbf{w}^T\mathbf{S}_{w}\mathbf{w}}
$$
Note that the derivation comes from substituting $y_{i}=\mathbf{w}^T\mathbf{x}_{i}$

Some things to note with the value of $\max J_{F}({\mathbf{w})}$:
	- Not unique, so if we change the scale of $\mathbf{w}$, the value of $J_{F}(\mathbf{w})$ won't change. 
	- Of course, we can fix the denominator $\mathbf{w}^T\mathbf{S}_{w}\mathbf{w}=c\neq 0$, and then maximise the numerator $\mathbf{w}^T\mathbf{S}_{b}\mathbf{w}$

We define a Langragian function:
$$
L(\mathbf{w},\lambda) = \mathbf{w}^T\mathbf{S}_{b}\mathbf{w} - \lambda(\mathbf{w}^T\mathbf{S}_{w}\mathbf{w}-c)
$$
Let $\frac{ \partial L }{ \partial w } = 0$,
$$
\mathbf{S}^{-1}_{w}\mathbf{S}_{b}\mathbf{w}^* = \lambda \mathbf{w}^*
$$
which means that $\mathbf{w}^*$ is the eigenvector of matrix $\mathbf{S}^{-1}_{w}\mathbf{S}_{b}$.

Substituting $\mathbf{S}_{b} =(\mathbf{m}_{1}- \mathbf{m}_{2})(\mathbf{m}_{1}-\mathbf{m}_{2})^T$, we eventually will have
$$
\mathbf{w}^* = S_{w}^{-1}(\mathbf{m}_{1}-\mathbf{m}_{2})
$$
Remember that $w^*$is the direction of projection.

Note that this is the binary linear discriminant. The multiclass version is slighty different.