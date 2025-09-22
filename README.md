# Vue Accounts Form (Test Task)

## 📋 Описание
Тестовое задание для позиции **Vue Frontend Developer**.  
Приложение реализует форму управления учётными записями с поддержкой:
- Vue 3 + Composition API
- TypeScript
- Pinia (хранение и persist в `localStorage`)
- materialize-css (UI)

## ⚡ Функционал
- Добавление учётной записи кнопкой «+».
- Поля: Метка, Тип записи, Логин, Пароль.
- Поле «Пароль» отображается только для типа «Локальная».
- Поле «Метка» хранится как массив объектов `{ text: string }`, ввод через `;`.
- Валидация: обязательные поля и ограничения по длине.
- Удаление записи.
- Автосохранение в `localStorage`.

## 📂 Структура проекта
```
src/
 ├─ components/
 │   ├─ AccountsForm.vue
 │   ├─ AccountItem.vue
 ├─ stores/
 │   └─ accounts.ts
 ├─ types/
 │   └─ account.ts
 ├─ App.vue
 ├─ main.ts
 └─ styles.css
```

## 🚀 Установка и запуск
```bash
# Установить зависимости
npm install

# Запуск dev-сервера
npm run dev

# Сборка
npm run build
```

Открой в браузере: [http://localhost:5173](http://localhost:5173)

## 🛠️ Технологии
- Vue 3
- TypeScript
- Pinia
- Materialize CSS
- Vite
