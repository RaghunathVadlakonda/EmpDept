"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_routes_1 = require("./employee-routes");
const department_routes_1 = require("./department-routes");
const routes = express_1.Router();
routes.use('/user', employee_routes_1.default);
routes.use('/', department_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map