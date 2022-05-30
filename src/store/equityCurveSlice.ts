import { createSlice } from '@reduxjs/toolkit'
import {
  EquityCurveState,
  TradeResult,
  EquityCurveItem,
  MultiFormatStatItem,
  EquityCurveStats,
} from './equityCurveTypes'

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

  return sequences.map((seq) => calculateEquityCurve(seq, state.equityCurve))

  function calculateEquityCurve(sequence: TradeResult[], params: EquityCurveState) {
    const { startingBalance, riskPercent, rewardRatio } = params

    return sequence.reduce((equityCurve: EquityCurveItem[], result: TradeResult, i) => {
      const prevBalance = i > 0 ? equityCurve[i - 1].balance.dollars : startingBalance
      const prevBalanceR = i > 0 ? equityCurve[i - 1].balance.rMultiples : 0

      const risk = (riskPercent / 100) * prevBalance
      const pnl = result === TradeResult.Win ? rewardRatio * risk : risk * -1
      const pnlR = result === TradeResult.Win ? rewardRatio : -1
      const balanceDollars = prevBalance + pnl

      return equityCurve.concat({
        result,
        pnl: {
          dollars: Number(pnl.toFixed(2)),
          percent: Number(((pnl / prevBalance) * 100).toFixed(2)),
          rMultiples: pnlR,
        },
        balance: {
          dollars: Number(balanceDollars.toFixed(2)),
          percent: Number(
            (((balanceDollars - startingBalance) / startingBalance) * 100).toFixed(2)
          ),
          rMultiples: prevBalanceR + pnlR,
        },
      })
    }, [])
  }
}

export const selectChartData = (state: { equityCurve: EquityCurveState }) => {
  return selectEquityCurves(state).map((series) => series.map((item) => item.balance.dollars))
}

export const selectStats = (state: { equityCurve: EquityCurveState }): EquityCurveStats => {
  const placeholderValues: MultiFormatStatItem = { rMultiples: 8.5, dollars: 542, percent: 54 }

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
