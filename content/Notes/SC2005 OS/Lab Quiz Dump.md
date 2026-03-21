---
created: 2025-11-19T00:25
modified: 2025-11-19T01:35
---
## Lab 1
- Applications, kernel and hardware simulator in NachOS = one UNIX process
- Three important sections: NachOS kernel -> Machine (simulates all hardware) -> User application 
- How does NachOS do CPU scheduling? We have scheduler and threads.
### Scheduler
- Maintains a ready queue of threads
- It is invoked whenever the current thread gives up (non-preemptive)
- Three important code:
	1. `ReadyToRun(thread)`: adds to the ready queue
	2. `FindNextToRun()`: returns the thread at the front of ready queue
	3. `Run(thread)`: switch from one thread to another (including context switching)
### Thread
- List of states:
	1. READY
	2. RUNNING
	3. BLOCKED (equivalent to waiting)
	4. JUST_CREATED (temporary, useless)
- List of functions:
	1. `Fork(function, arg, flag)`: Turns the function into a process and calls `ReadyToRun()`.
	2. `Yield()`: Finds the next thread to run using `FindNextToRun()`. If another thread is found, then turn to current thread to READY and `Run()` the new thread.
	3. `Sleep()`: Set status to BLOCKED, find another thread to run. This is called by the blocking semaphores!
	4. `Finish()`: End of execution. Mark this thread for termination. Call `Sleep()` and never wake up.

## Lab 2
### Timers
- They are used to trigger an interrupt (preemptive)
1. `TimerInterruptHandler()`: Executes whenever associated timer expires and interrupt is triggrered.
2. `TimerExpired()`: Executes whenever timer expires, and calls the `TimerInterruptHandler()` function.
3. `TimeOfNextInterrupt()`: Returns an integer denoting the number of time ticks. Used to schedule an interrupt using the timer -> relative time.
### Interrupt
- There is also a pending list for interrupts that are pending
1. `Schedule()`: Insert a new interrupt to the pending list (which is sorted)
2. `OneTick()`: Function to process a single tick. Increase the number of tick. Calls `CheckIfDue()`, and if it returns True, calls `Yield()`
3. `CheckIfDue()`: Checks if the pendingInterrupt at the head of the pending list should be triggered. If yes, runs `TimerExpired()`
4. `YieldOnReturn()`: Called by `TimerInterruptHandler()`. Force `OneTick()` to trigger a context switch

## Lab 3
- Remember that a thread will never run until you bind it to a certain function using `Fork`.
- There are three different synchronisation primitives in NachOS: Semaphores, Locks, and Condition variables
### Semaphores
1. `P()`: equivalent to Wait() -> waits until the value of semaphore is > 0
	- If the value is zero (no resource is available), then the calling thread is appended to the waiting queue (like list L) and is put to sleep.
2. `V()`: equivalent to Signal() -> increment the semaphore value and wakes up the first thread in the waiting queue and put it in the ready list.
### Locks
- A lock can either be FREE or BUSY. We have a queue for the lock. We can either `Acquire()` it or `Release()` it.
### Condition Variables
- They require a lock.
```cpp
lock->Acquire();
while (!condition) {
    cond->Wait(lock);
}
// condition is true here, and lock is held
... critical section ...
lock->Release();
```
1. `Wait(lock)`: Releases the lock. Relinquishes CPU until signaled (put into the waiting queue and sleep). After waking up, re-acquire the lock.
2. `Signal(lock)`: Wakes up the first thread in the waiting queue -> done by the producer, not by the same process. The same process should just release the lock.
3. `Broadcast(lock)`: Wakes up all threads in the waiting queue.

## Lab 4
- There are two things: TLB and IPT (Inverted Page Table)
- `Translate()`
	1. Calculate the virtual page number
	2. Look up VPN in TLB
	3. If lookup is successful, calculate the physical address
	4. If lookup fails, call `updateTLB` and then `Translate` again
- `updateTLB()`
	1. Calls `vpnToPhyPage`, which checks the IPT
	2. If vpn is found in the IPT, update the TLB by calling `insertToTLB`
	3. Otherwise, page fault. Perform paging adn then update the TLB
- `PageOutPageIn()`
	1. Determine the victim frame using LRU
	2. Page out the victim page (write to the swap file / backing store)
	3. Page in the new page (load in from the swap file)