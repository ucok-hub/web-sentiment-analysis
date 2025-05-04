import React, { useLayoutEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

// Props: data = [{ label: string, count: number }]
export default function IssueBarChart({ data }) {
  const chartRef = useRef(null)
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    // Create root and chart
    const root = am5.Root.new(chartRef.current)
    rootRef.current = root
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
      }),
    )

    // Y Axis (Value)
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    )

    // X Axis (Category)
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'label',
      }),
    )
    xAxis.data.setAll(data)

    // Series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Issues',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'count',
        categoryXField: 'label',
        fill: am5.color(0x14b8a6), // teal-500
        stroke: am5.color(0x14b8a6),
      }),
    )
    series.data.setAll(data)

    // Add legend (optional, can be removed if not needed)
    // const legend = chart.children.push(am5.Legend.new(root, {}))
    // legend.data.setAll(chart.series.values)

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}))

    // Cleanup
    return () => {
      root.dispose()
    }
  }, [data])

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '320px', minHeight: 240 }}
      id="issue-barchart-am5"
    />
  )
}
