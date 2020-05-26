"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const routes_1 = require("./routes");
/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use("/", routes_1.default);
/**
 * Create connection to DB using configuration provided in
 */
typeorm_1.createConnection({
    "type": "mysql",
    "host": process.env.MYSQL_HOST,
    "port": Number(process.env.MYSQL_PORT),
    "username": "root",
    "password": "",
    "database": process.env.MYSQL_DATABASE,
    "synchronize": false,
    "migrations": ["migration/*.js"],
    "cli": {
        "migrationsDir": "migration"
    },
    "entities": [
        "dist/entities/*.js"
    ]
}).then((_connection) => __awaiter(this, void 0, void 0, function* () {
    console.log('successfully connected to database');
})).catch(error => console.log('Typeorm connection error ' + error));
exports.default = app;
//# sourceMappingURL=app.js.map