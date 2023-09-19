## Локальный запуск
```cmd
npm i
npm start
```
Для взаимодействия с бэкендом необходимо добавить создать файл .env.local
```
REACT_APP_DEVELOP_API_URL=http://localhost:5000
```
## Развертывание на сервере
```cmd
npm i
npm run build
```
В конфиге nginx необходимо указать путь до директории с актуальным build
