<p align="center">
  <img src="client/public/brain.png" alt="human-brain-capabilities" height="230" />
</p>

## Команда [Growth-Teams](http://growth-teams.ru)

### Дневник Эмоций

Мы предлагаем первый в России сервис для отслеживания ваших эмоций. Он базируется на искусственном интеллекте, который считывает эмоции по видео и определяет ваше настроение.

Дневник эмоций определяет ваше настроение за день, за последнюю неделю, месяц или год, анализирует эмоции и составляет для вас аналитику эмоционального состояния.

Мы сделали не просто сервис-дневник. Мы создали новый инструмент для улучшения качества вашей жизни. Аналитику и другие данные по своим эмоциям вы можете отправлять не только друзьям и близким, но и своему психологу, который на основе этих данных сможет более точно оценить ваше здоровье.

### Стек

<div>
  <div>
    <img alt="Node.js" src="https://img.shields.io/badge/-Node.JS-43853d?style=for-the-badge&logo=Node.js&logoColor=white" />
    <img alt="NestJS" src="https://img.shields.io/badge/-Nest-ed2945?style=for-the-badge&logo=NestJS&logoColor=white" />
    <img alt="NestJS" src="https://img.shields.io/badge/-Postgres-336791?style=for-the-badge&logo=postgresql&logoColor=white" />
  </div>
  <div>
    <img alt="ReactJS" src="https://img.shields.io/badge/-React-353535?style=for-the-badge&logo=react&logoColor=white" />
    <img alt="HTML5" src="https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
    <img alt="Sass" src="https://img.shields.io/badge/-Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-235a96?style=for-the-badge&logo=typescript&logoColor=white" />
  </div>
</div>

### Запуск

1. `npm install` (node v14) (если долго, то npm install в папках server и client)
2. `npm start`
3. Перейти на http://localhost:4001/

### Воркфлоу для разработчиков

**До начала разработки**
1. Мы работаем по модели [Trunk Based Development](https://trunkbaseddevelopment.com), основная ветка - `trunk`
2. Сделать форк репозитория https://github.com/Growth-Teams/Emotions
3. Добавить репозиторий в `remote` гита, чтобы можно было скачивать обновления с ветки `trunk`:  
   `git remote add emotions https://github.com/Growth-Teams/Emotions`

**Разработка**
1. Выбираем тикет в текущем спринте с [доски](https://tracker.yandex.ru/agile/board/8), назначаем себя исполнителем и ставим статус "в работе"
2. Обновляем мастер-ветку `git checkout trunk`, `git fetch emotions`
3. Создаем фиче-ветку `git checkout -b <ключ-тикета>` (например `EMOTION-19`)
4. Пишем код
5. Делаем коммиты в формате `fix/feat: EMOTION-19: отображаем заметки по датам в календаре`, `fix` для фиксов и багов, `feat` для чего-то более значительного. Если в ветке только один коммит, можно просто скопировать название задачи
6. Делаем пуш в свой форк
7. Делаем пулл-реквест в репозиторий https://github.com/Growth-Teams/Emotions
8. Начинается ревью, скорее всего нужно будет внести правки по результам ревью (статус тикета - "в ревью", кидаем в комменты тикета ссылку на ПР)
9. После ревью происходит мерж в нашу основную ветку `trunk` (статус тикета - "закрыт")

**Прогоняем воркфлоу**  
На [доске](https://tracker.yandex.ru/agile/board/8) в текущем спринте есть задачи по прогону воркфлоу для каждого из нас, нужно найти их и пройти по воркфлоу, описанному выше

Егор: ✓✓  
Артур: ✓  
Леня:  

