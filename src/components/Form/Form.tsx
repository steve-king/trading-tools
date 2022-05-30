import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField, Card, CardContent } from '@mui/material'
import { setParams } from 'store/equityCurveSlice'
import { EquityCurveState } from 'store/equityCurveTypes'
import { winLossSequence } from 'utils/utils'

const Form = () => {
  // Internal form state
  const initialState = useSelector((state: { equityCurve: EquityCurveState }) => state.equityCurve)
  const [formData, setFormData] = useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  // Submit + dispatch data
  const dispatch = useDispatch()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(
      setParams({
        ...formData,
        sequences: new Array(formData.numSequences).fill(null).map(() => {
          const sequence = winLossSequence(formData.winProbability, formData.itemsPerSequence)
          return sequence
        }),
      })
    )
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            type="number"
            name="startingBalance"
            value={formData.startingBalance}
            label="Starting balance ($)"
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
          />

          <TextField
            type="number"
            name="winProbability"
            value={formData.winProbability}
            label="Win rate (%)"
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
          />

          <TextField
            type="number"
            name="riskPercent"
            value={formData.riskPercent}
            label="Risk per trade (%)"
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
          />

          <TextField
            type="number"
            name="rewardRatio"
            value={formData.rewardRatio}
            label="Reward ratio (n:1)"
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
            inputProps={{ step: 0.1 }}
          />

          <TextField
            type="number"
            name="itemsPerSequence"
            value={formData.itemsPerSequence}
            label="Number of trades"
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
          />

          <TextField
            type="number"
            name="numSequences"
            value={formData.numSequences}
            label="Number of passes"
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
            inputProps={{ max: 20 }}
          />

          <br />
          <br />
          <Button type="submit" variant="contained" fullWidth>
            Run Simulation
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Form
