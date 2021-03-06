import { TradeResult } from 'store/equityCurveTypes'

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
 * @param winProbability - probability of any one data point being a win (number between 0 and 100)
 * @param length - length of the sequence (number of trades)
 * @returns Array of win/loss strings
 */
export function winLossSequence(winProbability: number, length: number): TradeResult[] {
  let sequence = []

  for (let i = 0; i < length; i++) {
    let win = Math.random() <= winProbability / 100
    sequence.push(win ? TradeResult.Win : TradeResult.Loss)
  }

  return sequence
}

/**
 * Generate a random rgba colour string with predetermined opacity
 * @param opacity
 * @param max - Max value for the rgb parameters. Allows for more consistent output (avoid overly faint colours)
 * @returns
 */
export function randomColour(opacity = 1, max = 256) {
  const random = () => Math.floor(Math.random() * max)
  return `rgba(${random()}, ${random()}, ${random()}, ${opacity})`
}

/**
 * Get the maximum number of consecutive matching key:value pairs in an array object (strict comparison)
 * @param itemToMatch
 * @param items
 * @returns number
 */
export function maxConsecutiveMatches(keyToMatch: string, valueToMatch: any, items: any[]): number {
  let count = 0
  let maxCount = 0

  items.forEach((item) => {
    if (item[keyToMatch] === valueToMatch) {
      count++
    } else {
      maxCount = count > maxCount ? count : maxCount
      count = 0
    }
  })

  return maxCount
}
