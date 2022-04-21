import { createSlice } from '@reduxjs/toolkit'
import { generateWinLossSequence, shuffle } from 'utils'

// Type definitions
export interface SimulatorForm {
  winRate: number
  riskPerTrade: number
  rewardRiskRatio: number
  numTrades: number
  numPasses: number
  startingBalance: number
}

export interface SimulatorState {
  formData: SimulatorForm
}

// Reducer
const simulatorSlice = createSlice({
  name: 'simulator',
  initialState: {
    formData: {
      winRate: 50,
      riskPerTrade: 1,
      rewardRiskRatio: 2,
      numTrades: 100,
      numPasses: 5,
      startingBalance: 1000,
    },
  },
  reducers: {
    submitForm: (state, action) => {
      state.formData = action.payload
    },
  },
})

// Actions
export const { submitForm } = simulatorSlice.actions

// Selectors

export default simulatorSlice.reducer

const sequence = generateWinLossSequence(0.6, 100)
console.log(sequence)
console.log(shuffle([...sequence]))
