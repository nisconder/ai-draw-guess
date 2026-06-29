'use client'

import { Component } from 'react'
import type { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-red-500">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md">
            <p className="text-2xl font-bold text-red-600 mb-4">出错了</p>
            <p className="text-gray-600 mb-4">{this.state.error?.message || '发生了未知错误'}</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-purple-600 text-white px-6 py-2 rounded-full"
            >
              重试
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
