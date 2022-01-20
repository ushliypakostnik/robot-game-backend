Backend Start Project
=====================

Описание
--------

Стартовый проект на Express.js с Babel.


API
---

    GET
    ${HOST}/test

Тестовый роут

*

Deploy
------

Установка зависимостей npm packages

    $ npm install

Development
-----------

Create a database at https://cloud.mongodb.com/

Create @/src/pass.js like @/src/pass.js.tmpl:

  const PASS = {
    DB: {
      url: 'mongodb+srv://admin:[...your key...]',
    },
    RANDOM_BYTES: Number,
  };

  export default PASS;

And write your correct key into it

    $ npm start

    http://localhost:8082/

Production
----------

Запуск проекта для продакшена

    $ npm run prod

Тесты
-----

Запуск линтера

    $ npm run lint

Запуск тестов

    $ npm run test
