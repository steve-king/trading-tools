import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/">Simulator</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </ul>
  </nav>
)

export default Nav
