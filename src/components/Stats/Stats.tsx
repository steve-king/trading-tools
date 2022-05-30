import { useSelector } from 'react-redux'
import { selectStats } from 'store/equityCurveSlice'
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

const Stats = () => {
  const {
    maxConsecutiveWins,
    maxConsecutiveLosses,
    avgExpectancy,
    maxDrawdown,
    avgReturn,
    maxReturn,
    minReturn,
  } = useSelector(selectStats)
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Max Consecutive Losses:</TableCell>
              <TableCell>{maxConsecutiveLosses}</TableCell>
              <TableCell>Max Consecutive Wins:</TableCell>
              <TableCell>{maxConsecutiveWins}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">R</TableCell>
              <TableCell align="right">$</TableCell>
              <TableCell align="right">%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Avg Expectancy</TableCell>
              <TableCell align="right">{avgExpectancy.rMultiples}</TableCell>
              <TableCell align="right">{avgExpectancy.dollars.toFixed(2)}</TableCell>
              <TableCell align="right">{avgExpectancy.percent}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Max Drawdown</TableCell>
              <TableCell align="right">{maxDrawdown.rMultiples}</TableCell>
              <TableCell align="right">{maxDrawdown.dollars}</TableCell>
              <TableCell align="right">{maxDrawdown.percent}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Avg Return</TableCell>
              <TableCell align="right">{avgReturn.rMultiples}</TableCell>
              <TableCell align="right">{avgReturn.dollars}</TableCell>
              <TableCell align="right">{avgReturn.percent}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Best Return</TableCell>
              <TableCell align="right">{maxReturn.rMultiples}</TableCell>
              <TableCell align="right">{maxReturn.dollars}</TableCell>
              <TableCell align="right">{maxReturn.percent}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Worst Return</TableCell>
              <TableCell align="right">{minReturn.rMultiples}</TableCell>
              <TableCell align="right">{minReturn.dollars}</TableCell>
              <TableCell align="right">{minReturn.percent}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Stats
