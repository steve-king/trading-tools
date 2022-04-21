import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@mui/material'
import { SimulatorForm, SimulatorState, submitForm } from 'store/simulatorSlice'

const Form = () => {
  const dispatch = useDispatch()

  const initialData = useSelector((state: { simulator: SimulatorState }) => {
    return state.simulator.formData
  })
  const [formData, setFormData] = useState<SimulatorForm>(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: call a middleware which will generate our randomised win/loss sequences
    dispatch(submitForm(formData))
  }

  console.log(formData)

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="number"
        name="winRate"
        label="Win rate (%)"
        value={formData.winRate}
        onChange={handleChange}
        variant="standard"
        margin="normal"
        fullWidth
      />

      <TextField
        type="number"
        name="riskPerTrade"
        label="Risk per trade (%)"
        value={formData.riskPerTrade}
        onChange={handleChange}
        variant="standard"
        margin="normal"
        fullWidth
      />

      <TextField
        type="number"
        name="rewardRiskRatio"
        label="Reward ratio (n:1)"
        value={formData.rewardRiskRatio}
        onChange={handleChange}
        variant="standard"
        margin="normal"
        fullWidth
        inputProps={{ step: 0.1 }}
      />

      <TextField
        type="number"
        name="numTrades"
        label="Number of trades"
        value={formData.numTrades}
        onChange={handleChange}
        variant="standard"
        margin="normal"
        fullWidth
      />

      <TextField
        type="number"
        name="numPasses"
        label="Number of passes"
        value={formData.numPasses}
        onChange={handleChange}
        variant="standard"
        margin="normal"
        fullWidth
      />

      <TextField
        type="number"
        name="startingBalance"
        label="Starting balance ($)"
        value={formData.startingBalance}
        onChange={handleChange}
        variant="standard"
        margin="normal"
        fullWidth
      />
      <br />
      <br />
      <Button type="submit" variant="contained" fullWidth>
        Run Simulation
      </Button>
    </form>
  )
}

export default Form
