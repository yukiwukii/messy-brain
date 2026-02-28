If $K(u, v)$ is a continuous, symmetric function (which means $K(u,v) = K(v,u)$) and positive semidefinite, then there exist a mapping $\Phi(x)$ such that:
$$
K(u, v) = \langle\Phi(u), \Phi(v)\rangle
$$
and $K$ is a valid kernel.

>[!info] Positive Semidefinite (PSD)
>The condition is:
>$$
>\int \int K(u,v)g(u)g(v)dudv > 0
>$$
>Basically it means that the two functions will never produce a *negative similarity energy*. Energy here refers to something like squared length.

The reason why we need PSD is because without PSD, we could have some squared lengths $\begin{Vmatrix}\Phi(x)\end{Vmatrix}^2 = K(x, x)$ that could be negative. Which is wrong.

You can read more in Functional Analysis textbooks.


