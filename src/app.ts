require('dotenv').config()
import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import routes from './routes';

/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3013);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("Press CTRL-C to stop\n");
});

// Set all routes from routes folder
app.use("/", routes);

/**
 * Create connection to DB using configuration provided in
 */
 createConnection({
   "type":"mysql",
   "host":process.env.MYSQL_HOST,
   "port":Number(process.env.MYSQL_PORT),
   "username":"root",
   "password":"root",
   "database":process.env.MYSQL_DATABASE,
   "synchronize": false,
   "migrations":["migration/*.js"],
   "cli": {
     "migrationsDir": "migration"
   },
   "entities": [
      "dist/entities/*.js"
   ]
 }).then(async _connection => {
   console.log('successfully connected to database');
 }).catch(error => console.log('Typeorm connection error '+ error));


export default app;
