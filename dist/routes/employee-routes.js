"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
/**
 * Controllers (route handlers).
 */
const employeeController = require("../controllers/employee-controller");
// Create Employee
router.post('/saveEmployee', employeeController.saveEmployee);
// Get All Employees
router.get('/getAllEmployees', employeeController.getAllEmployees);
// Get Employees By Department
router.post('/getEmployeesByDept', employeeController.getEmployeesByDepartment);
// Get Employees By given search Details
router.get('/getEmployeesBysearch', employeeController.getEmployeesBySearch);
// Get Employees By top salary with department wise
router.get('/getEmployeesByMaxSalary', employeeController.getEmployeesByMaxSalary);
// Edit the Employees
router.post('/editEmployee', employeeController.editEmployees);
//delete the Employee
router.post('/deleteEmployee', employeeController.deleteEmployees);
exports.default = router;
//# sourceMappingURL=employee-routes.js.map