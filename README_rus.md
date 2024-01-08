# проект создания и редактирования резюме

Этот проект был запущен с помощью [Create React App](https://github.com/facebook/create-react-app).

## Установка

Для запуска потребуется установленное приложение Docker

[Инструкция по установке](https://docs.docker.com/desktop/)

1. Склонируйте репозитории:

```
git clone https://github.com/creating-and-editing-a-resume/frontend.git
```

2. Создайте образ, укажите название

docker built -t <your-image-name> .

3. Запустите Docker-контейнер:

```
docker run -p 3000:3000 -d <your-image-name>

```

Проект запускается локально на 3000 порту.

### Описание докер-скриптов

FROM node:20 as build - создание образа контейнера (определение версии Node)

WORKDIR /app - установка рабочей директории

COPY package*.json ./ - копирование файлов package*.json в рабочую директорию

RUN npm install - установка зависимости внутри контейнера

COPY . ./ копирование всех файлов в рабочую директорию

RUN npm run build - сборка образа

CMD cp -r build result_build - установка команды при запуске контейнера / копирование содержимого папки build в папку result_build внутри контейнера

## Доступные скрипты

В каталоге проекта вы можете запустить:

### `npm start`

Запускает приложение в режиме разработки.\
Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

Страница перезагрузится, когда вы внесете изменения.\
Вы также можете увидеть любые ошибки в консоли.

### `npm test`

Запускает программу запуска тестов в режиме интерактивного просмотра.\
Дополнительную информацию см. в разделе о [выполнении тестов](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Собирает приложение для производства в папке `build`.\
Он правильно объединяет React в производственном режиме и оптимизирует сборку для достижения наилучшей производительности.

Сборка минимизирована, а имена файлов включают хэши.\
Ваше приложение готово к развертыванию!

Дополнительную информацию см. в разделе о [развертывании](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`

**Примечание: это односторонняя операция. Как только вы «выброситесь», вы не сможете вернуться назад!**

Если вас не устраивает инструмент сборки и варианты конфигурации, вы можете «извлечь» в любое время. Эта команда удалит из вашего проекта единственную зависимость сборки.

Вместо этого он скопирует все файлы конфигурации и транзитивные зависимости (webpack, Babel, ESLint и т. д.) прямо в ваш проект, чтобы вы имели полный контроль над ними. Все команды, кроме «eject», по-прежнему будут работать, но они будут указывать на скопированные сценарии, чтобы вы могли их настроить. На данный момент вы сами по себе.

Вам не обязательно использовать `eject`. Рекомендуемый набор функций подходит для небольших и средних развертываний, и вы не должны чувствовать себя обязанным использовать эту функцию. Однако мы понимаем, что этот инструмент не будет полезен, если вы не сможете настроить его, когда будете к этому готовы.

## Узнать больше

Вы можете узнать больше в [документации по созданию приложения React] (https://facebook.github.io/create-react-app/docs/getting-started).

Чтобы изучить React, ознакомьтесь с [документацией React](https://reactjs.org/).

### Разделение кода

Этот раздел переехал сюда: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code- расщепление)

### Анализ размера пакета

Этот раздел переехал сюда: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/ документы/анализ размера пакета)

### Создание прогрессивного веб-приложения

Этот раздел переехал сюда: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react- приложение/документы/создание прогрессивного веб-приложения)

### Расширенная конфигурация

Этот раздел переехал сюда: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced- конфигурация)

### Развертывание

Этот раздел переехал сюда: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` не удается минимизировать

Этот раздел переехал сюда: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/ create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
