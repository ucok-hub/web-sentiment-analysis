'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/Logo'
import IssueBarChart from '@/components/IssueBarChart'

export default function Dashboard() {
  const router = useRouter()
  const [filter, setFilter] = useState('all')
  const [showFilter, setShowFilter] = useState(false)
  const [tableData, setTableData] = useState(null)
  const [issueClusters, setIssueClusters] = useState(null)
  const [summary, setSummary] = useState('')

  useEffect(() => {
    const data = localStorage.getItem('dashboardData')
    if (data) {
      const parsed = JSON.parse(data)
      setTableData(
        (parsed.reviews || []).map((row, idx) => ({
          no: idx + 1,
          review: row.Review,
          sentiment: row.Sentimen,
        })),
      )

      // Process all clusters for the bar chart
      setIssueClusters(
        (parsed.clusters || []).map((cluster) => {
          let label = cluster.cluster_name.toLowerCase()
          if (label.includes('aplikasi') || label.includes('teknologi')) {
            label = 'Application/Technology'
          } else if (
            label.includes('cs') ||
            label.includes('customer service')
          ) {
            label = 'Customer Service'
          } else if (
            label.includes('kurir') ||
            label.includes('pengiriman') ||
            label.includes('delivery')
          ) {
            label = 'Delivery'
          } else {
            label = 'Other Issues'
          }
          return {
            label,
            count: cluster.review_count, // Use review_count instead of sample_reviews.length
          }
        }),
      )

      // Only show summary for the cluster with highest review count
      if (parsed.clusters && parsed.clusters.length > 0) {
        // Sort clusters by review_count (in case they're not already sorted)
        const sortedClusters = [...parsed.clusters].sort(
          (a, b) => b.review_count - a.review_count,
        )

        // Get only the top cluster's summary
        const topCluster = sortedClusters[0]
        setSummary(`${topCluster.cluster_name}: ${topCluster.summary}`)
      } else {
        setSummary('')
      }
    }
  }, [])

  const handleLogoClick = () => {
    const confirmed = window.confirm(
      'This action will take you to the main page, continue?',
    )
    if (confirmed) {
      router.push('/')
    }
  }

  // Filtering logic
  const filteredTableData =
    filter === 'all'
      ? tableData || []
      : (tableData || []).filter((row) => row.sentiment === filter)

  if (!tableData || !issueClusters) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Bar */}
      <header className="mb-6 flex items-center justify-between">
        <div
          onClick={handleLogoClick}
          className="flex cursor-pointer items-center transition-opacity hover:opacity-80"
        >
          <Logo className="h-10" />
        </div>
        <h1 className="font-display text-3xl font-bold">Table Review</h1>
        <div className="relative">
          <button
            className="flex items-center rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setShowFilter((v) => !v)}
          >
            Filter <span className="ml-2">▼</span>
          </button>
          {/* Filter Dropdown */}
          <div
            className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg"
            style={{ display: showFilter ? 'block' : 'none' }}
          >
            <button
              className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${filter === 'all' ? 'font-bold' : ''}`}
              onClick={() => {
                setFilter('all')
                setShowFilter(false)
              }}
            >
              All
            </button>
            <button
              className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${filter === 'Positif' ? 'font-bold' : ''}`}
              onClick={() => {
                setFilter('Positif')
                setShowFilter(false)
              }}
            >
              Positive
            </button>
            <button
              className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${filter === 'Negatif' ? 'font-bold' : ''}`}
              onClick={() => {
                setFilter('Negatif')
                setShowFilter(false)
              }}
            >
              Negative
            </button>
          </div>
        </div>
      </header>

      {/* Sentiment Analysis Table Card */}
      <div className="mb-6 max-h-96 overflow-x-auto overflow-y-auto rounded-lg border border-gray-300 bg-white p-4 shadow">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="rounded-tl-lg border border-black px-4 py-2">
                No
              </th>
              <th className="border border-black px-4 py-2">Review</th>
              <th className="rounded-tr-lg border border-black px-4 py-2">
                Sentiment Analysis
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map((row) => (
              <tr className="bg-gray-100" key={row.no}>
                <td className="border border-black px-4 py-2">{row.no}</td>
                <td className="border border-black px-4 py-2">{row.review}</td>
                <td className="border border-black px-4 py-2">
                  <span
                    className={`rounded-full px-3 py-1 text-black ${
                      row.sentiment === 'Positif'
                        ? 'bg-green-500'
                        : row.sentiment === 'Netral'
                          ? 'bg-gray-400'
                          : 'bg-red-500'
                    }`}
                  >
                    {row.sentiment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Card: Issue Clustering Bar Chart */}
        <div className="flex flex-col rounded-lg border bg-white shadow">
          <div className="rounded-t-lg bg-orange-500 p-4 font-semibold text-white">
            Issue Clustering (Negative Reviews)
          </div>
          <div className="flex flex-1 flex-col justify-center p-6">
            <IssueBarChart data={issueClusters} />
          </div>
        </div>

        {/* Right Card: Summarized Negative Review */}
        <div className="flex flex-col rounded-lg border bg-white shadow">
          <div className="rounded-t-lg bg-orange-500 p-4 font-semibold text-white">
            Ringkasan Masalah Utama dari Review Negatif
          </div>
          <div className="flex flex-1 flex-col justify-center p-6">
            <div className="min-h-[120px] rounded-md border border-gray-300 bg-gray-50 p-4 text-gray-700">
              {summary}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 py-4 text-center text-sm text-gray-500">
        <div className="mb-2 flex items-center justify-center">
          <Logo className="h-8" />
        </div>
        <div>
          <br />
          <br />© 2025 SensAShee – Sentiment Analysis Dashboard
        </div>
      </footer>
    </div>
  )
}
