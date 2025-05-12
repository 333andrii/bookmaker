# bookmaker



### Next after cloning repository - install docker
### Start step by step run those containers
```
 sudo docker-compose up -d redis
 sudo docker-compose up -d postgres

```

If they are run normally, move on with other settings

### Check env. file and change next main variables

the id of the spreadsheet to wchich you would like make changes
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

For local development if **redis & postgres started from docker container** - HOST variables can be changed to **localhost**

After all variables are checked and credentials file moved -> siquentaly
```
sudo docker-compose up odds-getter
sudo docker-compose up place-bet
sudo docker-compose up g-sheet
sudo docker-compose up gateway


```

Locally you could do npm install, in package json listed standard commands
```npm run start:[service name]```  //odds-getter, place-bet, gateway, g-sheet
