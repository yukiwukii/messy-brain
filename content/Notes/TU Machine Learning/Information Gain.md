In decision trees, we can prioritize nodes with higher information gain.
Let the total number of samples is $n$ and samples in class 1 is $n_{1}$. 

We can then define the entropy $I$ as the entropy before we split.
$$
I(n, n_{1}) = -\left( \left( \frac{n_{1}}{n} \right)\log_{2}\left( \frac{n_{1}}{n} \right)+\left( 1-\frac{n_{1}}{n} \right)\log_{2}\left( 1-\frac{n_{1}}{n} \right) \right)
$$
Next, $E(X)$ is the entropy after we split, given feature $X$ which has $k$ classes, and $m_{i}$ being the number of child nodes while $m_{i1}$ is the number of samples in class 1 of child $m_{i}$. 
$$
E(X) = - \left( \frac{m_{1}}{n} \right) I(m_{1}, m_{11}) +\left( \frac{m_{2}}{n} \right) I(m_{2}, m_{21})+\dots+\left( \frac{m_{k}}{n} \right)I(m_{k}m_{k_{1}})
$$
So, we have Information Gain, which is the decrease of impurity if we split.
$$
\text{Gain}(X) = I(n, n_{1})- E(X)
$$
