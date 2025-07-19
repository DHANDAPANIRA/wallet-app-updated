# wallet-app-updated

## Node.js (v16 or above)
## PostgreSQL (local or Docker)
## pgAdmin (optional GUI for PostgreSQL)

## go to backend directory

npm init -y
npm install express sequelize pg pg-hstore dotenv cors nodemon  -- all the nessary packages

create .env file -- database connection details are added
create config/db.js  -- database authenticate checked

Setup Express:
add server.js
cors, dotenv, sequelize and walletRoutes are added and ssequelize.sync are done here 

## Running the app
$ npm run dev ---to start the dev using nodemon or
$ node server.js -- start server using node
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## go to frontend directory

npx create-react-app frontend
cd frontend
npm install axios react-bootstrap bootstrap

import bootstrap to index.js file
import 'bootstrap/dist/css/bootstrap.min.css';

crated .env file: to connect API server
REACT_APP_API_URL=http://localhost:5000/api

## Running the app
## `npm start`
### `npm run build`



-- USERS TABLE schema
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRANSACTIONS TABLE schema
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('deposit', 'withdraw')),
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  running_balance DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

## Postman collection:
https://api.postman.com/collections/8628789-d3c551dd-ef77-4f55-978e-be9a483d95ef?access_key=PMAT-01K09A39WK15BCYE4H9YPCMFKC

or json collection

{
	"info": {
		"_postman_id": "d3c551dd-ef77-4f55-978e-be9a483d95ef",
		"name": "Wallet-APP",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "8628789"
	},
	"item": [
		{
			"name": "Deposit",
			"request": {
				"auth": {
					"type": "basic",
					"basic": [
						{
							"key": "password",
							"value": "postgres",
							"type": "string"
						},
						{
							"key": "username",
							"value": "postgres",
							"type": "string"
						}
					]
				},
				"method": "POST",
				"header": [
					{
						"key": "sec-ch-ua-platform",
						"value": "\"Windows\""
					},
					{
						"key": "Referer",
						"value": "http://localhost:3000/"
					},
					{
						"key": "User-Agent",
						"value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
					},
					{
						"key": "Accept",
						"value": "application/json, text/plain, */*"
					},
					{
						"key": "sec-ch-ua",
						"value": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\""
					},
					{
						"key": "Content-Type",
						"value": "application/json"
					},
					{
						"key": "sec-ch-ua-mobile",
						"value": "?0"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"userId\": 1,\r\n    \"amount\": 2\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5000/api/deposit",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"api",
						"deposit"
					]
				}
			},
			"response": []
		},
		{
			"name": "Withdraw",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"userId\": 1,\r\n    \"amount\": 5\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5000/api/withdraw",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"api",
						"withdraw"
					]
				}
			},
			"response": []
		},
		{
			"name": "User Balance",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": " {\r\n    \"userId\": \"1\"\r\n }",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5000/api/2",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"api",
						"2"
					]
				}
			},
			"response": []
		},
		{
			"name": "All Transactions List based on userID",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5000/api/transactions/1",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"api",
						"transactions",
						"1"
					]
				}
			},
			"response": []
		},
		{
			"name": "daily-summary based on the userID",
			"request": {
				"auth": {
					"type": "noauth"
				},
				"method": "GET",
				"header": [],
				"url": {
					"raw": "http://localhost:5000/api/daily-summary/1",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"api",
						"daily-summary",
						"1"
					]
				}
			},
			"response": []
		}
	]
}
