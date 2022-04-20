import { useState } from 'react'

import { Button, TextField } from '@mui/material'

const Form = () => {
  const [formData, setFormData] = useState({
    winRate: 50,
    riskPerTrade: 1,
    rewardRiskRatio: 2,
    numTrades: 100,
    numPasses: 5,
    startingBalance: 1000,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('SUBMIT')
    console.log(formData)

    // TODO
    // Call redux action with formData
  }

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
