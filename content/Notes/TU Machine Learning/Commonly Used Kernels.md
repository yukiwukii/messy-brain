---
created: 2025-10-15T19:17
modified: 2025-10-15T19:17
---
1. Inner products, $K(\mathbf{x}, \mathbf{x}_{i}) = (\mathbf{x} \cdot \mathbf{x}_{i})$
2. Polynomials, $K(\mathbf{x}, \mathbf{x}_{i}) = [(\mathbf{x}\cdot \mathbf{x}_{i}) + 1]^q$
3. Radial basis function
	$$
K(\mathbf{x}, \mathbf{x}_{i}) =  \exp\left\{{\frac{-|\mathbf{x}-\mathbf{x}_{i}|^2}{\sigma^2}}\right\}
$$
4.  Sigmoid, $K(\mathbf{x}, \mathbf{x}_{i}) = \tanh(v(\mathbf{x} \cdot \mathbf{x}_{i}) + c)$
