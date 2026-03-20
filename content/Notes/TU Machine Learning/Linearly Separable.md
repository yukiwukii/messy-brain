I'm sure you know what this means conceptually, but to formalize it:
$$
\exists \alpha, \ \alpha^T\mathbf{y}_{i} > 0, \ i=1,\dots,N
$$

In English,
there exist a value $\alpha$ where the you can correctly classify all of the samples ($\alpha^T\mathbf{y}_{i}$).

How can we tell if the data is linearly separable?
- Observe the decrease of error with time, does it really go to zero?

What if the data are not linearly separable?
- We have to choose -- continue with linear methods, but allow for errors
- Or design nonlinear methods, like in [[Kernel Trick]] 