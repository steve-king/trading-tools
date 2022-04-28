import { useEffect, useRef } from 'react'
import ChartJS from 'chart.js/auto'

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
        data: {
          datasets: data.map((dataset, i) => ({
            label: `Dataset ${i + 1}`,
            data: dataset,
          })),
          labels: data[0].map((el, i) => i),
        },
      })
    }

    return () => chart && chart.destroy()
  }, [data])

  return <canvas ref={chartRef} />
}

export default Chart
