/**
 * Randomise the order of elements in an array
 * @param array - the array to be randomised
 * @returns - randomised copy of the array
 * --
 * Taken from:
 * https://stackoverflow.com/a/2450976
 */
export function shuffle(array: any[]): any[] {
  let currentIndex = array.length
  let randomIndex: number

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

/**
 * Generate a randomised sequence of wins and losses (true/false)
 * @param winRate - probability of a win (number between 0 and 1)
 * @param length - length of the sequence (number of trades)
 * @returns An array of boolean values
 */
export function generateWinLossSequence(winRate: number, length: number): boolean[] {
  let sequence = []

  for (let i = 0; i < length; i++) {
    let win = i < winRate * length
    sequence.push(win ? true : false)
  }

  return sequence
}
