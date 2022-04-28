import Form from 'components/Form'
import Chart from 'components/Chart'
import Stats from 'components/Stats'

import { Grid } from '@mui/material'

import { useSelector } from 'react-redux'
import { selectChartData } from 'store/equityCurveSlice'

const SimulatorPage = () => {
  const chartData = useSelector(selectChartData)

  return (
    <>
      <h2>Equity Curve Simulator</h2>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Form />
        </Grid>
        <Grid item md={9}>
          <Chart data={chartData} />
          <br />
          <Stats />
        </Grid>
      </Grid>
    </>
  )
}

export default SimulatorPage
