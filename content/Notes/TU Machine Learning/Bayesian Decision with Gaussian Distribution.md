Honestly, it is a bit confusing.
## Case 1: Spherical Covariances + Equal Priors
- Decision rule: Assign to the class with the **nearest mean** (Euclidean distance)
- Decision boundary: **Perpendicular bisector** between the class means
## Case 2: Spherical Covariances + Unequal Priors
- Decision rule: Minimum distance, but **biased by priors**
- Decision boundary: Still a hyperplane, but **shifted away from the high-prior class** (toward the low-prior class)
- Effect: The more common class gets a larger decision region
## Case 3: Arbitrary (but Equal) Covariances + Any Priors
- Decision rule: Minimum **Mahalanobis distance** (adjusted for covariance structure), biased by priors
	- Mahalanobis Distance $= \sqrt{(\mathbf{x}-\boldsymbol{\mu})^T \sum^{-1}(\mathbf{x} - \boldsymbol{\mu}) }$
- Decision boundary: Still **linear** (hyperplane), but oriented according to the covariance structure

Note that for all of these three cases, the classes share the same covariance structure.

# How to know to use this?
1. Central limit theorem
2. Visual checking
3. Statistical test using $\chi^2$ test.