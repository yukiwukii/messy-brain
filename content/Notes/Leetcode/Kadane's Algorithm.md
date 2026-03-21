#DP
To find the contiguous subarray with the largest sum. Actually quite simple.

The logic here is that as long as the contiguous subarray becomes negative, it is no longer worth it to keep around. We also have the max being held.

```python
def kadane(nums):
	mx, curr = -float('inf'), 0
	for num in nums:
		curr += num
		mx = max(mx, curr)
		if curr < 0: return 0
	return mx
```

