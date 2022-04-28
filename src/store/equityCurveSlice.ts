import { createSlice } from '@reduxjs/toolkit'

export interface EquityCurveState {
  startingBalance: number
  winPercent: number
  riskPercent: number
  rewardRatio: number
  itemsPerSequence: number
  numSequences: number
  sequences: []
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

// Reducer
const equityCurveSlice = createSlice({
  name: 'equityCurve',
  initialState: {
    startingBalance: 1000,
    winPercent: 55,
    riskPercent: 1,
    rewardRatio: 2,
    itemsPerSequence: 100,
    numSequences: 5,
    sequences: [],
  },
  reducers: {
    setParams: (
      state,
      {
        payload: {
          startingBalance,
          winPercent,
          riskPercent,
          rewardRatio,
          itemsPerSequence,
          numSequences,
          sequences,
        },
      }
    ) => {
      state.startingBalance = startingBalance
      state.winPercent = winPercent
      state.riskPercent = riskPercent
      state.rewardRatio = rewardRatio
      state.itemsPerSequence = itemsPerSequence
      state.numSequences = numSequences
      state.sequences = sequences

      // Can we do something like this instead? TypeScript doesn't like it...
      // Object.keys(action.payload).forEach((key) => (state[key] = action.payload[key]))
    },
  },
})

// Actions
export const { setParams } = equityCurveSlice.actions

const calculateEquityCurve = (sequence: [], params: EquityCurveState) => {
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

// Selectors
export const selectEquityCurves = (state: { equityCurve: EquityCurveState }) => {
  const { sequences } = state.equityCurve
  return sequences.map((seq) => calculateEquityCurve(seq, state.equityCurve))
}

export const selectChartData = (state: { equityCurve: EquityCurveState }) => {
  return selectEquityCurves(state).map((series) => series.map((item) => item.balance))
}

export const selectStats = (state: { equityCurve: EquityCurveState }) => {
  //selectEquityCurves(state)
}

// Default reducer export
export default equityCurveSlice.reducer
