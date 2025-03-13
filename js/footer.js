const facts = [
  "Linear Search: While easy to implement, it works best on small or unsorted datasets due to its O(n) performance.",
  "Binary Search: This algorithm only works on sorted arrays, but it can find items incredibly fast with O(log n) efficiency.",
  "Sliding Window: By reusing previous computations, this technique efficiently processes contiguous subarrays to solve complex problems.",
  "Prefix Sum: With an O(n) preprocessing step, it transforms multiple range sum queries into constant-time operations, ideal for repeated queries.",
  "Bubble Sort: Although conceptually simple and great for understanding sorting, its O(n²) time complexity makes it impractical for large datasets.",
  "Selection Sort: It minimizes swap operations—handy when swaps are costly—even though it still performs O(n²) comparisons.",
  "Quick Sort: Known for its speed on average (O(n log n)), using randomized pivots can help mitigate its worst-case scenario.",
  "A* Algorithm: Balancing actual cost with heuristic estimates, A* smartly finds the shortest path, making it a staple in pathfinding applications.",
  "Sieve of Eratosthenes: This ancient yet efficient method marks multiples to generate all prime numbers up to a limit, a technique still used today.",
  "Binary Search Tree (BST): A balanced BST allows fast search, insertion, and deletion operations, forming the backbone of many complex data structures.",
  "Pascal's Triangle: Beyond providing binomial coefficients, it reveals hidden patterns like the Fibonacci sequence, offering rich insights into combinatorics.",
];
const randomFact = facts[Math.floor(Math.random() * facts.length)];
document.getElementById("fun-fact-text").innerText = randomFact;
