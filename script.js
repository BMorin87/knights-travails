function knightMoves(startCell, endCell) {
  // Breadth-first search on possible moves from startCell.
  const knightPath = search(startCell, endCell);
  // The search functions returns the array of positions from startCell to endCell.
  // Log the result to the console.
}

function search(start, end) {
  const visitedCells = new Set();
  const queue = new Queue(start);

  // TODO: Add a move list that will track the shortest path from start to end.

  while (true) {
    const cell = queue.dequeue();
    const moves = getLegalMoves(cell);

    moves.forEach((move) => {
      if (move === end) {
        // Return the move list.
      }
      if (!visitedCells.has(move)) {
        queue.enqueue(move);
        visitedCells.add(move);
      }
    });
  }
}

function getLegalMoves(cell) {
  const eightMoves = getAllMoves(cell)
  return getLegalMoves(eightMoves);
}

function getAllMoves(cell) {
  // Return the eight moves by adding/subtracting cell coordinates.
}

function getLegalMoves(eightMoves) {
  eightMoves.forEach((move) => {
    // If a move is out of bounds, pare it from the move list.
  })
}

class Queue {
  constructor() {
    this.items = [];
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
  }

  dequeue() {
    if (this.frontIndex === this.backIndex) {
      return undefined; // Or throw an error if you prefer
    }
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex]; // Optional: for memory management
    this.frontIndex++;
    return item;
  }

  peek() {
    return this.items[this.frontIndex];
  }

  get size() {
    return this.backIndex - this.frontIndex;
  }

  get isEmpty() {
    return this.size === 0;
  }
}
