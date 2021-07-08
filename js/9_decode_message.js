/**
 * 
 * Your are given a 2-D array of characters. There is a hidden message in it.

I B C A L K A
D R F C A E A
G H O E L A D
The way to collect the message is as follows

start at top left
move diagonally down right
when cannot move any more, try to switch to diagonally up right
when cannot move any more, try switch to diagonally down right, repeat 3
stop when cannot neither move down right or up right. the character on the path is the message
for the input above, IROCLED should be returned.

notes

if no characters could be collected, return empty string
 */



/**
 * @param {string[][]} message
 * @return {string}
 * 
 * check lengths
 * 
 */
function decode(message) {
  const rows = message.length
  const cols = message[0].length

  if (!rows || !cols) return ''

  let result = ''
  let row = 0
  let col = 0
  let directionY = 1

  // why row > -1??
  while (col < cols && row < rows && row > -1) {
    result += message[row][col]
    col += 1
    // direction is for eithe rgoing up or down
    row += directionY

    if (row > rows - 1) {
      // direction is up
      directionY = -1
      // we went past by 1 and we need to go up 1
      row -= 2
    } else if (row < 0) {
      // we need to go down
      directionY = 1
      row += 2
    }
  }

  return result
}



const message = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ['G', 'H', 'O', 'E', 'L', 'A', 'D']
]

console.log(decode(message))
