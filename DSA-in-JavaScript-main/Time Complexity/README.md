# Time Complexity (Big O)

Time complexity describes how the runtime or memory usage of an algorithm grows as the input size increases.

## Why it matters

- Helps compare algorithms before implementation.
- Explains how code scales with larger input sizes.
- Guides choices between different approaches for the same problem.

## Common Big O notations

- O(1): Constant time
- O(log n): Logarithmic time
- O(n): Linear time
- O(n log n): Linearithmic time
- O(n^2): Quadratic time
- O(2^n): Exponential time

## Example

If an algorithm loops through an array once, its time complexity is usually O(n).

If it contains a nested loop over the same array, it is often O(n^2).

## Quick rule of thumb

- Avoid nested loops when possible for large inputs.
- Prefer operations that reduce repeated work.
- Big O is about growth rate, not exact runtime.
