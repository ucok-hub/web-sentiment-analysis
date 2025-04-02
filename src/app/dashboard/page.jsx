// app/dashboard/page.jsx
'use client'

import React, { useState } from 'react'

export default function Dashboard() {
  const [review, setReview] = useState('')
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)

  // Fungsi untuk mengirim review ke API dan mendapatkan hasil analisis
  const handleAnalyze = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review }),
      })
      const data = await res.json()

      // Membuat data review baru dengan timestamp
      const newReview = {
        id: Date.now(),
        text: review,
        sentiment: data.sentiment,
        timestamp: new Date().toLocaleString(),
      }

      // Menambahkan review baru ke dalam daftar (data review yang telah diproses)
      setReviews([newReview, ...reviews])
      setReview('')
    } catch (error) {
      console.error('Error analyzing review:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Dashboard Data Review
      </h1>

      {/* Form untuk mengirim review */}
      <form onSubmit={handleAnalyze} className="mx-auto mb-6 max-w-xl">
        <label
          htmlFor="review"
          className="mb-2 block text-lg font-medium text-gray-700"
        >
          Masukkan Review
        </label>
        <textarea
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tulis review di sini..."
          rows="4"
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600"
        >
          {loading ? 'Memproses...' : 'Analisis Sentimen'}
        </button>
      </form>

      {/* Tabel untuk menampilkan daftar review yang telah diproses */}
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-xl font-semibold">
          List Review yang Telah Diproses
        </h2>
        <table className="min-w-full overflow-hidden rounded-md bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-4 py-2 text-left">Review</th>
              <th className="border-b px-4 py-2 text-left">Sentiment</th>
              <th className="border-b px-4 py-2 text-left">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td className="border-b px-4 py-2" colSpan="3">
                  Belum ada review yang diproses.
                </td>
              </tr>
            ) : (
              reviews.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2">{item.text}</td>
                  <td className="border-b px-4 py-2">{item.sentiment}</td>
                  <td className="border-b px-4 py-2">{item.timestamp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Placeholder untuk grafik/statistik */}
      <div className="mx-auto mt-8 max-w-4xl">
        <h2 className="mb-4 text-xl font-semibold">Statistik Sentiment</h2>
        <div className="rounded-md bg-white p-6 text-center shadow">
          {/* Disini nantinya kamu bisa mengintegrasikan library chart seperti Chart.js atau Recharts */}
          <p>Grafik distribusi sentiment akan tampil di sini.</p>
        </div>
      </div>
    </div>
  )
}
