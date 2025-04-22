'use client'

import React from 'react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-6 flex items-center space-x-4">
        <div className="text-2xl font-bold text-orange-500">SensAShee</div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </header>

      {/* Top Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Panel */}
        <div className="rounded-lg border bg-white shadow">
          <div className="rounded-t-lg bg-orange-500 p-4 font-semibold text-white">
            Clustered Negative Data
          </div>
          <div className="p-6">
            {/* Bar Chart */}
            <div className="relative h-40">
              <div className="absolute top-4 left-0 h-6 w-[110px] bg-gradient-to-r from-yellow-400 to-pink-500"></div>
              <div className="absolute top-16 left-0 h-6 w-[80px] bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="absolute top-28 left-0 h-6 w-[20px] bg-red-500"></div>
              {/* Grid lines */}
              <div className="absolute inset-0 border-t border-gray-300"></div>
            </div>
            {/* Legend */}
            <div className="mt-4 flex justify-around text-sm">
              <span className="text-blue-500">Positif</span>
              <span className="text-red-500">Negatif</span>
              <span className="text-yellow-500">Netral</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="rounded-lg border bg-white shadow">
          <div className="p-4 text-lg font-semibold underline">Summarize</div>
          <div className="p-6">
            <textarea
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-orange-500"
              rows="6"
              placeholder="Write your summary here..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Review</h2>
          <button className="rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
            Filter
          </button>
        </div>
        <table className="w-full table-auto border-collapse border border-black">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="border border-black px-4 py-2">No</th>
              <th className="border border-black px-4 py-2">Review</th>
              <th className="border border-black px-4 py-2">
                Sentiment Analysis
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr className="bg-gray-100">
              <td className="border border-black px-4 py-2">1</td>
              <td className="border border-black px-4 py-2">
                Sample review text
              </td>
              <td className="border border-black px-4 py-2">
                <span className="rounded-full bg-green-500 px-3 py-1 text-white">
                  Positif
                </span>
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border border-black px-4 py-2">2</td>
              <td className="border border-black px-4 py-2">
                Sample review text
              </td>
              <td className="border border-black px-4 py-2">
                <span className="rounded-full bg-red-500 px-3 py-1 text-white">
                  Negatif
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
