import { TradeResult } from 'store/equityCurveSlice'

/**
 * Randomise the order of elements in an array
 * @param oldArray - the array to be randomised
 * @returns - randomised copy of the array
 * --
 * Taken from:
 * https://stackoverflow.com/a/2450976
 */
export function shuffle(oldArray: any[]): any[] {
  const array = [...oldArray]

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
 * @param winPercent - probability of a win (number between 0 and 100)
 * @param length - length of the sequence (number of trades)
 * @returns Array of win/loss strings
 */
export function randomisedWinLossSequence(winPercent: number, length: number): TradeResult[] {
  let sequence = []

  for (let i = 0; i < length; i++) {
    let win = i < (winPercent / 100) * length
    sequence.push(win ? TradeResult.Win : TradeResult.Loss)
  }

  return shuffle(sequence)
}

/**
 * Generate a random rgba colour string with predetermined opacity
 * @param opacity
 * @returns
 */
export function randomColour(opacity = 1) {
  const random = () => Math.floor(Math.random() * 256)
  return `rgba(${random()}, ${random()}, ${random()}, ${opacity})`
}
