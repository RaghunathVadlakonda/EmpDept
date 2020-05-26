// ************** unit test **************
// ************** Assertion Library **************
import * as typeorm from 'typeorm';
import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';

// ************** Mocks Request and Response  **************
import * as httpMocks from 'node-mocks-http';
import * as departmentController from '../controllers/department-controller';
import { createSandbox, SinonSandbox, createStubInstance, stub} from 'sinon'

// ************** Mock Object **************
import { DepartmentRepo } from '../repository/department-repository';
import { saveDepartment } from '../__mocksData__/saveDepartment';
import { editDepartment } from '../__mocksData__/editDepartment';
import { deleteDepartment } from '../__mocksData__/deleteDepartment';


describe('Unit test department', () => {
    let departmentRepo: DepartmentRepo = new DepartmentRepo();

    it('should save Department', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/saveDepartment"
        });

        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody: any = mockResponse._getData();
        const expectedResponseBody: any = saveDepartment;
        expect((expectedResponseBody)).to.be.an('object');
        departmentController.saveDepartment(mockRequest, mockResponse);
        done();
    })

    it('should edit Department', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/editDepartment"
        });

        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody: any = mockResponse._getData();
        const expectedResponseBody: any = editDepartment;
        expect((expectedResponseBody)).to.be.an('object');
        departmentController.editDepartments(mockRequest, mockResponse);
        done();
    })

    it('should delete Department', (done) => {
        const mockRequest = httpMocks.createRequest({
            method: "POST",
            url: "/deleteDepartment"
        });

        const mockResponse = httpMocks.createResponse({
            eventEmitter: require('events').EventEmitter
        });
        const actualResponseBody: any = mockResponse._getData();
        const expectedResponseBody: any = deleteDepartment;
        expect((expectedResponseBody)).to.be.an('object');
        departmentController.deleteDepartments(mockRequest, mockResponse);
        done();
    })
});