import Form from 'components/Form'
import Chart from 'components/Chart'
import Stats from 'components/Stats'

import { Grid } from '@mui/material'

const SimulatorPage = () => {
  return (
    <>
      <h2>Simulator</h2>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Form />
        </Grid>
        <Grid item md={9}>
          <Chart />
          <Stats />
        </Grid>
      </Grid>
    </>
  )
}

export default SimulatorPage
