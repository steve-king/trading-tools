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
  const stats = useSelector(selectStats)
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Max Consecutive Losses:</TableCell>
              <TableCell>{stats.maxConsecutiveWins}</TableCell>
              <TableCell>Max Consecutive Wins:</TableCell>
              <TableCell>{stats.maxConsecutiveLosses}</TableCell>
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
              <TableCell align="right">{stats.avgExpectancy.rMultiples}</TableCell>
              <TableCell align="right">{stats.avgExpectancy.dollars}</TableCell>
              <TableCell align="right">{stats.avgExpectancy.percent}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Max Drawdown</TableCell>
              <TableCell align="right">{stats.maxDrawdown.rMultiples}</TableCell>
              <TableCell align="right">{stats.maxDrawdown.dollars}</TableCell>
              <TableCell align="right">{stats.maxDrawdown.percent}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Avg Return</TableCell>
              <TableCell align="right">{stats.avgReturn.rMultiples}</TableCell>
              <TableCell align="right">{stats.avgReturn.dollars}</TableCell>
              <TableCell align="right">{stats.avgReturn.percent}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Best Return</TableCell>
              <TableCell align="right">{stats.maxReturn.rMultiples}</TableCell>
              <TableCell align="right">{stats.maxReturn.dollars}</TableCell>
              <TableCell align="right">{stats.maxReturn.percent}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Worst Return</TableCell>
              <TableCell align="right">{stats.minReturn.rMultiples}</TableCell>
              <TableCell align="right">{stats.minReturn.dollars}</TableCell>
              <TableCell align="right">{stats.minReturn.percent}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Stats
