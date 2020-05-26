// ************** unit test **************
// ************** Assertion Library **************
import * as typeorm from 'typeorm';
import * as chai from 'chai';
import { expect } from 'chai';
//import * as sinon from 'sinon';

// ************** Mocks Request and Response  **************
import * as httpMocks from 'node-mocks-http';
import * as employeeController from '../controllers/employee-controller';

// ************** Mock Object **************
import { getAllEmployees } from '../__mocksData__/getAllEmployees';
import { getEmployeesByDepartment } from '../__mocksData__/getEmployeesByDepartment';
import { getEmployeesBySearch } from '../__mocksData__/getEmployeesBySearch';
import { getEmployeesByMaxSalary } from '../__mocksData__/getEmployeesByMaxSalary';
import { saveEmployee } from '../__mocksData__/saveEmployee';
import { editEmployee } from '../__mocksData__/editEmployee';
import { deleteEmployee } from '../__mocksData__/deleteEmployee';
import { EmployeeRepo } from '../repository/employee-repository';


describe('Unit test Employee', () => {
       let employeeRepo: EmployeeRepo = new EmployeeRepo();

       it('should get all Employees', (done) => {
           const mockRequest = httpMocks.createRequest({
               method: "GET",
               url: "/getAllEmployees"
           });
   
           const mockResponse = httpMocks.createResponse({
               eventEmitter: require('events').EventEmitter
           });
           const actualResponseBody:any = mockResponse._getData();
           const expectedResponseBody:any = getAllEmployees;
           expect(Array.isArray(expectedResponseBody)).to.true;
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
           const actualResponseBody: any = mockResponse._getData();
           const expectedResponseBody: any = getEmployeesByDepartment;
           expect(Array.isArray(expectedResponseBody)).to.true;
           employeeController.getEmployeesByDepartment(mockRequest, mockResponse);
           done();
       })

       it('should get Employees by Search', (done) => {
           const mockRequest = httpMocks.createRequest({
               method: "GET",
               url: "/getEmployeesBysearch"
           });

           const mockResponse = httpMocks.createResponse({
               eventEmitter: require('events').EventEmitter
           });
           const actualResponseBody: any = mockResponse._getData();
           const expectedResponseBody: any = getEmployeesBySearch;
           expect(Array.isArray(expectedResponseBody)).to.true;
           employeeController.getEmployeesBySearch(mockRequest, mockResponse);
           done();
       })

       it('should get Employees by Max Salary', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "GET",
            url: "/getEmployeesByMaxSalary"
        });

        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody: any = mockResponse._getData();
        const expectedResponseBody: any = getEmployeesByMaxSalary;
        expect(Array.isArray(expectedResponseBody)).to.true;
        employeeController.getEmployeesByMaxSalary(mockRequest, mockResponse);
        done();
    })

       it('should save Employee', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/saveEmployee"
        });

        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody: any = mockResponse._getData();
        const expectedResponseBody: any = saveEmployee;
        expect((expectedResponseBody)).to.be.an('object');
        employeeController.saveEmployee(mockRequest, mockResponse);
        done();
    })
      
    it('should edit Employee', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/editEmployee"
        });

        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody: any = mockResponse._getData();
        const expectedResponseBody: any = editEmployee;
        expect((expectedResponseBody)).to.be.an('object');
        employeeController.editEmployees(mockRequest, mockResponse);
        done();
    })

    it('should delete Employee', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/deleteEmployee"
        });

        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody: any = mockResponse._getData();
        const expectedResponseBody: any = deleteEmployee;
        expect((expectedResponseBody)).to.be.an('object');
        employeeController.deleteEmployees(mockRequest, mockResponse);
        done();
    })
   });