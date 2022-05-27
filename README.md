<h1 align="center">
  🥊MMA Fights Scraper API
</h1>
<p align="center">🤼‍♂️Scrapes upcoming fights schedule from <a href="http://ufcstats.com/statistics/events/upcoming">UFCStats</a> and returns data in JSON format </p>

<div align="center">
  
  <a href="">![GitHub license](https://img.shields.io/github/license/matheuspor/mma-fights-scraper-api)</a>
  <a href="">![GitHub workflow status](https://img.shields.io/github/workflow/status/matheuspor/mma-fights-web-scraper/Node.js%20Tests)</a>
  <a href="">![Repo top language](https://img.shields.io/github/languages/top/matheuspor/mma-fights-scraper-api)</a>
  
</div>

  <p align="center">
    <a href="#about">About</a> •
    <a href="#api-docs">Api Docs</a> •
    <a href="#usage">Usage</a> • 
    <a href="#run-locally">Run Locally</a> 
  </p>
  
## About 

  <p align="center">   
  ⚒️REST API built with Typescript, Express, Cheerio and MongoDB. <br>
  Scrapes UFC events schedule page, saves data as a MongoDB collection and serves in its endpoints.
  </p>

## Api Docs

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=mma-fights-scraper-api&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmatheuspor%2Fmma-fights-scraper-api%2Fmain%2F.insomnia%2Fexport.json)

## Usage

<em> Note: The first request might take a while since the api is hosted on a free Heroku web dyno. </em>

<h3> Get list of upcoming fights </h3>

  <p> Example Request: <p>
  
  ```bash
  GET https://mma-fights-scraper-api.herokuapp.com/api/fights
  ```  
  <p> <em> Output </em> </p>

```bash
[ {
  "title": "...",
  "date": "...",
  "fightNight": "...",
  "time": "...",
  "url": ""
}, { ... } ]
```
---

  <h3> Get list of upcoming fights with card </h3>
  
  <p> Example Request: <p>
  
  ```bash
  GET https://mma-fights-scraper-api.herokuapp.com/api/fights-card
  ``` 
  
  <p> <em> Output </em> </p>

```bash
[ {
"fight": {
  "title": "...",
  "date": "...",
  "fightNight": "...",
  "time": "...",
  "url": ""
},
"card": [ {
  "redCornerName": "...",
  "redCornerPhoto": "...",
  "blueCornerName": "...",
  "blueCornerPhoto": "..."
 }. { ... } ],
}, { ... } ]
```

---

  <h3> Get a fight-card by fightId </h3>
  
  <p> Example Request: <p>
  
  ```bash
  GET https://mma-fights-scraper-api.herokuapp.com/api/fights-card/0
  ``` 
  
  <p> <em> Output </em> </p>

```bash
{
"fight": {
  "title": "...",
  "date": "...",
  "fightNight": "...",
  "time": "...",
  "url": ""
},
"card": [ {
  "redCornerName": "...",
  "redCornerPhoto": "...",
  "blueCornerName": "...",
  "blueCornerPhoto": "..."
 }. { ... } ],
}
```

## Run Locally

This project runs by default on "http://localhost:3001" and connects to a MongoDB Docker container in "mongodb://mongodb:27017". <br>
Set .env file variables if using custom port or custom mongodb connection.

Starts server

```bash
# Clone repo
$ git clone https://github.com/matheuspor/mma-fights-scraper-api

# Starts api and mongodb as a Docker container
$ npm run compose-up
```

Run Test suite

```bash
$ npm run test
```

Run Test coverage

```bash
$ npm run test:coverage
```