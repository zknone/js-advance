# 🧩 Messenger Chat (Vite + TypeScript + Handlebars)

Одностраничное (SPA) чат-приложение с авторизацией, регистрацией, профайлом, страницами ошибок и подготовкой к подключению API.
Проект выполнен в рамках курса «Фронтенд-разработчик» от Яндекс Практикума.

step-2 updated:
добавил Block – отвечает за рендер компонентов, реактивность
добавил TemplateBlock – отвечает за постпроцессинг инпутов и компиляцию темплейтов с чилдренами и без в нужных местах
добавил templatePage - отвечает за сбор чилдренов в лейауте
добавил синглтон templateEngine - отвечает за регистрацию шаблонов.

---

## 🚀 Деплой

🔗 Главная: [ws-chat-advance.netlify.app](https://ws-chat-advance.netlify.app/)
🔐 Логин: [https://ws-chat-advance.netlify.app/login](https://ws-chat-advance.netlify.app/login)
🆕 Регистрация: [https://ws-chat-advance.netlify.app/signup](https://ws-chat-advance.netlify.app/signup)
🙈 404: [https://ws-chat-advance.netlify.app/404](https://ws-chat-advance.netlify.app/404)
💥 500: [https://ws-chat-advance.netlify.app/500](https://ws-chat-advance.netlify.app/500)
👤 Профиль: [https://ws-chat-advance.netlify.app/profile](https://ws-chat-advance.netlify.app/profile)
👤 Измнение данных: [https://ws-chat-advance.netlify.app/profile](https://ws-chat-advance.netlify.app/profile/edit-credentials)
👤 Измнение пароля: [https://ws-chat-advance.netlify.app/profile](https://ws-chat-advance.netlify.app/profile/edit-pass)
👤 Измнение пароля: Модалка для измненения аватара вызывается по клику.

---

## 📦 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в дев-режиме (localhost:3000)
npm run dev

# Сборка проекта
npm run build

# Запуск собранной версии
npm run start
```
