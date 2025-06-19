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
        (parsed.reviews || []).map((row) => ({
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
    <div className="relative flex min-h-screen flex-col">
      {/* Fullscreen Gradient Background */}
      <div
        className="fixed inset-0 -z-10 h-full w-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500"
        aria-hidden="true"
      ></div>
      {/* Header */}
      <header className="fixed top-0 left-0 z-10 flex w-full items-center justify-between bg-white/80 p-4 shadow backdrop-blur">
        <div
          onClick={handleLogoClick}
          className="flex cursor-pointer items-center text-2xl font-bold text-black drop-shadow-md"
        >
          <Logo className="h-10" />
        </div>
        <div className="relative ml-auto">
          <button
            className="flex items-center rounded-md border border-orange-300 bg-white/80 px-4 py-2 text-orange-700 transition hover:bg-orange-100"
            onClick={() => setShowFilter((v) => !v)}
          >
            Filter <span className="ml-2">▼</span>
          </button>
          {/* Filter Dropdown */}
          <div
            className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-orange-200 bg-white shadow-lg"
            style={{ display: showFilter ? 'block' : 'none' }}
          >
            <button
              className={`block w-full px-4 py-2 text-left hover:bg-orange-100 ${
                filter === 'all' ? 'font-bold' : ''
              }`}
              onClick={() => {
                setFilter('all')
                setShowFilter(false)
              }}
            >
              All
            </button>
            <button
              className={`block w-full px-4 py-2 text-left hover:bg-orange-100 ${
                filter === 'Positif' ? 'font-bold' : ''
              }`}
              onClick={() => {
                setFilter('Positif')
                setShowFilter(false)
              }}
            >
              Positive
            </button>
            <button
              className={`block w-full px-4 py-2 text-left hover:bg-orange-100 ${
                filter === 'Negatif' ? 'font-bold' : ''
              }`}
              onClick={() => {
                setFilter('Negatif')
                setShowFilter(false)
              }}
            >
              Negative
            </button>
            <button
              className={`block w-full px-4 py-2 text-left hover:bg-orange-100 ${
                filter === 'Netral' ? 'font-bold' : ''
              }`}
              onClick={() => {
                setFilter('Netral')
                setShowFilter(false)
              }}
            >
              Neutral
            </button>
          </div>
        </div>
      </header>
      {/* Orange to White Transition */}
      <div className="h-16 w-full bg-gradient-to-b from-orange-400/90 via-orange-200/60 to-white"></div>
      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center p-6">
        <div className="w-full max-w-6xl space-y-8 rounded-2xl border border-orange-200 bg-white/90 p-8 shadow-xl backdrop-blur-lg">
          {/* Sentiment Analysis Table Card */}
          <div className="mb-6 max-h-96 overflow-x-auto overflow-y-auto rounded-lg border border-orange-300 bg-white p-4 shadow">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <th className="border border-orange-300 px-4 py-2">Review</th>
                  <th className="rounded-tr-lg border border-orange-300 px-4 py-2">
                    Sentiment Analysis
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTableData.map((row) => (
                  <tr className="bg-orange-50" key={row.review}>
                    <td className="border border-orange-200 px-4 py-2">
                      {row.review}
                    </td>
                    <td className="border border-orange-200 px-4 py-2">
                      <span
                        className={`rounded-full px-3 py-1 font-semibold text-white ${
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
            <div className="flex flex-col rounded-lg border border-orange-200 bg-white/90 shadow">
              <div className="rounded-t-lg bg-gradient-to-r from-orange-500 to-red-500 p-4 font-semibold text-white">
                Issue Clustering (Negative Reviews)
              </div>
              <div className="flex flex-1 flex-col justify-center p-6">
                <IssueBarChart data={issueClusters} />
              </div>
            </div>

            {/* Right Card: Summarized Negative Review */}
            <div className="flex flex-col rounded-lg border border-orange-200 bg-white/90 shadow">
              <div className="rounded-t-lg bg-gradient-to-r from-orange-500 to-red-500 p-4 font-semibold text-white">
                Ringkasan Masalah Utama dari Review Negatif
              </div>
              <div className="flex flex-1 flex-col justify-center p-6">
                <div className="min-h-[120px] rounded-md border border-orange-200 bg-orange-50 p-4 font-semibold text-orange-900">
                  {summary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="mt-8 flex w-full items-center justify-center gap-2 border-t border-orange-200 bg-white/80 py-4 text-center text-sm font-semibold text-orange-700 drop-shadow backdrop-blur">
        <svg
          className="inline h-5 w-5 text-orange-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12.93V17a1 1 0 11-2 0v-2.07A6.002 6.002 0 014 10a6 6 0 1112 0 6.002 6.002 0 01-5 5.93z" />
        </svg>
        © SensAShee 2025 – Sentiment Analysis Dashboard
      </footer>
    </div>
  )
}
