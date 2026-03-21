---
created: 2025-11-18T09:47
modified: 2025-11-18T15:08
---
## CPU Scheduling
- Three types of measurement: turnaround time, waiting time, and response time.
1. FCFS --> convoy effect
2. SJF --> optimal for waiting time
3. SRTF --> also optimal for waiting time
4. RR --> response time is $(n-1)\times q$, higher average waiting time but better response time
5. Multilevel queue scheduling --> can be divided into fixed priority (foreground > background process) or time-sliced based scheduling (20ms for background + 80ms for foreground)

## Synchronisation
### User-level solution
**Algorithm 1**
```python
while True:
	while turn != i:
		pass
	# critical section
	turn = k
	# remainder section
```
In plain English, while it is not my turn, I will do nothing. When it is finally my turn, I will enter the critical section, and pass it to the next process. 
- Mutual exclusion: YES
- Progress: NO (it needs to always swap)
- Bounded waiting: YES (assuming that turn is updated fairly using RR)

**Algorithm 2**
```python
while True:
	flag[i] = True
	while flag[k]:
		pass
	# critical section
	flag[i] = False
	# remainder section
```
I first indicate my intention to enter the critical section. Then, while the other process is indicating their interest, I will let them go first. Otherwise, I enter the critical section. When I am done, I remove my interest indication.
- Mutual exclusion: YES (you can't enter the critical section if the other party indicate interest)
- Progress: NO (both processes can indicate interest at the same time -> waiting for each other)
- Bounded waiting: YES (the other process can enter the critical section a maximum of 1 time after you have indicated interest)

**Algorithm 3**
```python
while True:
	flag[i] = True
	turn = k
	while flag[k] and turn == k:
		pass
	# critical section
	flag[i] = False
	# remainder section
```
I first indicate my intention, and I let the other party go first. If the other party indicated their interest as well, they should enter first. Otherwise, I enter the critical section. When I am done, I remove my interet indication.
The only difference here is `turn = k` prevents deadlock, and it decides which one should go first.
- Mutual exclusion: YES
- Progress: YES (if P1 is in the remainder section, and P0 wants to enter, `flag[1]` is False and P0 can enter)
- Bounded waiting: YES

## OS-level Solutions
**TestAndSet**
```python
def testAndset(lock):
	initial_value = lock
	lock = True # Now it is locked
	return initial_value
	
while True:
	while testAndset(lock):
		pass
	# critical section
	lock = False # Now it is unlocked
	# remainder section
```
Must be atomic.
- Mutual exclusion: YES (only one process can acquire the lock at any time)
- Progress: YES (no waiting for each other; if you want to enter, you are free to enter)
- Bounded waiting: NO (busy waiting; one process may acquire the lock again and again)
	- Note that even RR cannot save this algorithm. If one process is just much much faster, RR does not detect this!

**Semaphore (busy waiting)**
```python
def Wait(S):
	while S <= 0:
		pass # busy waiting, when there is no spot
	S -= 1 # I claim the spot immediately once it is available

def Signal(S):
	S += 1 # I release the spot
	
while True:
	Wait(mutex)
	# critical section
	Signal(mutex)
	# remainder section
```
- Must be atomic. Obviously if `Wait()` is interrupted before it runs `S -= 1`, it would violate mutual exclusion.
- Pros: No context switch since the process does not voluntarily release anything. Cons: CPU utilization low due to busy waiting.
- Only works in multicore CPU

**Semaphore (blocking)**
```python
def Wait(S):
	S.value -= 1
	if S.value < 0: # No available resource
		block()

def Signal(S):
	S.value += 1
	if S.value <= 0: # There is at least 1 process blocked
		wakeup()
```
- Block():
	1. Dequeue current process from ready queue -> enqueue to list L
	2. Change state to waiting
- Wakeup():
	1. Dequeue from list L -> enqueue to ready queue
	2. Change state to ready
- Implementation must still be atomic, if not they block each other. Imagine you switch between `S.value -= 1` and the `if` statement, when `S = 1`.
- `S -= 1` should be at the start. If it is at the end, then it will violate mutual exclusion, since context switch can happen after `block()` is called.
	- But the same thing does not happen for `S += 1` in Signal().

You should look through two more implementation: producer-consumer bounded buffer and readers-writers problem.

## Deadlock
**Banker's Algorithm**
- Available matrix -> # of instances available for each resource
- Max -> Maximum request for each resource instance
- Allocation -> Currently allocated resource
- Need -> Max - Allocation
1. Initialize work = available, and finish array to be all false.
2. Find an unfinished process, and check if you can fulfill its need
3. If yes, then make it finished, and adds its allocation to work
4. Repeat, until either you can't fulfill any need, or you are done

**Resource-request Algorithm**
- Request -> the actual request that you need to check the legitimacy of
1. If request > need -> illegal; error
2. If request > available -> can't be fulfilled; wait
3. Pretend that you grant the request:
	- Available -= Request
	- Allocation+= Request
	- Need -= Request
4. Run the safety algorithm

## RTOS
### Fixed-priority Scheduling / Rate Monotonic
- Priorities are fixed across instances of recurrent processes
- Priorities are assigned based on T (periodic release)
- Simple implementation, predictable at high load
### Dynamic-priority Scheduling
- Priorities are assigned based on instance deadlines (NOT THE SAME AS PARAMETER d)
- Unpredictable during high load, harder implementation (requires online sorting)

## Memory Organization
How to allocate physical memory:
- Contiguous allocation (Fixed partitioning + Dynamis partitioning)
- Non-contiguous allocation (Paging + Segmentation)
### Fixed Partitioning
- Just divide the physical memory into fixed partitions
- Keep the partition table so you know which partition belong to which process
- Very similar to paging
- There is internal fragmentation (just like paging!)
### Dynamic Partitioning
- Don't believe in partitions, just holes!
- Has first-fit, best-fit, and worst-fit
- There is external fragmentation (since there's no partitions), but no internal fragmentation!
- Can reduce fragmentation by using compaction
### Paging
- Divide the logical memory into pages and physical memory into frames
- Then we do fixed partitioning for each page!
- There is internal fragmentation (of the last page of each process), but no external fragmentation!
- Logical address consists of $p$ (page number) and $d$ (offset). 
	- From the page size, you can get the offset. 
	- From the logical address space, you can substract the page offset to get the number of pages.
- Effective Access Time = $(\mu+\varepsilon)\alpha + (2\mu+\varepsilon)(1-\alpha)$
	- $\mu$ is the memory cycle
	- $\varepsilon$ is the TLB lookup time
#### Two-level Page-table Scheme
- We have two level such that it is easier to allocate in physical memory + increase in EAT
	- 32-bit machine = 32 bit logical address. 
	- If page size is 4K = $2^{12}$, it means the remaining 20 bits are for the page number.
	- There are $2^{20}$ pages! If each page is 4 bytes, it means there are $4 \times 2^{20} = 4$ MB of page table PER PROCESS.
- Too many pages, and there are mostly empty anyways. So, we want to create page tables for page tables.
	- Start from the inner index, the number of bit for it is equivalent to the number of entries per page table.
		- No. of entry in a page table = no of bit for page size - no of bit per entry
	- The outer index = no of bits for page number - no of bit for inner index (this is equivalent to the number of inner page tables)
- The logical address is then: outer index, inner index, page offset (top to bottom)
- Note that the outermost page table is always only one! This is the page table that you will load in its entirety to memory.
#### Inverted Page Table
- Usually one process = one page table
- But there might be too many page tables (they are proportional to logical address space)
- So instead, we may have one entry for each physical frame
	- <process-id, page-no>
	- Logical address: process-id, page-no, offset
- It will search for the process-id, page-no, and then retrieve the **INDEX** => this is the frame number!
### Segmentation
- Logical address: segment-no, offset
- Segment table contains: base, limit
1. Look up the segment table using segment-no; retrieve the base and limit
2. Check if offset < limit. If no, illegal
3. If yes, then add the base + offset -> physical memory address
- Suffer from external fragmentation

## Virtual Memory
- What happens when the memory is not big enough for the process? Backing store.
- We can page-in and page-out => demand paging
	- Add a valid-invalid bit on the page table
### Page Replacement Algorithm
1. FIFO -> Belady's anomaly
2. Optimal algorithm: Remove page that will not be used for the longest time
	- No Belady's anomaly
	- Inclusion property: Pages loaded in $n$ frames are always a subset of pages loaded in $n+1$ frames
3. LRU -> no Belady's anomaly, since it follows inclusion property
	- Implemented using a stack. If referenced, move to the top of the stack
	- LRU is the bottom of the stack
4. CLOCK (second-chance) -> Belady's anomaly
### Thrashing
Two algorithms to prevent thrashing: working-set model and page-fault frequency scheme

## File System
Now, instead of talking about allocating physical memory, we are allocating disks.
### File Allocation Methods
Remember that all would result in internal fragmentation (last block might not be completely utilized)
1. Contiguous allocation
	- Saves the starting location and the number of block
	- Supports random access (you can immediately go to the block in question)
	- It is a waste of space -> fragmentation
	- Example: if block size is 512 bytes, then logical address is $Q \times 512 + R$ 
		- The block you are looking at is at logical block $Q$, at $R^{\text{th}}$ byte (offset)
2. Linked allocation
	- Only need starting block
	- No waste of space
	- But does not support random access, and the index are located in the disk, so I/O
	- Example: block size is 512 bytes, and 4 bytes are reserved for pointer to the next block, then logical address is $Q \times 508 + R$ 
		- The block you are looking at is the $(Q+1)$ th block in the linked chain
		- The offset is $R + 4$ (the initial 4 for the pointer)
3. Indexed allocation
	- No waste of space (external fragmentation), supports random access
	- But needs to keep the index blocks and do address mapping
	- Calculating the number of index blocks needed:
		1. We need to find the number of logical blocks first. File size / block size.
		2. Then we find the number of entry per block. Block size / pointer size.
		3. We divide the value of (1) with (2)
	- Logical address is $Q \times 512 + R$
		- Go to index $Q$ of the index block, it is at the $R$th byte.
#### Inode
Special indexed allocation for UNIX.
Assume 4-byte block pointer and 4K bytes block.
- We have 12 direct pointers, which support $12 \times 4K$ file size.
- We have 1 single indirect pointer
	- 1 block of pointers -> $\frac{4K}{4}=2^{10}$ pointers
	- It can support $2^{10} \times 4K = 2^{22}$ file size
- We have 1 double indirect pointer
	- 1 block of pointers -> $2^{10}$ pointers
	- Each of that consists of another $2^{10}$ pointers
	- It can support $2^{10} \times 2^{10} \times 4K = 2^{32}$ file size
Going to directories is just switching between retrieving inode and retrieving block.
- You always retrieve inode first, and retrieve block last.
- You may stop at an inode if the destination is a directory and not a file.