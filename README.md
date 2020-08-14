# Система онлайн-тестирования (frontend)
Небольшая система для проведения тестирования во время карантина. Задача - разработать систему для преподавателей-интровертов, которые не хотят использовать Zoom для проведения экзамена.

Работает в формате одностороннего чата. Экзаменуемые получают идентификатор сессии, чтобы подключиться к экзамену. Экзаменатор на странице администратора "/admin" указывает время ответа (в секундах) и задает вопросы, которые отправляются студентам по WebSocket подключившимся студентам. Поддерживается несколько одновременных сессий (оттестировано 4). По завершению экзамена преподаватель может оценить ответы по 3-балльной шкале и посмотреть сводку по баллам студентов.

Отключено: Ctrl+V в поле ввода.

Стэк:
 - Vue.js
 - Vuetify
 - Vuesax
 - WebSockets

## Скриншоты
### Роль - гость
![Регистрация](https://raw.githubusercontent.com/alialek/online-proctor/master/0.png)
Страница регистрации

![Ввод идентификатора](https://raw.githubusercontent.com/alialek/online-proctor/master/1.jpg)
Страница ввода идентификатора для экзаменуемого

![Ожидание](https://raw.githubusercontent.com/alialek/online-proctor/master/2.jpg)
Ожидание начала сессии

### Роль - администратор
![Создание сессии](https://raw.githubusercontent.com/alialek/online-proctor/master/3.jpg)
Модальное окно создания сессии

![Отправка вопроса](https://raw.githubusercontent.com/alialek/online-proctor/master/4.jpg)
Окно одностороннего чата - отправка вопроса и блокировка поля ввода на время ответа

![Ожидание](https://raw.githubusercontent.com/alialek/online-proctor/master/6.jpg)
Просмотр результатов тестирования

## Получить права администратора
Чтобы получить права администратора, необходимо:
  1. зарегистрировать пользователя;
  2. в БД поменять значение isAdmin с false на true;
  3. пройти повторно процедуру авторизации.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
