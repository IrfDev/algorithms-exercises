// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  let visitedNodes = getVisitedMaze(maze);

  visitedNodes[yA][xA].openedBy = 1;
  visitedNodes[xB][xB].openedBy = 2;

  let aQueue = [visitedNodes[yA][xA]];
  let bQueue = [visitedNodes[yB][xB]];
  var iteration = 0;

  while (aQueue.length && bQueue.length) {
    iteration++;
    let aNeighbors = [];

    // Gather
    while (aQueue.length) {
      let coordinate = aQueue.shift();

      aNeighbors = aNeighbors.concat(
        getNeighbors(visitedNodes, coordinate.x, coordinate.y)
      );
    }

    // Process
    while (aNeighbors.length) {
      let currentNeighbor = aNeighbors.shift();

      if (currentNeighbor.openedBy === 2) {
        return currentNeighbor.length + iteration;
      } else if (currentNeighbor.openedBy === 0) {
        currentNeighbor.length = iteration;
        currentNeighbor.openedBy = 1;
        aQueue.push(currentNeighbor);
      }
    }

    let bNeighbors = [];

    // Gather
    while (bQueue.length) {
      let coordinate = bQueue.shift();

      bNeighbors = bNeighbors.concat(
        getNeighbors(visitedNodes, coordinate.x, coordinate.y)
      );
    }

    // Process
    while (bNeighbors.length) {
      let currentNeighbor = bNeighbors.shift();

      if (currentNeighbor.openedBy === 1) {
        return currentNeighbor.length + iteration;
      } else if (currentNeighbor.openedBy === 0) {
        currentNeighbor.length = iteration;
        currentNeighbor.openedBy = 2;
        bQueue.push(currentNeighbor);
      }
    }
  }

  console.log("iteration", iteration);

  return -1;
}

function getVisitedMaze(maze) {
  let visitedNodes = [];

  for (let yIndex = 0; yIndex < maze.length; yIndex++) {
    const yAxis = [];
    for (let xIndex = 0; xIndex < maze[yIndex].length; xIndex++) {
      const coordinate = {
        closed: maze[yIndex][xIndex] === 1,
        length: 0,
        openedBy: 0,
        x: xIndex,
        y: yIndex,
      };

      yAxis.push(coordinate);
    }
    visitedNodes.push(yAxis);
  }

  return visitedNodes;
}

function getNeighbors(visited, x, y) {
  let neighbors = [];

  // Up neighbor
  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    neighbors.push(visited[y - 1][x]);
  }

  // Down neighbor
  if (y + 1 < visited.length && !visited[y + 1][x].closed) {
    neighbors.push(visited[y + 1][x]);
  }

  // Left neighbor
  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    neighbors.push(visited[y][x - 1]);
  }

  // <Right> neighbor
  if (x + 1 < visited.length && !visited[y][x + 1].closed) {
    neighbors.push(visited[y][x + 1]);
  }

  return neighbors;
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0],
  ];
  it("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2],
  ];
  it("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  it("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ];
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2],
  ];
  it("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
