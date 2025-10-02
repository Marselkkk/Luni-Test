# Luni Test

Современное React приложение с Feature-Sliced Design архитектурой.

## Технологический стек

- **Frontend Framework**: Vite + React 19 + TypeScript
- **Routing**: TanStack Router с file-based routing
- **State Management**: TanStack Query + TanStack Store
- **Styling**: Tailwind CSS 4.x с Radix UI компонентами
- **Code Quality**: Biome (линтинг/форматирование), dependency-cruiser (архитектура)
- **Testing**: Vitest с Testing Library
- **Интеграции**: Telegram WebApp SDK, PostHog аналитика

## Команды разработки

### Основные команды
- `bun run dev` - Запуск dev сервера на порту 3002 с hot reload
- `bun run build` - Полная production сборка (включает проверку TypeScript, линтинг, валидацию архитектуры и Vite build)
- `bun run start` / `bun run serve` - Превью production сборки локально
- `bun run test` - Запуск Vitest тестов

### Качество кода
- `bun run lint` - Запуск Biome линтера
- `bun run fix` - Исправление auto-fixable Biome проблем
- `bun run arch:check` - Валидация FSD архитектурных ограничений с dependency-cruiser
- `bun run arch:graph` - Генерация диаграммы архитектуры (выводит в `../docs/webapp/architecture.dot`)

## Архитектура проекта (Feature-Sliced Design)

Проект следует **Feature-Sliced Design (FSD)** с строгим соблюдением слоев, контролируемым dependency-cruiser:

**Иерархия слоев (сверху вниз):**
- `app/` - Конфигурация приложения, провайдеры, настройка роутинга, глобальные стили
- `processes/` - Долгосрочные бизнес-процессы (auth flows, onboarding)
- `pages/` - Страницы маршрутов, которые компонуют features и entities
- `features/` - Полные пользовательские взаимодействия (формы, действия с побочными эффектами)
- `entities/` - Бизнес-модели домена и их API/UI
- `shared/` - Переиспользуемые утилиты, UI компоненты, API клиенты, конфигурация

**Ключевые правила FSD:**
- Слои могут импортировать только из слоев ниже них
- Нет кросс-импортов внутри одного слоя (pages не могут импортировать другие pages)
- Все импорты между слоями должны проходить через `index.ts` файлы (Public API)
- Доступны алиасы путей: `@/`, `@app/`, `@pages/`, `@features/`, `@entities/`, `@shared/`

## Переменные окружения

Создайте файл `.env.local` на основе `.env.example`:

```bash
cp .env.example .env.local
```

Обязательные переменные:
- `VITE_PUBLIC_POSTHOG_KEY` - ключ PostHog для аналитики
- `VITE_PUBLIC_POSTHOG_HOST` - хост PostHog (опционально)

## Установка и запуск

```bash
# Установка зависимостей
bun install

# Запуск dev сервера
bun run dev

# Сборка для production
bun run build

# Запуск тестов
bun run test
```

## Структура проекта

```
src/
├── app/                    # Слой приложения
├── processes/              # Бизнес-процессы
├── pages/                 # Страницы маршрутов
├── features/              # Пользовательские взаимодействия
├── entities/              # Бизнес-модели
├── shared/                # Переиспользуемые ресурсы
│   ├── api/              # HTTP клиент, WebSocket
│   ├── config/           # Конфигурация окружения
│   ├── lib/              # Библиотеки (Telegram, PostHog)
│   ├── ui/               # UI компоненты
│   └── utils/             # Утилиты
├── routes/                # TanStack Router маршруты
├── test/                  # Настройки тестирования
└── types/                 # Глобальные типы
```
