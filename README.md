# bookmaker - Test task for Fullstack


## About Test task
This Test task is supposing creating a simple bookmaker app, which is able to:

✅ Get bets from third-party provider **odd-gette**r service (in app folder)

✅ Receive new bets for placing via **place-bet** service (in app folder)

✅ Return my bets and odds to Google Sheet via **g-sheet** service

✅ Service to manage the HTTP connections - **gateway service**

## 🧩 App Structure
The app consists of four services:

* **odd-getter, place-bet, and g-sheet** are microservices on Nest.js
* communication between microservices is done via **Redis**, redis has been chosen with the aim to use it as a cache as well
* there is a **common** folder which contains reusable modules in those services: DB module (**PostgreSQL**), Event emitter, Redis connector, etc.

## ⚙️ How It Works

As a quick solution for the frontend it has been required to create a Google Sheet, which contains next pages:

* The **Bookmaker Sheet** contains the list with odds and a button to refresh them. By clicking on it, the odds will be refreshed.

* The **My Bets** page contains all your bets (⚠️ not only yours — just all bets).  I have not implemented user-specific bets as it was out of scope.

* The **Place-Bet** Sheet contains a form you can use to place a bet. Simple form submission, no advanced validation.

🙏 Final Note
Please, do not judge strong 🙃 — it was just a test task, and I had only 2 days to complete it.
Of course, there are a lot of things to improve, but many of them would need prior discussion and more precise requirements.



## Steps to run

⚠️ Please, be aware, that to run that app you will need couple integration tokens:
* with Google sheet api
* With the third party to get odds
* Have created your own google sheet and provide access to service account created via google api


### Next after cloning repository - install docker
Depends on your operating system

### Check env. file and change next main variables

The id of the spreadsheet to wchich you would like make changes (must be taken from the URL of your document)  
**GOOGLE_SPREADSHEET_ID=**


default names for sheets
**GOOGLE_MARKET_BOOK_SHEET_NAME=MarketBook  
GOOGLE_MY_BETS_SHEET_NAME=MyBets
GOOGLE_PLACE_BET_SHEET_NAME=PlaceBet**


file where the credentials for your service account are saved (for Google Sheet it is service account)  
**GOOGLE_SHEET_CREDENTIALS_FILE_NAME=g-sheet-credentials.json**

Credentials for postgres  
**DB_POSTGRES_USER=user   
DB_POSTGRES_PASS=pass**

Api Key to get provider odds  
**ODDS_API_KEY=**

⚠️  For local development if **redis & postgres started from docker container** - HOST variables can be changed to **localhost**

After all variables are checked and credentials file moved -> siquentaly
```
sudo docker-compose up odds-getter
sudo docker-compose up place-bet
sudo docker-compose up g-sheet
sudo docker-compose up gateway


```

Locally you could do npm install, in package json listed standard commands
```npm run start:[service name]```  service-name cluld be one of **odds-getter, place-bet, gateway, g-sheet**
