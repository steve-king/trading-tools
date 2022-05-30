import { selectEquityCurves, selectChartData } from './equityCurveSlice'
import { EquityCurveState, TradeResult, EquityCurveItem } from './equityCurveTypes'

// Arrange
const sequence1 = [TradeResult.Win, TradeResult.Loss, TradeResult.Win]
const sequence2 = [TradeResult.Loss, TradeResult.Win, TradeResult.Loss]

const state: EquityCurveState = {
  startingBalance: 1000,
  winProbability: 65,
  riskPercent: 1,
  rewardRatio: 2,
  itemsPerSequence: 2,
  numSequences: 1,
  sequences: [sequence1, sequence2],
}

const expectedCurve1: EquityCurveItem[] = [
  {
    result: TradeResult.Win,
    pnl: { dollars: 20, percent: 2, rMultiples: 2 },
    balance: { dollars: 1020, percent: 2, rMultiples: 2 },
  },
  {
    result: TradeResult.Loss,
    pnl: { dollars: -10.2, percent: -1, rMultiples: -1 },
    balance: { dollars: 1009.8, percent: 0.98, rMultiples: 1 },
  },
  {
    result: TradeResult.Win,
    pnl: { dollars: 20.2, percent: 2, rMultiples: 2 },
    balance: { dollars: 1030, percent: 3, rMultiples: 3 },
  },
]

const expectedCurve2: EquityCurveItem[] = [
  {
    result: TradeResult.Loss,
    pnl: { dollars: -10, percent: -1, rMultiples: -1 },
    balance: { dollars: 990, percent: -1, rMultiples: -1 },
  },
  {
    result: TradeResult.Win,
    pnl: { dollars: 19.8, percent: 2, rMultiples: 2 },
    balance: { dollars: 1009.8, percent: 0.98, rMultiples: 1 },
  },
  {
    result: TradeResult.Loss,
    pnl: { dollars: -10.1, percent: -1, rMultiples: -1 },
    balance: { dollars: 999.7, percent: -0.03, rMultiples: 0 },
  },
]

test('selectEquityCurves()', () => {
  // Act
  const result = selectEquityCurves({ equityCurve: state })

  // Assert
  expect(result[0]).toEqual(expectedCurve1)
  expect(result[1]).toEqual(expectedCurve2)
})

test('selectChartData', () => {
  // Arrange
  const expectedChart1 = [
    expectedCurve1[0].balance,
    expectedCurve1[1].balance,
    expectedCurve1[2].balance,
  ]
  const expectedChart2 = [
    expectedCurve2[0].balance,
    expectedCurve2[1].balance,
    expectedCurve2[2].balance,
  ]

  // Act
  const result = selectChartData({ equityCurve: state })

  // Assert
  expect(result[0]).toEqual(expectedChart1)
  expect(result[1]).toEqual(expectedChart2)
})
