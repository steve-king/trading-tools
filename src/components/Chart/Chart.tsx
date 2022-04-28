import { useEffect, useRef } from 'react'
import ChartJS from 'chart.js/auto'
import { randomColour } from 'utils'

const Chart = (props: { data: number[][] }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const { data } = props

  useEffect(() => {
    console.log('render', data)
    let chart: ChartJS
    const ctx = chartRef.current?.getContext('2d')

    if (ctx && data.length) {
      chart = new ChartJS(ctx, {
        type: 'line',
        options: { plugins: { legend: { display: false } } },
        data: {
          datasets: data.map((dataset, i) => ({
            borderColor: randomColour(0.4),
            data: dataset,
          })),
          labels: data[0].map((el, i) => i),
        },
      })
    }

    return () => chart && chart.destroy()
  }, [data, chartRef])

  return <canvas ref={chartRef} />
}

export default Chart
