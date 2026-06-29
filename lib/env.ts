// Server-only module — do NOT import in client components
// API keys must NEVER be exposed to the browser

import type { ProviderType, ProviderConfig } from './types'

const PROVIDER_CONFIGS: Record<ProviderType, ProviderConfig> = {
  zhipu: {
    name: 'zhipu',
    displayName: '智谱AI (GLM)',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    model: 'glm-4-flash',
    description: '智谱AI GLM-4-Flash，免费使用，中文优秀',
  },
  deepseek: {
    name: 'deepseek',
    displayName: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-chat',
    description: 'DeepSeek V4 Flash，性价比之王',
  },
  qwen: {
    name: 'qwen',
    displayName: '通义千问 (Qwen)',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    model: 'qwen-plus',
    description: '阿里通义千问，中文能力出色',
  },
  kimi: {
    name: 'kimi',
    displayName: '月之暗面 (Kimi)',
    baseUrl: 'https://api.moonshot.cn/v1/chat/completions',
    model: 'kimi-latest',
    description: 'Moonshot Kimi，推理能力强',
  },
  openai: {
    name: 'openai',
    displayName: 'OpenAI (GPT)',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    description: 'OpenAI GPT，全球标准',
  },
}

const ENV_KEY_MAP: Record<ProviderType, string> = {
  zhipu: 'ZHIPU_API_KEY',
  deepseek: 'DEEPSEEK_API_KEY',
  qwen: 'QWEN_API_KEY',
  kimi: 'KIMI_API_KEY',
  openai: 'OPENAI_API_KEY',
}

export function getApiConfig(provider: ProviderType): { baseUrl: string; apiKey: string; model: string } | null {
  const config = PROVIDER_CONFIGS[provider]
  if (!config) return null

  const envKey = ENV_KEY_MAP[provider]
  const apiKey = process.env[envKey]

  if (!apiKey) return null

  return {
    baseUrl: config.baseUrl,
    apiKey,
    model: config.model,
  }
}

export function getProviderConfig(provider: ProviderType): ProviderConfig | null {
  return PROVIDER_CONFIGS[provider] || null
}

export function getAllProviderConfigs(): ProviderConfig[] {
  return Object.values(PROVIDER_CONFIGS)
}

export function getAvailableProviders(): ProviderType[] {
  return (Object.keys(PROVIDER_CONFIGS) as ProviderType[]).filter((p) => {
    const envKey = ENV_KEY_MAP[p]
    return !!process.env[envKey]
  })
}

export const SUPPORTED_PROVIDERS = Object.values(PROVIDER_CONFIGS)
