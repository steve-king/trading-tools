import { shuffle, winLossSequence, randomColour } from './utils'
import { TradeResult } from 'store/equityCurveTypes'

test('shuffle() - shuffles order of array', () => {
  // arange
  const input: number[] = [1, 2, 3, 4, 5]
  const inputLength = 5
  const inputSum = 15 // input.reduce((sum, item) => sum + item)

  // act
  const output = shuffle(input)
  const outputSum = output.reduce((sum, item) => sum + item)

  // assert
  expect(output).not.toEqual(input)
  expect(output.length).toBe(inputLength)
  expect(outputSum).toBe(inputSum)
})

// Because of randomness this test has a small chance of generating a false negative
test('winLoseSequence() - returns random Win/Loss array within 5% accuracy', () => {
  const probabilityPercent = 75
  const length = 100000 // Bigger number = lower probability of a false negative
  const numWinsMin = (probabilityPercent / 100) * length * 0.95 // 5% below target
  const numWinsMax = (probabilityPercent / 100) * length * 1.05 // 5% above target

  const output = winLossSequence(probabilityPercent, length)
  const numWins = output.filter((item) => item === TradeResult.Win).length

  // console.log(numWinsMin, numWinsMax, numWins)

  expect(output.length).toBe(length)
  expect(numWins).toBeGreaterThan(numWinsMin)
  expect(numWins).toBeLessThan(numWinsMax)
})

test('randomColour() - returns a randomised, valid rgba string', () => {
  // Regex grabbed from here: https://github.com/regexhq/rgba-regex
  const rgbaRegex = /^rgba\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d*(?:\.\d+)?)\)$/

  const opacity = 0.5
  const maxRgb = 50

  const output = randomColour(opacity, maxRgb)
  const outputValues = output.split('rgba(')[1].split(')')[0].split(', ')

  expect(rgbaRegex.test(output)).toBeTruthy()
  expect(Number(outputValues[0])).toBeLessThanOrEqual(maxRgb)
  expect(Number(outputValues[1])).toBeLessThanOrEqual(maxRgb)
  expect(Number(outputValues[2])).toBeLessThanOrEqual(maxRgb)
  expect(Number(outputValues[3])).toBe(opacity)
})
