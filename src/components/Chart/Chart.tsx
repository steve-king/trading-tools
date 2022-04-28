import { useEffect, useRef } from 'react'
import ChartJS from 'chart.js/auto'
import { randomColour } from 'utils'

import { Card, CardContent } from '@mui/material'

const Chart = (props: { data: number[][] }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const { data } = props

  useEffect(() => {
    let chart: ChartJS
    const ctx = chartRef.current?.getContext('2d')

    if (ctx && data.length) {
      chart = new ChartJS(ctx, {
        type: 'line',
        options: {
          plugins: { legend: { display: false } },
          aspectRatio: 16 / 10,
          scales: {
            y: {
              ticks: {
                callback: (value) => '$' + value,
              },
            },
          },
        },
        data: {
          datasets: data.map((dataset, i) => ({
            borderColor: randomColour(0.8, 200),
            borderWidth: 2,
            pointRadius: 1,
            data: dataset,
          })),
          labels: data[0].map((el, i) => i + 1),
        },
      })
    }

    return () => chart && chart.destroy()
  }, [data, chartRef])

  return (
    <Card>
      <CardContent>
        <canvas ref={chartRef} />
      </CardContent>
    </Card>
  )
}

export default Chart
