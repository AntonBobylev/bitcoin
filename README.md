# Anton Bobylev | Historical Bitcoin Price Data Application

## Setup

#### Make sure to install the dependencies
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

#### Database
1. Install mysql database.
2. Go to .env file and change database credentials there.
3. Execute _db/db_init.sql.

#### Running
##### Development
```bash
npm run dev
```

##### Production
```bash
npm run build
npm run preview
```

## Application gallery
### Home page
The home page welcomes the user with two main blocks:
![home_page](https://github.com/AntonBobylev/bitcoin/assets/25329821/15378a96-1d20-4502-bd0d-5cd07f2f5004)
1. Button to get the current Bitcoin exchange rate (Get current bitcoin value).
2. Table with historical data on the Bitcoin exchange rate of previously pressed attempts. There is two columns: datetime and price.

### Chart page
The chart page welcomes the user with two fields:
![chart_page](https://github.com/AntonBobylev/bitcoin/assets/25329821/06a82e8f-08b1-400d-8c37-40152f5535b6)
1. Dates selector. User can select either one day or a range of dates.
2. Chart of Bitcoin historical data which depends on the dates selector located above

Dates that aren't in database are disabled
![chart_page_disabled_dates](https://github.com/AntonBobylev/bitcoin/assets/25329821/945defca-ad4d-478d-84ba-1d08b1f75c0e)

Single date chart rebuilding in runtime.
![chart_page_single_date_chart](https://github.com/AntonBobylev/bitcoin/assets/25329821/3837bb25-d9dd-478d-affd-4ff38e55e1d7)
![chart_page_single_date_chart1](https://github.com/AntonBobylev/bitcoin/assets/25329821/6789478a-cd77-43b9-b028-2245dab2fd10)
