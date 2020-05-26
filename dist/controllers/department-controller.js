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
const department_repository_1 = require("../repository/department-repository");
const department_entity_1 = require("../entities/department-entity");
const RestResult_1 = require("../entities/RestResult");
const logger_1 = require("../utils/logger");
/**
 * @api {post} / Create a Department.
 * API: Create the new Department and Save in Database.
 */
exports.saveDepartment = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('saveDepartment method: POST');
    let departmentRepo = new department_repository_1.DepartmentRepo();
    let departmentEntity = new department_entity_1.DepartmentEntity();
    let restResult = new RestResult_1.RestResult();
    let deptObj = req.body;
    let checkWithDeptName;
    try {
        let checkWithDeptName = yield departmentRepo.findDepartmentByName(deptObj.deptName);
        /** Here you need to validate Department Name from Database.
             Let's check with Department Name.
          */
        if (checkWithDeptName) {
            restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
            restResult.message = "Department already exists with this name";
            return res.send(restResult);
        }
        else {
            departmentEntity.id = deptObj.id,
                departmentEntity.deptName = deptObj.deptName;
            yield departmentRepo.saveDepartment(departmentEntity).then((result) => {
                restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
                restResult.message = "Successfully created department";
                restResult.data = result;
                return res.send(restResult);
            });
        }
    }
    catch (error) {
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
});
/**
 * @api {post} / - Edit/Update the Departments.
 * API: Performing the POST Method for Edit the Department.
 */
exports.editDepartments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('editEmployees method: POST');
    let departmentEntity = new department_entity_1.DepartmentEntity();
    let departmentRepo = new department_repository_1.DepartmentRepo();
    let restResult = new RestResult_1.RestResult();
    let deptCR = req.body;
    let deptID = deptCR.id;
    try {
        if (deptID == undefined) {
            /** Here you need to validate user input.
             Let's check Department Id is required field.
            */
            restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
            restResult.message = "Parameter deptID is required";
            restResult.data = null;
            return res.send(restResult);
        }
        yield departmentRepo.getDepartmentById(deptCR.id).then((result) => __awaiter(this, void 0, void 0, function* () {
            if (result) {
                departmentEntity.id = deptID,
                    departmentEntity.deptName = deptCR.deptName,
                    yield departmentRepo.saveDepartment(departmentEntity).then((result) => __awaiter(this, void 0, void 0, function* () {
                        if (result) {
                            yield departmentRepo.getDepartmentById(result.id).then((result) => {
                                restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
                                restResult.message = "Successfully updated the department details";
                                restResult.data = result;
                                return res.send(restResult);
                            });
                        }
                    }));
            }
            else {
                restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
                restResult.message = "Department not found with given deptID";
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
 * API: Delete the Department from Database.
 */
exports.deleteDepartments = (req, res) => __awaiter(this, void 0, void 0, function* () {
    logger_1.logger.info('deleteDepartments method: GET');
    let departmentRepo = new department_repository_1.DepartmentRepo();
    let restResult = new RestResult_1.RestResult();
    let deptID = req.body.id;
    if (deptID == undefined) {
        /** Here you need to validate user input.
         Let's check Department Id is required field.
        */
        restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
        restResult.message = "Parameter deptId is required";
        restResult.data = null;
        return res.send(restResult);
    }
    try {
        yield departmentRepo.getDepartmentById(deptID).then((result) => __awaiter(this, void 0, void 0, function* () {
            if (result) {
                yield departmentRepo.deleteDepartmentsById(result.id).then((result) => {
                    restResult.status = RestResult_1.RestResult.REST_RESULT_SUCCESS;
                    restResult.message = "Successfully deleted department";
                    return res.send(restResult);
                });
            }
            else {
                restResult.status = RestResult_1.RestResult.REST_RESULT_FAILURE;
                restResult.message = "Department not found with given deptID";
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
//# sourceMappingURL=department-controller.js.map