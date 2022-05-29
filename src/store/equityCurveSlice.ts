import { createSlice } from '@reduxjs/toolkit'

// Types
export interface EquityCurveState {
  startingBalance: number
  winProbability: number
  riskPercent: number
  rewardRatio: number
  itemsPerSequence: number
  numSequences: number
  sequences: TradeResult[][]
}

export enum TradeResult {
  Loss = 'LOSS',
  Win = 'WIN',
}

export interface EquityCurveItem {
  result: TradeResult
  pnl: number
  balance: number
}

export interface MultiFormatStatItem {
  rMultiples: number
  dollars: number
  percent: number
}

export interface EquityCurveStats {
  maxConsecutiveLosses: number
  maxConsecutiveWins: number
  avgExpectancy: MultiFormatStatItem
  maxDrawdown: MultiFormatStatItem
  avgReturn: MultiFormatStatItem
  maxReturn: MultiFormatStatItem
  minReturn: MultiFormatStatItem
}

// Reducer
const equityCurveSlice = createSlice({
  name: 'equityCurve',
  initialState: {
    startingBalance: 1000,
    winProbability: 65,
    riskPercent: 1,
    rewardRatio: 2,
    itemsPerSequence: 100,
    numSequences: 5,
    sequences: [],
  },
  reducers: {
    setParams: (state, { payload }) => {
      const newState = {
        ...state,
        ...payload,
      }

      return newState
    },
  },
})

// Actions
export const { setParams } = equityCurveSlice.actions

// Selectors
export const selectEquityCurves = (state: { equityCurve: EquityCurveState }) => {
  const { sequences } = state.equityCurve

  function calculateEquityCurve(sequence: TradeResult[], params: EquityCurveState) {
    const { startingBalance, riskPercent, rewardRatio } = params

    return sequence.reduce((equityCurve: EquityCurveItem[], result: TradeResult, i) => {
      const prevBalance = i > 0 ? equityCurve[i - 1].balance : startingBalance
      const risk = (riskPercent / 100) * prevBalance
      const pnl = result === TradeResult.Win ? rewardRatio * risk : risk * -1
      const balance = prevBalance + pnl

      return equityCurve.concat({
        result,
        pnl: Number(pnl.toFixed(2)),
        balance: Number(balance.toFixed(2)),
      })
    }, [])
  }

  return sequences.map((seq) => calculateEquityCurve(seq, state.equityCurve))
}

export const selectChartData = (state: { equityCurve: EquityCurveState }) => {
  return selectEquityCurves(state).map((series) => series.map((item) => item.balance))
}

export const selectStats = (state: { equityCurve: EquityCurveState }): EquityCurveStats => {
  const placeholderValues = { rMultiples: 8.5, dollars: 542, percent: 54 }

  return {
    maxConsecutiveLosses: 5,
    maxConsecutiveWins: 10,
    avgExpectancy: placeholderValues,
    maxDrawdown: placeholderValues,
    avgReturn: placeholderValues,
    maxReturn: placeholderValues,
    minReturn: placeholderValues,
  }
}

// Reducer export
export default equityCurveSlice.reducer
