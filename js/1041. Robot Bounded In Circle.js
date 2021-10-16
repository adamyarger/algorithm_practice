

var isRobotBounded = function (instructions) {
  let x = 0;
  let y = 0

  // [x, y]... [0, 1] means move up y by 1 (north)
  let dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]

  let i = 0

  for (let j = 0; j < instructions.length; j++) {
    if (instructions[j] === 'R') {
      // turn one time turn right
      i = (i + 1) % 4
    } else if (instructions[j] === 'L') {
      // turn 3 time is same as turn left
      i = (i + 3) % 4
    } else {
      x += dir[i][0]
      y += dir[i][1]
    }
  }

  return (x === 0 && y === 0) || i > 0
}


console.log(isRobotBounded('GGLLGG'))


var isRobotBounded = function (instructions) {
  let [x, y] = [0, 0]
  // options for x y cords
  const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]

  /*
  0 = north
  1 = east
  2 = south
  3 = west
  */
  let i = 0

  for (let j = 0; j < instructions.length; j++) {
    if (instructions[j] === 'L') {
      i = (i + 3) % 4
    } else if (instructions[j] === 'R') {
      i = (i + 1) % 4
    } else {
      x += dir[i][0]
      y += dir[i][1]
    }
  }

  // either we start at the same cords or were not facing north
  return (x === 0 && y === 0) || i > 0
};