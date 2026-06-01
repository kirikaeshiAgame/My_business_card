# Андрей · Fullstack Portfolio

Лендинг-портфолио fullstack-разработчика. Тестовое задание, демонстрирующее качество кода, работу с API и AI-интеграцию в продукт.

---

## Стек

| Слой | Технологии |
|---|---|
| **Frontend** | React 18, TypeScript (strict), Vite, SCSS (BEM) |
| **Backend** | Node.js, Express, TypeScript |
| **Валидация** | Zod (сервер) + кастомные валидаторы (клиент) |
| **Email** | Resend API |
| **AI** | OpenRouter API (мульти-модельный fallback) |
| **Безопасность** | Helmet, CORS, express-rate-limit |
| **Качество кода** | ESLint (typescript-eslint), Prettier |

---

## Структура проекта

```
andrey-portfolio/
├── src/                              # Frontend (Vite + React)
│   ├── components/
│   │   ├── ui/                       # Базовые UI: Button, Input, Textarea, Badge
│   │   │   └── Field/                # FieldWrapper — общая обёртка полей формы
│   │   ├── layout/                   # Header, Footer
│   │   ├── sections/                 # HeroSection, About, Workflow, Projects, Contact
│   │   └── features/
│   │       └── AiAssistant/          # Модальный AI-помощник для формы
│   ├── constants/
│   │   └── index.ts                  # SECTION_IDS, API_ROUTES, PERSONAL
│   ├── hooks/                        # useForm, useAiAssistant, useHeader, useScrollAnimation
│   ├── styles/                       # _variables.scss, _mixins.scss, _reset.scss, global.scss
│   ├── types/                        # TypeScript интерфейсы
│   └── utils/                        # validators.ts, scroll.ts
└── server/                           # Backend (Node.js + Express)
    └── src/
        ├── routes/                   # contact.ts, ai.ts
        ├── services/                 # email.service.ts, ai.service.ts
        ├── middleware/               # validation.ts (Zod), error-handler.ts
        └── index.ts
```

---

## Запуск локально

### Требования

- Node.js ≥ 18
- npm ≥ 9

---

### Шаг 1 — Клонировать репозиторий

```bash
git clone https://github.com/kirikaeshiAgame/My_business_card.git
cd My_business_card
```

### Шаг 2 — Установить зависимости

```bash
npm install
cd server && npm install && cd ..
```

### Шаг 3 — Создать файл с переменными окружения

Файл `server/.env` **не включён в репозиторий** (содержит секретные ключи). Нужно создать его вручную:

```bash
cp server/.env.example server/.env   # Linux / macOS
copy server\.env.example server\.env  # Windows
```

Затем открыть `server/.env` и заполнить ключи:

```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
SITE_URL=http://localhost:5173

# Email — Resend API
# Регистрация: https://resend.com (есть бесплатный тариф)
# Создайте ключ в разделе API Keys
RESEND_API_KEY=re_ВАШ_КЛЮЧ
RESEND_FROM=onboarding@resend.dev   # без верификации домена — оставьте так
OWNER_EMAIL=your@email.com          # ваш email — куда придут заявки с формы

# AI — OpenRouter
# Бесплатный ключ: https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-v1-ВАШ_КЛЮЧ
```

> **Что будет без ключей:** сайт откроется и будет работать визуально.
> Форма обратной связи вернёт ошибку при отправке, AI-помощник не запустится.

### Шаг 4 — Запустить в режиме разработки

```bash
# Запускает frontend (порт 5173) и backend (порт 3001) одновременно
npm run start
```

Или раздельно:

```bash
npm run dev          # Frontend → http://localhost:5173
npm run server:dev   # Backend  → http://localhost:3001
```

### Шаг 5 — Открыть в браузере

```
http://localhost:5173
```

---

### Сборка для продакшена

```bash
npm run build                    # Собирает frontend в dist/
cd server && npm run build       # Собирает backend в server/dist/
```

### Все команды

```bash
npm run dev          # Vite dev server (только frontend)
npm run build        # TypeScript + Vite build
npm run lint         # ESLint проверка
npm run format       # Prettier форматирование
npm run server:dev   # Backend с hot-reload (только сервер)
npm run start        # Frontend + backend одновременно
```

---

## Форма обратной связи

**Поля:** Имя, Телефон, Email, Сообщение — все обязательные.

**Валидация на клиенте** — хук `useContactForm` (`src/hooks/useForm.ts`):
- проверяет поля при потере фокуса (blur) и при отправке
- показывает ошибки рядом с полем

**Валидация на сервере** — Zod-схема (`server/src/middleware/validation.ts`):
- `name`: 2–100 символов
- `phone`: 7–20 символов, только цифры / пробелы / `+ - ( )`
- `email`: корректный формат, max 255 символов
- `comment`: 10–2000 символов

**Что происходит после отправки:**

1. Сервер получает запрос, валидирует через Zod
2. Отправляет два письма через Resend API:
   - **Владельцу** — HTML-таблица с именем, телефоном, email и текстом сообщения
   - **Отправителю** — копия его сообщения + подтверждение получения
3. Если письмо владельцу не ушло — возвращает ошибку 500
4. Если копия отправителю не ушла — логирует предупреждение, но не ломает ответ (некритично)

**Состояния формы:** `idle` → `loading` → `success` | `error`

**Rate limiting:** 5 запросов / 15 минут на IP

**API endpoint:** `POST /api/contact`

---

## AI-интеграция

### В продукте: AI-помощник в форме

Кнопка «✨ AI помощник» в форме контактов открывает модальное окно. Пользователь описывает задачу своими словами — AI переформулирует это в профессиональное сообщение, которое можно вставить в форму одним кликом.

**Как это работает (технически):**

1. Frontend вызывает `POST /api/ai/assist` с текстом пользователя
2. Сервер запрашивает список доступных бесплатных моделей у OpenRouter
3. Пробует модели по очереди (fallback-цепочка) до первого успешного ответа
4. Возвращает сгенерированный текст

**Fallback-цепочка моделей** (если первая недоступна, пробуется следующая):
```
meta-llama/llama-3.1-8b-instruct:free
google/gemma-3-12b-it:free
mistralai/mistral-7b-instruct:free
deepseek/deepseek-r1:free
qwen/qwen-2.5-7b-instruct:free
```

**System prompt** (в `server/src/services/ai.service.ts`):
> «Ты — помощник, который помогает людям сформулировать профессиональный запрос к fullstack-разработчику. Пиши от первого лица, 2–4 предложения, без канцеляризмов. Только текст сообщения, без объяснений.»

**Rate limiting:** 10 запросов / минуту на IP

**API endpoint:** `POST /api/ai/assist`

---

## Что делалось с помощью AI

В разработке активно использовались Claude и Grok — не для генерации кода «вслепую», а как инструмент ускорения конкретных задач:

- **Структура проекта** — обсуждение с Claude архитектуры, разбивки на слои (constants / hooks / services), именования файлов
- **Boilerplate и типы** — генерация TypeScript-интерфейсов (`ContactFormData`, `Project`, `WorkflowStep`), начальная структура компонентов
- **SCSS-система** — черновик переменных (`_variables.scss`), миксины для адаптивности и анимаций
- **HTML-шаблоны писем** — inline-стили для email.service.ts, которые тяжело писать вручную
- **System prompt для AI-ассистента** — итерационная доработка промпта чтобы ответы были короткими и без лишних объяснений
- **Zod-схемы валидации** — генерация с правильными русскими сообщениями об ошибках
- **Рефакторинг** — вынос хардкода в константы, создание `FieldWrapper`, `createAnimationObserver`

---

## Что пришлось исправлять вручную

AI хорошо справляется с шаблонными задачами, но в ряде мест требовалась ручная доработка:

- **SCSS и Vite** — AI не знал о механизме `css.preprocessorOptions.additionalData` в Vite, из-за чего переменные и миксины не были доступны в компонентах. Пришлось разобраться с конфигурацией самостоятельно и добавить `@use "@/styles/variables" as *`
- **Fallback-логика AI** — первоначально сервис пробовал только одну модель. Добавил динамическое обнаружение доступных бесплатных моделей через OpenRouter `/models` и цепочку fallback
- **Хардкод цветов** — AI вставлял `rgba(79, 70, 229, 0.12)` вместо `rgba($color-accent, 0.12)` и прописывал цвета синтаксической подсветки напрямую в SCSS вместо переменных. Убрал вручную при рефакторинге
- **Дублирование структуры** — `Input.tsx` и `Textarea.tsx` имели идентичный JSX для label/error/hint. AI не предложил выделить это в компонент. Сделал `FieldWrapper` вручную
- **IntersectionObserver** — в `useScrollAnimation` было два хука с копипастой observer-логики. Вынес общий `createAnimationObserver` вручную
- **`.env.example`** — после перехода с Nodemailer на Resend файл не обновился автоматически. Нужно было отследить и синхронизировать вручную
- **Отладка OpenRouter** — бесплатные модели иногда возвращают 429 или пустой `content`. Добавил диагностический endpoint `/api/ai/diagnose` и правильную обработку пустого ответа

---

## API Endpoints

| Метод | Путь | Описание |
|---|---|---|
| `GET` | `/api/health` | Статус сервера |
| `POST` | `/api/contact` | Отправка формы обратной связи |
| `POST` | `/api/ai/assist` | Генерация текста через AI |
| `GET` | `/api/ai/diagnose` | Диагностика: список доступных free-моделей |
