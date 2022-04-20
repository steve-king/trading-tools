import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const simulatorSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {},
})

// named export of simulatorSlice.actions here
export default simulatorSlice.reducer
