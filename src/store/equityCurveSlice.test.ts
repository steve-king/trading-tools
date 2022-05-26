import {
  selectEquityCurves,
  selectChartData,
  EquityCurveState,
  TradeResult,
  EquityCurveItem,
} from './equityCurveSlice'

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
    pnl: 20,
    balance: 1020,
  },
  {
    result: TradeResult.Loss,
    pnl: -10.2,
    balance: 1009.8,
  },
  {
    result: TradeResult.Win,
    pnl: 20.2,
    balance: 1030,
  },
]

const expectedCurve2: EquityCurveItem[] = [
  {
    result: TradeResult.Loss,
    pnl: -10,
    balance: 990,
  },
  {
    result: TradeResult.Win,
    pnl: 19.8,
    balance: 1009.8,
  },
  {
    result: TradeResult.Loss,
    pnl: -10.1,
    balance: 999.7,
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
