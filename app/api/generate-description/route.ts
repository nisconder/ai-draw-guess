import { NextRequest, NextResponse } from 'next/server'
import { generateDescription, ApiError, ApiAuthError, ApiRateLimitError, ApiTimeoutError } from '@/lib/api-client'
import type { ProviderType } from '@/lib/types'

interface RequestBody {
  word?: string
  provider?: string
  apiKey?: string
}

export async function POST(request: NextRequest) {
  let body: RequestBody = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: '请求体格式错误，请使用 JSON' },
      { status: 400 }
    )
  }

  const word = typeof body.word === 'string' ? body.word.trim() : ''
  if (!word) {
    return NextResponse.json(
      { error: '请提供要描述的词汇' },
      { status: 400 }
    )
  }

  // Validate provider
  const validProviders: ProviderType[] = ['zhipu', 'deepseek', 'qwen', 'kimi', 'openai']
  const provider = (body.provider as ProviderType) || 'zhipu'

  if (!validProviders.includes(provider)) {
    return NextResponse.json(
      { error: `不支持的AI提供商: ${provider}。支持的提供商: ${validProviders.join(', ')}` },
      { status: 400 }
    )
  }

  // Optional client-provided API key (from browser localStorage).
  // When present and non-empty, it overrides the server-side env var for this
  // single request. When absent/empty, the env var fallback still works.
  // The key is NEVER logged, stored in a cookie, or echoed back in the response.
  const clientApiKey = typeof body.apiKey === 'string' ? body.apiKey : ''

  try {
    const description = await generateDescription(word, provider, clientApiKey)
    return NextResponse.json({ description })
  } catch (error) {
    console.error(`[${provider}] 描述生成错误:`, error)

    if (error instanceof ApiAuthError) {
      return NextResponse.json(
        { error: error.message },
        { status: 502 }
      )
    }

    if (error instanceof ApiRateLimitError) {
      return NextResponse.json(
        { error: error.message },
        { status: 429 }
      )
    }

    if (error instanceof ApiTimeoutError) {
      return NextResponse.json(
        { error: error.message },
        { status: 504 }
      )
    }

    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { error: '描述生成失败，请稍后重试' },
      { status: 500 }
    )
  }
}
