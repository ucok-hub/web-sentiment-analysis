'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/Logo'
import IssueBarChart from '@/components/IssueBarChart'

export default function Dashboard() {
  const router = useRouter()
  const [filter, setFilter] = useState('all')
  const [showFilter, setShowFilter] = useState(false)

  // Generate dummy data only on client
  const { tableData, issueClusters, summary } = useMemo(() => {
    const issueTypes = [
      'Production Defect',
      'Shipping Delay',
      'Seller Error',
      'Wrong Item',
      'Damaged Packaging',
      'Late Response',
      'Payment Issue',
    ]
    function getRandomInt(max) {
      return Math.floor(Math.random() * max)
    }
    const tableData = Array.from({ length: 50 }, (_, i) => {
      const isNegative = Math.random() < 0.4 // 40% negative
      const sentiment = isNegative ? 'Negatif' : 'Positif'
      const issue = isNegative
        ? issueTypes[getRandomInt(issueTypes.length)]
        : null
      return {
        no: i + 1,
        review: isNegative
          ? `Negative review about ${issue.toLowerCase()}`
          : 'Positive review about product/service',
        sentiment,
        issue,
      }
    })
    const issueClusters = issueTypes
      .map((type) => ({
        label: type,
        count: tableData.filter(
          (d) => d.sentiment === 'Negatif' && d.issue === type,
        ).length,
      }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count)
    const mostFrequentIssue =
      issueClusters.length > 0 ? issueClusters[0].label : ''
    const mostFrequentCount =
      issueClusters.length > 0 ? issueClusters[0].count : 0
    const summary =
      mostFrequentIssue === 'Seller Error'
        ? `Most frequent issue: Seller Error (${mostFrequentCount} cases). Customers mostly complain about mistakes made by the seller, such as sending the wrong item, incomplete orders, or not following special instructions. It is recommended to improve order accuracy, double-check items before shipping, and enhance communication with buyers to reduce these errors.`
        : mostFrequentIssue
          ? `Most frequent issue: ${mostFrequentIssue} (${mostFrequentCount} cases). Customers mostly complain about ${mostFrequentIssue.toLowerCase()}. Please review the related process to reduce this issue.`
          : 'No significant negative issues detected.'
    return { tableData, issueClusters, summary }
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
      ? tableData
      : tableData.filter((row) => row.sentiment === filter)

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
        <div>© 2025 SensAShee – Sentiment Analysis Dashboard</div>
      </footer>
    </div>
  )
}
