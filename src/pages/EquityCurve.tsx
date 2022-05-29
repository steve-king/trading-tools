import Form from 'components/Form'
import Chart from 'components/Chart'
import Stats from 'components/Stats'

import { Grid, Card, CardContent } from '@mui/material'

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
          {chartData.length ? (
            <Chart data={chartData} />
          ) : (
            <Card>
              <CardContent>
                <p style={{ textAlign: 'center' }}>
                  Click "Run simulation" to generate equity curve data.
                </p>
              </CardContent>
            </Card>
          )}
          <br />
          <Stats />
        </Grid>
      </Grid>
    </>
  )
}

export default SimulatorPage
