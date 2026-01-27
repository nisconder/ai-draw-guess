import { NextRequest, NextResponse } from 'next/server'

interface GenerateRequest {
  word: string
  apiKey: string
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

export async function POST(request: NextRequest) {
  try {
    const { word, apiKey } = await request.json() as GenerateRequest

    if (!apiKey) {
      return NextResponse.json(
        { error: '请提供智谱AI API密钥' },
        { status: 400 }
      )
    }

    if (!word) {
      return NextResponse.json(
        { error: '请提供要描述的词汇' },
        { status: 400 }
      )
    }

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
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
            content: `请描述"${word}"，不要直接说出它的名字。`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    })

    const data = await response.json() as APIErrorResponse | APIResponse

    if ('error' in data && data.error) {
      console.error('智谱AI API错误:', data.error)
      return NextResponse.json(
        { error: data.error.message || '描述生成失败' },
        { status: 500 }
      )
    }

    const description = ('choices' in data && data.choices && data.choices[0]?.message?.content) || '无法生成描述'

    return NextResponse.json({ description })
  } catch (error: any) {
    console.error('描述生成错误:', error)
    return NextResponse.json(
      { error: error.message || '描述生成失败' },
      { status: 500 }
    )
  }
}
