# 🧩 Messenger Chat (Vite + TypeScript + Handlebars)

Одностраничное чат-приложение с авторизацией, регистрацией, профилем пользователя и страницами ошибок. Архитектура построена на собственном роутере, сторах и шаблонизаторе Handlebars.

## Возможности
- авторизация, регистрация и восстановление сессии
- список чатов с последними сообщениями и количеством непрочитанных
- экран диалога с подключением к WebSocket
- страница профиля с редактированием данных и пароля
- обработка маршрутов 404/500, приватные маршруты и редиректы

## Технологии
- Vite 7 + TypeScript 5.9
- Handlebars, собственный TemplateEngine/TemplateBlock
- SCSS (Sass) и BEM-стили, Stylelint + Prettier
- Mocha + Chai + jsdom для unit-тестов (роутер, компоненты, HTTP-клиент)
- ESLint (Airbnb + TypeScript), Husky pre-commit (`npm run check`)

## Быстрый старт
```bash
npm install          # установка зависимостей
npm run dev          # dev-сервер на http://localhost:3000
npm run build        # production-сборка
npm run preview      # просмотр собранного билда
```

### Проверки и тесты
- `npm test` — запускает mocha-тесты
- `npm run check:lint` — линтинг TypeScript/TSX с автофиксом
- `npm run lint:css` / `npm run lint:js` — отдельные линтеры
- `npm run check` — линтинг + тесты (используется в pre-commit)

### Другие скрипты
- `npm run format` — форматирование Prettier
- `npm run clean` — удаление `node_modules`
- `npm run start` — сборка и запуск превью

## Pre-commit хуки
Husky настраивает `git`-хуки при установке зависимостей. Перед коммитом автоматически выполняется `npm run check`. Если установка проходила без `npm install`, выполните `npm run prepare` вручную.

## Деплой
- Приложение: https://ws-chat-advance.netlify.app/messages
- Логин: https://ws-chat-advance.netlify.app/login
- Регистрация: https://ws-chat-advance.netlify.app/signup
- Профиль и его режимы (`editing=credentials`, `editing=pass`), страницы 404 и 500 — доступны по прямым ссылкам.

## Поддержка и безопасность
- Зависимости обновлены: `sass@^1.93.2`, `typescript@^5.9.2`, `uuid@^13.0.0`
- `npm audit` — уязвимости не обнаружены
