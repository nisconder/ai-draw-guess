import { NextRequest, NextResponse } from 'next/server'

interface GenerateRequest {
  word: string
}

interface APIErrorResponse {
  error?: {
    message?: string
  }
}

interface APIResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

interface ErrorPayload {
  error: string
}

const REQUEST_TIMEOUT_MS = 15000

const parseRequestBody = async (request: NextRequest): Promise<GenerateRequest | null> => {
  try {
    return (await request.json()) as GenerateRequest
  } catch {
    return null
  }
}

const getUpstreamErrorMessage = (data: APIErrorResponse | APIResponse | null) => {
  if (!data || !('error' in data) || !data.error) {
    return '描述生成失败'
  }

  return data.error.message || '描述生成失败'
}

export async function POST(request: NextRequest) {
  const body = await parseRequestBody(request)
  if (!body) {
    return NextResponse.json(
      { error: '请求体格式错误，请使用 JSON' } as ErrorPayload,
      { status: 400 }
    )
  }

  try {
    const { word } = body
    const apiKey = process.env.ZHIPU_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: '服务端未配置智谱AI API密钥，请在环境变量中设置 ZHIPU_API_KEY' } as ErrorPayload,
        { status: 500 }
      )
    }

    const trimmedWord = typeof word === 'string' ? word.trim() : ''
    if (!trimmedWord) {
      return NextResponse.json(
        { error: '请提供要描述的词汇' } as ErrorPayload,
        { status: 400 }
      )
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    let response: Response
    try {
      response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'glm-4-flash',
          messages: [
            {
              role: 'system',
              content: '你是一个绘画描述专家。请用简洁、生动、形象的语言描述一个物体或概念，让读者能够想象出这个物体的样子。描述应该包含主要特征、颜色、形状、用途等信息，但不要直接说出物体的名称。描述长度在3-5句话。'
            },
            {
              role: 'user',
              content: `请描述"${trimmedWord}"，不要直接说出它的名字。`
            }
          ],
          temperature: 0.7,
          max_tokens: 200
        }),
        signal: controller.signal,
      })
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'AI服务响应超时，请稍后重试' } as ErrorPayload,
          { status: 504 }
        )
      }

      throw error
    } finally {
      clearTimeout(timeout)
    }

    let data: APIErrorResponse | APIResponse | null = null
    try {
      data = (await response.json()) as APIErrorResponse | APIResponse
    } catch {
      data = null
    }

    if (!response.ok) {
      const upstreamError = getUpstreamErrorMessage(data)
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: 'API密钥无效或权限不足，请检查 ZHIPU_API_KEY' } as ErrorPayload,
          { status: 502 }
        )
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: '请求过于频繁，请稍后再试' } as ErrorPayload,
          { status: 429 }
        )
      }

      return NextResponse.json(
        { error: upstreamError } as ErrorPayload,
        { status: 502 }
      )
    }

    if (!data || ('error' in data && data.error)) {
      const upstreamError = getUpstreamErrorMessage(data)
      console.error('智谱AI API错误:', upstreamError)
      return NextResponse.json(
        { error: upstreamError } as ErrorPayload,
        { status: 502 }
      )
    }

    const description = ('choices' in data && data.choices && data.choices[0]?.message?.content) || '无法生成描述'

    return NextResponse.json({ description })
  } catch (error) {
    console.error('描述生成错误:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '描述生成失败' } as ErrorPayload,
      { status: 500 }
    )
  }
}
