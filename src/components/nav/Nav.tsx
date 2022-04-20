import { NavLink, useLocation } from 'react-router-dom'
import { Box, Tab, Tabs } from '@mui/material'

const Nav = () => {
  const { pathname } = useLocation()
  return (
    <nav>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={pathname}>
          <Tab label="Equity Simulator" component={NavLink} to="/" value="/" />
          <Tab label="About" component={NavLink} to="/about" value="/about" />
        </Tabs>
      </Box>
    </nav>
  )
}

export default Nav
