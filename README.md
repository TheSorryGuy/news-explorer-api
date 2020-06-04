# News Explorer API

This is a part of my diploma project for Yandex.Praktirum
Project includes frontend and backend parts
This api is used to process requests from ```News Explorer```

```sh
version: 0.0.1
author: Fedor Ganin 
github: https://github.com/TheSorryGuy/news-explorer-api
url: api.ganin-news-explorer.gq
IP: 84.201.141.88
```
# Deploy
If u want to use this code to deploy your own server:
- Generate 16-bit secret-key (use crypto module) like this:
```sh
// console
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```
- Create ```.env``` file in root folder, it must look like this:
```sh
// .env
NODE_ENV=production
JWT_SECRET= // your secret key here
```
- Use ```npm run start``` to start server
- Use ```npm run dev``` to start server with hot reload
- If u want to see or change default settings, as SERVER_PARAMS or DATABASE_URL, u can find them in ```config.js```

# Usage
Before start using all the requets, you have to create user and log in:

```sh
'POST /signup' req.body: name, email (must be valid email, must be unique in current DB), password (8 - 30 symbols)
'POST /signin' req.body: email, password (must occure with created user params)
```
```/signin``` request creates cookie, that contains token, so when you making requests, you need to send it to server by setting ```credentials``` param:
```sh
fetch('/articles', {
    method: 'GET',
    credentials: 'include',
});
```
After that you allowed to send all over requests. Remember, that you can delete only articles, created by user, who is now authorized,
# Requests
```sh
'GET /users/me' returns json with current authorized user
'GET /articles' returns json with all articles, whose owner is current authorized user
'POST /articles' creates new article, dont forget about required params in req.body!*
'DELETE /articles/id' deletes card by id
```
*Article params: keyword, title, text, date, source, link(must be URL), image(must be URL)
