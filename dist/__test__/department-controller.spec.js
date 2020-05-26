"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
// ************** Mocks Request and Response  **************
const httpMocks = require("node-mocks-http");
const departmentController = require("../controllers/department-controller");
// ************** Mock Object **************
const department_repository_1 = require("../repository/department-repository");
const saveDepartment_1 = require("../__mocksData__/saveDepartment");
const editDepartment_1 = require("../__mocksData__/editDepartment");
const deleteDepartment_1 = require("../__mocksData__/deleteDepartment");
describe('Unit test department', () => {
    let departmentRepo = new department_repository_1.DepartmentRepo();
    it('should save Department', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/saveDepartment"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = saveDepartment_1.saveDepartment;
        chai_1.expect((expectedResponseBody)).to.be.an('object');
        departmentController.saveDepartment(mockRequest, mockResponse);
        done();
    });
    it('should edit Department', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/editDepartment"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = editDepartment_1.editDepartment;
        chai_1.expect((expectedResponseBody)).to.be.an('object');
        departmentController.editDepartments(mockRequest, mockResponse);
        done();
    });
    it('should delete Department', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/deleteDepartment"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = deleteDepartment_1.deleteDepartment;
        chai_1.expect((expectedResponseBody)).to.be.an('object');
        departmentController.deleteDepartments(mockRequest, mockResponse);
        done();
    });
});
//# sourceMappingURL=department-controller.spec.js.map