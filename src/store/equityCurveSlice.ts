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

export interface EquityCurveItem {
  result: 'win' | 'loss'
  pnl: number
  balance: number
}

// Reducer
const equityCurveSlice = createSlice({
  name: 'equityCurve',
  initialState: {
    startingBalance: 1000,
    winPercent: 50,
    riskPercent: 1,
    rewardRatio: 2,
    itemsPerSequence: 10,
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
    },
  },
})

// Actions
export const { setParams } = equityCurveSlice.actions

const calculateEquityCurve = (sequence: [], params: EquityCurveState) => {
  const { startingBalance, riskPercent, rewardRatio } = params

  return sequence.reduce((equityCurve: EquityCurveItem[], result: 'win' | 'loss', i) => {
    const prevBalance = i > 0 ? equityCurve[i - 1].balance : startingBalance
    const risk = (riskPercent / 100) * prevBalance
    const pnl = result === 'win' ? rewardRatio * risk : risk * -1
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

// Default reducer export
export default equityCurveSlice.reducer
