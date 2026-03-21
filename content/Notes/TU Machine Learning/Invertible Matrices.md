---
created: 2025-09-29T05:20
modified: 2025-09-29T05:25
---
## 1. What is an invertible matrix?

A square matrix $A \in \mathbb{R}^{n \times n}$ is **invertible** (also called _non-singular_) if there exists another matrix $A^{-1}$ such that:

$$
A A^{-1} = A^{-1} A = I_n,  
$$

where $I_n$ is the $n \times n$ identity matrix.

If such an inverse exists, we can “undo” the effect of multiplying by $A$, just like dividing by a number.

---
## 2. When is a matrix invertible?

Key conditions:
- **Square**: Must be ($n \times n$).
- **Full rank**: Rank must be $n$ (its columns/rows are linearly independent).
- **Determinant nonzero**: $\det(A) \neq 0$.
- **Eigenvalues nonzero**: None of the eigenvalues are 0.

All of these are equivalent ways of saying the same thing.

---
## 3. How to check if a matrix is invertible

Practical ways:
1. **Determinant test**:  
    If $\det(A) \neq 0$, $A$ is invertible.  
    (Quick for small matrices, but unstable for large ones numerically.)
    
2. **Rank test**:  
    If $\text{rank}(A) = n$, it’s invertible.  
    (Used in practice; can be computed with Gaussian elimination or SVD.)
    
3. **Row reduction (Gaussian elimination)**:  
    If you can reduce $A$ to the identity without hitting a row of zeros, it’s invertible.

---
## 4. Why does it matter in regression?

In linear regression, the matrix we want to invert is:

$$  
X^T X \quad \in \mathbb{R}^{(d+1) \times (d+1)}.  
$$

- If features (columns of $X$) are linearly independent, then $X^T X$ is invertible.
- If some features are redundant (collinear), then $X^T X$ is **singular** $(\det = 0)$, and we cannot invert it → we use the **pseudoinverse** instead.