Leetcode problem 57.

Sometimes, it is probably easier to think in terms of progression rather than cases.

In this case, we separate the while loops into three different 'progressions':
1. Non-overlap at the start
2. Overlap parts, we can ensure that this will be a first half overlap rather than the second half overlap
	- This means that the `newInterval` always comes first before the incoming `interval`
3. Non-overlap at the end