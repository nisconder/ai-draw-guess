// Server-only module — do NOT import in client components
// API keys must NEVER be exposed to the browser

import type { ProviderType } from './types'
import { getApiConfig, getProviderConfig } from './env'

// Custom error types for different failure modes
export class ApiTimeoutError extends Error {
  constructor(provider: string) {
    super(`AI服务响应超时 (${provider})`)
    this.name = 'ApiTimeoutError'
  }
}

export class ApiAuthError extends Error {
  constructor(provider: string) {
    super(`API密钥无效或权限不足 (${provider})`)
    this.name = 'ApiAuthError'
  }
}

export class ApiRateLimitError extends Error {
  constructor(provider: string) {
    super(`请求过于频繁，请稍后再试 (${provider})`)
    this.name = 'ApiRateLimitError'
  }
}

export class ApiError extends Error {
  constructor(message: string, public provider: string) {
    super(message)
    this.name = 'ApiError'
  }
}

const REQUEST_TIMEOUT_MS = 15000

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatCompletionRequest {
  model: string
  messages: ChatMessage[]
  temperature: number
  max_tokens: number
}

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
  error?: {
    message?: string
  }
}

/**
 * Generate an AI description for a word using the specified provider.
 * This is a server-only function — never call from client components.
 *
 * An optional `apiKey` may be supplied by the client (browser localStorage).
 * When present and non-empty, it overrides the server-side env var for this
 * single request; when absent, the env var fallback still works.
 */
export async function generateDescription(
  word: string,
  provider: ProviderType = 'zhipu',
  apiKey?: string,
): Promise<string> {
  const config = getApiConfig(provider, apiKey)
  if (!config) {
    throw new ApiError(
      `未配置 ${getProviderConfig(provider)?.displayName || provider} 的API密钥，请在环境变量中设置或在页面中填写`,
      provider
    )
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const requestBody: ChatCompletionRequest = {
      model: config.model,
      messages: [
        {
          role: 'system',
          content: '你是一个绘画描述专家。请用简洁、生动、形象的语言描述一个物体或概念，让读者能够想象出这个物体的样子。描述应该包含主要特征、颜色、形状、用途等信息，但不要直接说出物体的名称。描述长度在3-5句话。',
        },
        {
          role: 'user',
          content: `请描述"${word}"，不要直接说出它的名字。`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    }

    const response = await fetch(config.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    })

    let data: ChatCompletionResponse | null = null
    try {
      data = await response.json() as ChatCompletionResponse
    } catch {
      data = null
    }

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new ApiAuthError(provider)
      }
      if (response.status === 429) {
        throw new ApiRateLimitError(provider)
      }
      const errorMsg = data?.error?.message || '描述生成失败'
      throw new ApiError(`${errorMsg} (${provider})`, provider)
    }

    if (!data || data.error) {
      throw new ApiError(data?.error?.message || '描述生成失败', provider)
    }

    const description = data.choices?.[0]?.message?.content
    if (!description) {
      throw new ApiError('AI返回的描述为空', provider)
    }

    return description
  } catch (error) {
    if (error instanceof ApiError || error instanceof ApiAuthError || error instanceof ApiRateLimitError) {
      throw error
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiTimeoutError(provider)
    }
    throw new ApiError(
      error instanceof Error ? error.message : '描述生成失败',
      provider
    )
  } finally {
    clearTimeout(timeout)
  }
}

// Export provider info for UI
export { getProviderConfig, getAllProviderConfigs, getAvailableProviders } from './env'
