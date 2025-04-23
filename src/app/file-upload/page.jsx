'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const router = useRouter()

  const handleFileSelect = (event) => {
    setFile(event.target.files[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setFile(event.dataTransfer.files[0])
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleAnalyze = () => {
    if (file) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white p-4 shadow">
        <div className="flex items-center text-2xl font-bold text-black">
          <img
            src="/icons/chat-bubble-sa.svg"
            alt="SensAShee Logo"
            className="mr-2 h-6 w-6 text-orange-500"
          />
          SensAShee
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-4 rounded-lg bg-white p-6 shadow">
          {/* Title */}
          <h1 className="text-center text-2xl font-bold">Upload Your Data</h1>
          <p className="text-center text-gray-600">
            Select or drag & drop your CSV, XLS, or XLSX file to begin sentiment
            analysis.
          </p>

          {/* Dropzone */}
          <div
            className="flex h-48 flex-col items-center justify-center space-y-2 rounded-lg border-2 border-dashed border-gray-300 p-6"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-4xl text-gray-400">↑</div>
            <p className="text-gray-500">Drag & drop your file here</p>
            <p className="text-gray-500">or</p>
            <label
              htmlFor="file-upload"
              className="cursor-pointer rounded bg-red-500 px-8 py-4 text-white"
            >
              Select File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv, .xls, .xlsx"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* Supported Formats */}
          <p className="text-center text-sm text-gray-500">
            Supported formats: .csv, .xls, .xlsx
          </p>

          {/* Analyze Sentiment Button */}
          <button
            className={`h-12 w-full rounded ${
              file
                ? 'bg-red-500 text-white'
                : 'cursor-not-allowed bg-gray-300 text-gray-500'
            }`}
            disabled={!file}
            onClick={handleAnalyze}
          >
            Analyze Sentiment
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500">
        © SensAShee 2025 – Sentiment Analysis Dashboard
      </footer>
    </div>
  )
}
