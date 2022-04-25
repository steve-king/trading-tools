import { useSelector } from 'react-redux'
import { selectEquityCurves } from 'store/equityCurveSlice'

const Chart = () => {
  const curves = useSelector(selectEquityCurves)
  console.log(curves)

  return (
    <>
      <h3>Charts</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </>
  )
}

export default Chart
