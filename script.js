function dijkstra(graph, start) {
    const distances = {};
    const visited = new Set();
    const priorityQueue = new PriorityQueue();

    // Initialize distances
    for (const vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
    }

    // Add start vertex to priority queue
    priorityQueue.enqueue(start, 0);

    // Dijkstra's algorithm
    while (!priorityQueue.isEmpty()) {
        const { vertex: currentVertex, priority: currentDistance } = priorityQueue.dequeue();

        // Mark current vertex as visited
        visited.add(currentVertex);

        // Visit neighbors
        for (const neighbor in graph[currentVertex]) {
            if (!visited.has(neighbor)) {
                const distanceToNeighbor = currentDistance + graph[currentVertex][neighbor];
                if (distanceToNeighbor < distances[neighbor]) {
                    distances[neighbor] = distanceToNeighbor;
                    priorityQueue.enqueue(neighbor, distanceToNeighbor);
                }
            }
        }
    }

    return distances;
}

// Priority queue implementation
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.queue.shift();
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Example graph
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

// Example usage
console.log(dijkstra(graph, 'A')); // Output: { 'A': 0, 'B': 4, 'C': 2, 'D': 5 }
