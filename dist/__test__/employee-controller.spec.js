"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
//import * as sinon from 'sinon';
// ************** Mocks Request and Response  **************
const httpMocks = require("node-mocks-http");
const employeeController = require("../controllers/employee-controller");
// ************** Mock Object **************
const getAllEmployees_1 = require("../__mocksData__/getAllEmployees");
const getEmployeesByDepartment_1 = require("../__mocksData__/getEmployeesByDepartment");
const getEmployeesBySearch_1 = require("../__mocksData__/getEmployeesBySearch");
const getEmployeesByMaxSalary_1 = require("../__mocksData__/getEmployeesByMaxSalary");
const saveEmployee_1 = require("../__mocksData__/saveEmployee");
const editEmployee_1 = require("../__mocksData__/editEmployee");
const deleteEmployee_1 = require("../__mocksData__/deleteEmployee");
const employee_repository_1 = require("../repository/employee-repository");
describe('Unit test Employee', () => {
    let employeeRepo = new employee_repository_1.EmployeeRepo();
    it('should get all Employees', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "GET",
            url: "/getAllEmployees"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = getAllEmployees_1.getAllEmployees;
        chai_1.expect(Array.isArray(expectedResponseBody)).to.true;
        employeeController.getAllEmployees(mockRequest, mockResponse);
        done();
    });
    it('should get Employees by Department', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/getEmployeesByDept"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = getEmployeesByDepartment_1.getEmployeesByDepartment;
        chai_1.expect(Array.isArray(expectedResponseBody)).to.true;
        employeeController.getEmployeesByDepartment(mockRequest, mockResponse);
        done();
    });
    it('should get Employees by Search', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "GET",
            url: "/getEmployeesBysearch"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = getEmployeesBySearch_1.getEmployeesBySearch;
        chai_1.expect(Array.isArray(expectedResponseBody)).to.true;
        employeeController.getEmployeesBySearch(mockRequest, mockResponse);
        done();
    });
    it('should get Employees by Max Salary', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "GET",
            url: "/getEmployeesByMaxSalary"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = getEmployeesByMaxSalary_1.getEmployeesByMaxSalary;
        chai_1.expect(Array.isArray(expectedResponseBody)).to.true;
        employeeController.getEmployeesByMaxSalary(mockRequest, mockResponse);
        done();
    });
    it('should save Employee', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/saveEmployee"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = saveEmployee_1.saveEmployee;
        chai_1.expect((expectedResponseBody)).to.be.an('object');
        employeeController.saveEmployee(mockRequest, mockResponse);
        done();
    });
    it('should edit Employee', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/editEmployee"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = editEmployee_1.editEmployee;
        chai_1.expect((expectedResponseBody)).to.be.an('object');
        employeeController.editEmployees(mockRequest, mockResponse);
        done();
    });
    it('should delete Employee', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/deleteEmployee"
        });
        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody = mockResponse._getData();
        const expectedResponseBody = deleteEmployee_1.deleteEmployee;
        chai_1.expect((expectedResponseBody)).to.be.an('object');
        employeeController.deleteEmployees(mockRequest, mockResponse);
        done();
    });
});
//# sourceMappingURL=employee-controller.spec.js.map