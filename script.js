class KnightSearch {
  // Breadth-first search on possible moves from starting coordinates.
  knightMoves(startCell, endCell) {
    let endNode;

    try {
      endNode = this.search(startCell, endCell);
    } catch (e) {
      console.log(e);
      return e;
    }

    const path = this.traverse(endNode);
    this.logSolution(path);
  }

  search(start, end) {
    // Initially, the starting cell has been visited but not searched.
    const visitedCells = new Set(start);
    const root = new TreeNode(start);
    const search = new Queue();
    search.enqueue(root);

    // Begin the search.
    while (search.size > 0) {
      const parent = search.dequeue();
      const moves = this.getLegalMoves(parent.coordinates);

      for (const move of moves) {
        // Create a new node for each eligible move.
        const reachableNode = new TreeNode(move, parent);

        // Success.
        if (this.coordinatesAreEqual(move, end)) {
          return reachableNode;
        }
        // Visit any new cells and queue them for search.
        if (!visitedCells.has(move)) {
          visitedCells.add(move);
          search.enqueue(reachableNode);
        }
        // Otherwise discard the node and process the next one.
      }
    }

    throw new Error(
      "Search finished without finding a path from start to end."
    );
  }

  getLegalMoves(cell) {
    const eligibleMoves = this.getAllMoves(cell);
    return this.checkOutOfBounds(eligibleMoves);
  }

  getAllMoves(cell) {
    const x = cell[0];
    const y = cell[1];
    // Starting on the positive x-axis and moving CCW.
    let moves = [];
    moves.push([x + 2, y + 1]);
    moves.push([x + 1, y + 2]);
    moves.push([x - 1, y + 2]);
    moves.push([x - 2, y + 1]);
    moves.push([x - 2, y - 1]);
    moves.push([x - 1, y - 2]);
    moves.push([x + 1, y - 2]);
    moves.push([x + 2, y + 1]);
    return moves;
  }

  checkOutOfBounds(eligibleMoves) {
    const minX = 0;
    const minY = 0;
    const maxX = 7;
    const maxY = 7;
    return eligibleMoves.filter(
      ([x, y]) => x >= minX && x <= maxX && y >= minY && y <= maxY
    );
  }

  coordinatesAreEqual(a, b) {
    if (a[0] === b[0] && a[1] === b[1]) {
      return true;
    }
    return false;
  }

  traverse(end) {
    let path = [];
    path.push(end.coordinates);

    let node = end;
    while (node.parent !== null) {
      path.push(node.parent.coordinates);
      node = node.parent;
    }
    // We started reading from the end, so reverse the path to list coordinates from the start.
    return path.reverse();
  }

  logSolution(path) {
    console.log(`You made it in ${path.length - 1} move(s)!`);
    console.log("Here's your path:");
    for (const move of path) {
      console.log(`    [${move[0]},${move[1]}]`);
    }
  }
}

class TreeNode {
  constructor(coordinates, parent = null) {
    this.coordinates = coordinates;
    this.parent = parent;
  }
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

const searcher = new KnightSearch();
start = [0, 0];
end = [7, 7];
searcher.knightMoves(start, end);
