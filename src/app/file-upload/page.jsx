'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const validFormats = ['csv', 'xls', 'xlsx']

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0]
    validateFile(selectedFile)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    validateFile(droppedFile)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const validateFile = (file) => {
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase()
      if (validFormats.includes(fileExtension)) {
        setFile(file)
        setError('')
      } else {
        setFile(null)
        setError(
          'The file type you uploaded is wrong, please adjust the file type!',
        )
      }
    }
  }

  const handleDeleteFile = () => {
    setFile(null)
    setError('')
  }

  const handleAnalyze = () => {
    if (file) {
      router.push('/dashboard')
    }
  }

  const handleLogoClick = () => {
    const confirmed = window.confirm(
      'This action will take you to the main page, continue?',
    )
    if (confirmed) {
      router.push('/')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white p-4 shadow">
        <div
          className="flex cursor-pointer items-center text-2xl font-bold text-black"
          onClick={handleLogoClick}
        >
          <Logo className="h-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-16 flex flex-grow items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-4 rounded-lg bg-white p-6 shadow">
          {/* Title */}
          <div className="flex justify-center">
            <Image
              src="/logo.svg"
              alt="SensAShee Logo"
              width={90}
              height={90}
              className="mb-4"
            />
          </div>
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

          {/* Error Message */}
          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          {/* Uploaded File Display */}
          {file && (
            <div className="flex items-center justify-between rounded bg-gray-100 p-3">
              <span className="text-sm text-gray-700">{file.name}</span>
              <button
                onClick={handleDeleteFile}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )}

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
