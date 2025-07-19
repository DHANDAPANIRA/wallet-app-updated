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

