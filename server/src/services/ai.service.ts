const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

const AI_CONFIG = {
  maxTokens: 300,
  temperature: 0.7,
  appTitle: 'Andrey Portfolio',
} as const;

const PREFERRED_FREE_MODELS = [
  'meta-llama/llama-3.1-8b-instruct:free',
  'google/gemma-3-12b-it:free',
  'mistralai/mistral-7b-instruct:free',
  'deepseek/deepseek-r1:free',
  'qwen/qwen-2.5-7b-instruct:free',
];

const SYSTEM_PROMPT = `Ты — помощник, который помогает людям сформулировать профессиональный запрос к fullstack-разработчику.

Твоя задача: на основе неформального описания пользователя написать чёткое, лаконичное и профессиональное сообщение на русском языке.

Правила:
- Пиши от первого лица (от имени пользователя)
- Сохраняй суть и ключевые детали запроса
- Сделай текст профессиональным, но живым, без канцеляризмов
- Длина: 2-4 предложения, не больше
- Верни ТОЛЬКО текст сообщения, без объяснений и комментариев`;

interface OpenRouterModel {
  id: string;
  name?: string;
  pricing?: { prompt: string; completion: string };
}

export async function diagnoseFreeModels(apiKey: string): Promise<{
  keyPrefix: string;
  totalModels: number;
  freeModels: string[];
  error?: string;
}> {
  const keyPrefix = apiKey.slice(0, 8) + '...';
  console.log(`[AI Diag] Fetching model list from OpenRouter, key: ${keyPrefix}`);

  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log(`[AI Diag] Models endpoint status: ${response.status}`);

    if (!response.ok) {
      const text = await response.text();
      console.error(`[AI Diag] Models endpoint error:`, text);
      return { keyPrefix, totalModels: 0, freeModels: [], error: `HTTP ${response.status}: ${text.slice(0, 200)}` };
    }

    const data = await response.json() as { data: OpenRouterModel[] };
    const allModels = data.data ?? [];

    const freeModels = allModels
      .filter(m => m.id.endsWith(':free') || (m.pricing?.prompt === '0' && m.pricing?.completion === '0'))
      .map(m => m.id);

    console.log(`[AI Diag] Total models: ${allModels.length}, free models: ${freeModels.length}`);
    console.log(`[AI Diag] Free models list:`, freeModels);

    return { keyPrefix, totalModels: allModels.length, freeModels };
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    console.error(`[AI Diag] Exception fetching models:`, error);
    return { keyPrefix, totalModels: 0, freeModels: [], error };
  }
}

async function tryModel(model: string, userInput: string, apiKey: string): Promise<string> {
  console.log(`[AI] Trying model: ${model}`);

  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.SITE_URL ?? 'http://localhost:5173',
      'X-Title': AI_CONFIG.appTitle,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userInput },
      ],
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature,
    }),
  });

  console.log(`[AI] Response status: ${response.status} ${response.statusText}`);

  if (!response.ok) {
    const rawText = await response.text();
    console.error(`[AI] Error body for ${model}:`, rawText);

    let errorMessage: string;
    try {
      const errorData = JSON.parse(rawText) as { error?: { message?: string; code?: number } };
      errorMessage = errorData.error?.message ?? `HTTP ${response.status}`;
    } catch {
      errorMessage = `HTTP ${response.status}: ${rawText.slice(0, 200)}`;
    }

    throw new Error(errorMessage);
  }

  const data = await response.json() as {
    choices: Array<{ message: { content: string } }>;
    model?: string;
    usage?: { prompt_tokens: number; completion_tokens: number };
  };

  console.log(`[AI] Success with model: ${data.model ?? model}`, { usage: data.usage });

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    console.error(`[AI] Empty content in response:`, JSON.stringify(data));
    throw new Error('Empty response from AI');
  }

  return content.trim();
}

export async function generateAiMessage(userInput: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }

  console.log(`[AI] generateAiMessage called, input length: ${userInput.length}`);

  // Discover which free models are actually available for this account
  const { freeModels } = await diagnoseFreeModels(apiKey);
  const modelsToTry = freeModels.length > 0 ? freeModels : PREFERRED_FREE_MODELS;

  console.log(`[AI] Will try ${modelsToTry.length} models`);

  const errors: string[] = [];

  for (const model of modelsToTry) {
    try {
      return await tryModel(model, userInput, apiKey);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`[AI] Model ${model} failed: ${message}`);
      errors.push(`${model}: ${message}`);

      if (message.toLowerCase().includes('invalid api key') || message.toLowerCase().includes('unauthorized')) {
        console.error(`[AI] Auth error — stopping fallback chain`);
        break;
      }
    }
  }

  const summary = errors.join(' | ');
  console.error(`[AI] All models failed:`, summary);
  throw new Error(`All AI models failed. Errors: ${summary}`);
}
