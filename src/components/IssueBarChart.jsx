import React, { useLayoutEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

// Props: data = [{ label: string, count: number }]
export default function IssueBarChart({ data }) {
  const chartRef = useRef(null)
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = am5.Root.new(chartRef.current)
    rootRef.current = root
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
        width: am5.percent(100),
        height: am5.percent(100),
      }),
    )

    // Y Axis (Value) - integers only
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          minGridDistance: 30,
        }),
        min: 0,
        strictMinMax: true,
        numberFormat: '#',
        maxPrecision: 0,
        calculateTotals: true,
        extraMax: 0.1,
      }),
    )
    yAxis.getNumberFormatter().set('numberFormat', '#')
    yAxis.set('maxPrecision', 0)
    yAxis.set('strictMinMax', true)
    yAxis.set('min', 0)
    yAxis.set('step', 1)
    yAxis.set('interval', 1)
    // Force grid intervals to 1 after axis is ready
    yAxis.events.on('boundschanged', function () {
      yAxis.set('interval', 1)
    })

    // X Axis (Category)
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 60, // more space between bars
        }),
        categoryField: 'label',
      }),
    )
    xAxis.data.setAll(data)
    // Wrap or rotate labels to prevent overlap
    xAxis.get('renderer').labels.template.setAll({
      maxWidth: 80,
      oversizedBehavior: 'wrap',
      textAlign: 'center',
      // rotation: -30, // Uncomment for angled labels if needed
    })

    // Series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Issues',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'count',
        categoryXField: 'label',
        fill: am5.color(0x14b8a6),
        stroke: am5.color(0x14b8a6),
      }),
    )
    series.data.setAll(data)

    // Add cursor
    chart.set('cursor', am5xy.XYCursor.new(root, {}))

    // Cleanup
    return () => {
      root.dispose()
    }
  }, [data])

  // Make chart fill parent and allow horizontal scroll if needed
  return (
    <div
      style={{
        overflowX: 'auto',
        width: '100%',
        height: '320px',
        minHeight: 240,
      }}
    >
      <div
        ref={chartRef}
        style={{
          width: data.length > 6 ? data.length * 100 : '100%',
          height: '100%',
        }}
        id="issue-barchart-am5"
      />
    </div>
  )
}
