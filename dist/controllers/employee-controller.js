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
const employee_repository_1 = require("../repository/employee-repository");
const employee_entity_1 = require("../entities/employee-entity");
const RestResult_1 = require("../entities/RestResult");
const logger_1 = require("../utils/logger");
/**
 * @api {post} / Create a Employee.
 * API: Create the new Employee and Save in Database.
 */
exports.saveEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('saveEmployee method: POST');
    let employeeRepo = new employee_repository_1.EmployeeRepo();
    let restResult = new RestResult_1.RestResult();
    let employeeEntity = new employee_entity_1.EmployeeEntity();
    let empObj = req.body;
    let checkWithEmpName;
    let checkWithEmpemailaddress;
    try {
        let checkWithEmpName = yield employeeRepo.findEmployeeByName(empObj.empName);
        /** Here you need to validate Employee Name from Database.
            Let's check with Employee Name.
         */
        if (checkWithEmpName) {
            restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
            restResult.message = "Employee already exists with this name";
            return res.send(restResult);
        }
        let checkWithEmpemailaddress = yield employeeRepo.findEmployeeByemailAddress(empObj.emailAddress);
        /** Here you need to validate Employee EmailAddress from Database.
             Let's check with Employee EmailAddress.
          */
        if (checkWithEmpemailaddress) {
            restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
            restResult.message = "Employee already exists with this emailAddress";
            return res.send(restResult);
        }
        employeeEntity.id = empObj.id,
            employeeEntity.empName = empObj.empName,
            employeeEntity.firstName = empObj.firstName,
            employeeEntity.lastName = empObj.lastName,
            employeeEntity.phoneNumber = empObj.phoneNumber,
            employeeEntity.emailAddress = empObj.emailAddress,
            employeeEntity.salary = empObj.salary;
        employeeEntity.hireDate = new Date();
        yield employeeRepo.saveEmployee(employeeEntity).then((result) => {
            restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully created employee";
            restResult.data = result;
            return res.send(restResult);
        });
    }
    catch (error) {
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
});
/**
 * @api {get} / Getting All the Employees.
 * API: Performing GET Method for fetching the All Employees from Database.
 */
exports.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('getEmployees method: GET');
    let employeeRepo = new employee_repository_1.EmployeeRepo();
    let restResult = new RestResult_1.RestResult();
    try {
        yield employeeRepo.getEmployees().then((result) => {
            restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully Get Employees";
            restResult.data = result;
            return res.send(restResult);
        });
    }
    catch (error) {
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
});
/**
 * @api {post} / Employees By Department.
 * API: Performing the POST Method for fetching the Employees By Department from Database.
 */
exports.getEmployeesByDepartment = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('getEmployeesByDepartment method: POST');
    let employeeRepo = new employee_repository_1.EmployeeRepo();
    let restResult = new RestResult_1.RestResult();
    let deptID = req.body.deptID;
    try {
        if (deptID == undefined) {
            /** Here you need to validate user input.
             Let's check Department Id is required field.
            */
            restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
            restResult.message = "Parameter deptID required";
            restResult.data = null;
            return res.send(restResult);
        }
        yield employeeRepo.getEmployeesByDepartment(deptID).then((result) => {
            restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully get employees";
            restResult.data = result;
            return res.send(restResult);
        });
    }
    catch (error) {
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
});
/**
 * @api {Get} / Employees By Search.
 * API: Performing the GET Method for fetching the Employees By Search from Database.
 */
exports.getEmployeesBySearch = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('getEmployeesBySearch method: GET');
    let employeeRepo = new employee_repository_1.EmployeeRepo();
    let restResult = new RestResult_1.RestResult();
    let { firstName, lastName, hireDate, deptName } = req.query;
    try {
        yield employeeRepo.getEmployeesBySearch(firstName, lastName, hireDate, deptName).then((result) => {
            // console.log(result);
            restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully get employees";
            restResult.data = result;
            if (result.length <= 0) {
                restResult.message = "No Data Found";
            }
            return res.send(restResult);
        });
    }
    catch (_a) {
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
});
/**
 * @api {Get} / Employees By Max Salary.
 * API: Performing the GET Method for fetching the Employees By Employees Max Salary from Database.
 */
exports.getEmployeesByMaxSalary = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('getEmployeesByMaxSalary method: GET');
    let employeeRepo = new employee_repository_1.EmployeeRepo();
    let restResult = new RestResult_1.RestResult();
    try {
        yield employeeRepo.getEmployeesByMaxSalary().then((result) => {
            restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully get employees";
            restResult.data = result;
            if (result.length <= 0) {
                restResult.message = "No Data Found";
            }
            return res.send(restResult);
        });
    }
    catch (_b) {
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
});
/**
 * @api {post} / - Edit/Update the Employees.
 * API: Performing the POST Method for Edit the Employees.
 */
exports.editEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('editEmployees method: POST');
    let employeeRepo = new employee_repository_1.EmployeeRepo();
    let employeeEntity = new employee_entity_1.EmployeeEntity();
    let restResult = new RestResult_1.RestResult();
    let empCR = req.body;
    let empID = empCR.id;
    try {
        if (empID == undefined) {
            /** Here you need to validate user input.
             Let's check Employee Id is required field.
            */
            restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
            restResult.message = "Parameter empID is required";
            restResult.data = null;
            return res.send(restResult);
        }
        yield employeeRepo.getEmployeeById(empID).then((result) => __awaiter(this, void 0, void 0, function* () {
            if (result) {
                employeeEntity.id = empID,
                    employeeEntity.empName = empCR.empName,
                    employeeEntity.firstName = empCR.firstName,
                    employeeEntity.lastName = empCR.lastName;
                employeeEntity.emailAddress = empCR.emailAddress;
                yield employeeRepo.saveEmployee(employeeEntity).then((result) => {
                    if (result) {
                        employeeRepo.getEmployeeById(result.id).then((result) => {
                            restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
                            restResult.message = "Successfully updated the employee details";
                            restResult.data = result;
                            return res.send(restResult);
                        });
                    }
                });
            }
            else {
                restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
                restResult.message = "Employee not found with given empID";
                restResult.data = null;
                return res.send(restResult);
            }
        }));
    }
    catch (error) {
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
});
/**
 * @api {post} / Delete the Employees.
 * API: Delete the Employee from Database.
 */
exports.deleteEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('deleteEmployee method: GET');
    let employeeRepo = new employee_repository_1.EmployeeRepo();
    let restResult = new RestResult_1.RestResult();
    let empID = req.body.id;
    try {
        if (empID == undefined) {
            /** Here you need to validate user input.
             Let's check Employee Id is required field.
            */
            restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
            restResult.message = "Parameter empID is required";
            restResult.data = null;
            return res.send(restResult);
        }
        yield employeeRepo.getEmployeeById(empID).then((result) => __awaiter(this, void 0, void 0, function* () {
            if (result) {
                yield employeeRepo.deleteEmployeesById(result.id).then((result) => {
                    restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
                    restResult.message = "Successfully deleted Employee";
                    return res.send(restResult);
                });
            }
            else {
                restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
                restResult.message = "Employee not found with given empID";
                restResult.data = null;
                return res.send(restResult);
            }
        }));
    }
    catch (error) {
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
});
//# sourceMappingURL=employee-controller.js.map