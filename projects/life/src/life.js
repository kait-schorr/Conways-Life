/**
 * Implementation of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  //NOTE:  Iterate through Array2D row first then column
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {
  /**
   * Constructor
   */
  constructor(width, height) {
    // !!!! IMPLEMENT ME !!!!
    this.width = width;
    this.height = height;
    this.cells = [
      Array2D(this.width, this.height),
      Array2D(this.width, this.height)
    ];
    this.currentBufferIndex = 0;

    this.randomize();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.cells[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] = 0;
      }
    }
  }
  dropGlider() {
    let x = Math.floor(Math.random() * (this.width - 2));
    let y = Math.floor(Math.random() * (this.height - 2));
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

    backBuffer[y - 1][x] = 1;
    backBuffer[y + 1][x] = 1;
    backBuffer[y + 1][x - 1] = 1;
    backBuffer[y][x + 1] = 1;
    backBuffer[y + 1][x + 1] = 1;
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        this.cells[this.currentBufferIndex][height][width] =
          Math.random() > 0.6 ? 1 : 0;
      }
    }
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let currentBuffer = this.cells[this.currentBufferIndex];
    let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];
    function isAlive(height, width) {
      let aliveNeighbors = 0;

      if (width > 0) {
        if (currentBuffer[height][width - 1] === 1) {
          aliveNeighbors++;
        }
      }
      //North
      if (height > 0) {
        if (currentBuffer[height - 1][width] === 1) {
          aliveNeighbors++;
        }
      }
      //East
      if (width < this.width - 1) {
        if (currentBuffer[height][width + 1] === 1) {
          aliveNeighbors++;
        }
      }

      //South
      if (height < this.height - 1) {
        if (currentBuffer[height + 1][width] === 1) {
          aliveNeighbors++;
        }
      }
      //Southwest
      if (height < this.height - 1 && width > 0) {
        if (currentBuffer[height + 1][width - 1] === 1) {
          aliveNeighbors++;
        }
      }
      //Southeast
      if (height < this.height - 1 && width < this.width - 1) {
        if (currentBuffer[height + 1][width + 1] === 1) {
          aliveNeighbors++;
        }
      }
      // NW
      if (height > 0 && width > 0) {
        if (currentBuffer[height - 1][width - 1] === 1) {
          aliveNeighbors++;
        }
      }
      //NE
      if (height > 0 && width < this.width - 1) {
        if (currentBuffer[height - 1][width + 1] === 1) {
          aliveNeighbors++;
        }
      }
      if (currentBuffer[height][width] === 1) {
        switch (aliveNeighbors) {
          case 0:
            backBuffer[height][width] = 0;
            break;
          case 1:
            backBuffer[height][width] = 0;
            break;
          case 2:
            backBuffer[height][width] = 1;
            break;
          case 3:
            backBuffer[height][width] = 1;
            break;
          default:
            backBuffer[height][width] = 0;
        }
      } else if (
        (currentBuffer[height][width] === 0) &
        (aliveNeighbors === 3)
      ) {
        backBuffer[height][width] = 1;
      } else {
        backBuffer[height][width] = currentBuffer[height][width];
      }
    }
    for (let height = 0; height < this.height; height++) {
      for (let width = 0; width < this.width; width++) {
        isAlive.call(this, height, width);
      }
    }
    this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
  }
}

export default Life;
