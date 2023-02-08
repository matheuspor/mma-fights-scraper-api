<h1 align="center">
  🥊MMA Fights Scraper API
</h1>
<p align="center">🤼‍ Scrapes upcoming fights schedule and serves data in JSON format </p>

<div align="center">
  
  <a href="">![Repository license](https://img.shields.io/github/license/matheuspor/mma-fights-scraper-api)</a>
  <a href="">![GitHub workflow status](https://img.shields.io/github/checks-status/matheuspor/mma-fights-scraper-api/main)</a>
  <a href="">![Repository top language](https://img.shields.io/github/languages/top/matheuspor/mma-fights-scraper-api)</a>
  <a href="">![Test-coverage](https://img.shields.io/codecov/c/github/matheuspor/mmafightsscraperapi?style=plastic)</a>
  <a href="">[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=matheuspor_mma-fights-web-scraper&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=matheuspor_mma-fights-web-scraper)</a>
  
</div>

  <p align="center">
    <a href="#about">About</a> •
    <a href="#api-docs">Api Docs</a> •
    <a href="#usage">Usage</a> • 
    <a href="#run-locally">Run Locally</a> 
  </p>
  
## About 

  <p align="center">   
  ⚒️REST API built with Typescript, Express, Cheerio. <br>
  Scrapes <a href="https://www.ufc.com/events">UFC Events</a> pages to get every fight from each event and serves in its endpoints.
  </p>

## Api Docs

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=mma-fights-scraper-api&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmatheuspor%2Fmma-fights-scraper-api%2Fmain%2F.insomnia%2Fexport.json)

## Usage

<h3> Get list of upcoming events </h3>

  <p> Example Request: <p>
  
  ```bash
  GET http://mmafightsscraperapi-env.eba-zihpvn2j.us-east-1.elasticbeanstalk.com/api/events
  ```  
  <p> <em> Response: </em> </p>

```bash
[ {
  "_id": "...",
  "title": "...",
  "date": "...",
  "event": "...",
  "time": "...",
  "url": ""
}, { ... } ]
```
---

  <h3> Get list of upcoming events with all fights in the event sorted by fighting order </h3>
  
  <p> Example Request: <p>
  
  ```bash
  GET http://mmafightsscraperapi-env.eba-zihpvn2j.us-east-1.elasticbeanstalk.com/api/event-card
  ``` 
  
  <p> <em> Response: </em> </p>

```bash
[ {
  "_id": '...',
  "fights": [ {
    "redCornerFighter": "...",
    "blueCornerFighter": "..."
  }. { ... } ], 
  }, { ... } ]
```

---

  ### Get one event with all fights by event `_id`
  
  <p> Example Request: <p>
  
  ```bash
  GET http://mmafightsscraperapi-env.eba-zihpvn2j.us-east-1.elasticbeanstalk.com/api/event-card/1
  ``` 
  
  <p> <em> Response: </em> </p>

```bash
{
  "_id": '...',
  "fights": [ {
    "redCornerFighter": "...",
    "blueCornerFighter": "..."
  }, { ... } ]
}
```

## Run Locally

This project runs by default on `http://localhost:3001`<br>
Fill the empty .env if using custom port.

Build containers and start server
```bash
# Install docker-compose if not already: "https://docs.docker.com/compose/install/"

# Clone repo
$ git clone https://github.com/matheuspor/mma-fights-scraper-api

# Build containers and start api
$ npm run compose:up
```

Run Test suite
```bash
$ npm run test
```

Run Test coverage
```bash
$ npm run test:coverage
```
