---
created: 2026-03-20T18:39
modified: 2026-03-20T20:05
---
This is how we do super fast exponents, i.e. powers.

Let's say that we want to calculate $x^n$. Binary exponentiation will divide $n$ by 2 recursively. For example,
$$
\begin{align}
3^9 = 3 \times (3^4)^2 = 3 \times ((3^2)^2)^2
\end{align}
$$
So the recursive formula is:
$$
x^n = \begin{cases}
1 & \text{if } n==0 \\
(x^2)^{n/2} & \text{if } n>0 \text{ and } n \text{ even} \\
x \times (x^2)^{(n-1)/2} & \text{if } n > 0 \text{ and }n \text{ odd}
\end{cases}
$$
In terms of code:
```python
def pow(x, n):
	if n == 0: return 1.0
	# if n is -ve, we need to take reciprocals
	if n < 0: return 1/pow(x, -n)
	# if even, we just divide
	if n % 2 == 0:
		return pow(x*x, n/2)
	# if odd, we take out one of x
	else:
		return x * pow(x*x, (n-1)/2)
```
