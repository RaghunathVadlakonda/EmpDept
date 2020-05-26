import { Request, Response } from 'express';
import { DepartmentRepo } from '../repository/department-repository';
import { DepartmentEntity } from '../entities/department-entity';
import { RestResult } from '../entities/RestResult';
import { logger } from '../utils/logger';

/**
 * @api {post} / Create a Department.
 * API: Create the new Department and Save in Database.
 */
export let saveDepartment = async(req:Request, res:Response) => {
    logger.info('saveDepartment method: POST');
    let departmentRepo: DepartmentRepo = new DepartmentRepo();
    let departmentEntity: DepartmentEntity = new DepartmentEntity();
    let restResult: RestResult = new RestResult();
    let deptObj = req.body;
    let checkWithDeptName: any;

    try {
        let checkWithDeptName = await departmentRepo.findDepartmentByName(deptObj.deptName)
        /** Here you need to validate Department Name from Database. 
             Let's check with Department Name.
          */
        if(checkWithDeptName) {
            restResult.status = RestResult.REST_RESULT_FAILURE;
            restResult.message = "Department already exists with this name";
            return res.send(restResult);
        } else {
            departmentEntity.id = deptObj.id,
            departmentEntity.deptName = deptObj.deptName

            await departmentRepo.saveDepartment(departmentEntity).then((result) => {
                restResult.status = RestResult.REST_RESULT_SUCCESS;
                restResult.message = "Successfully created department";
                restResult.data = result;
                return res.send(restResult);
            })
        }
    } catch(error) {
        restResult.status = RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);

    }
}


/**
 * @api {post} / - Edit/Update the Departments.
 * API: Performing the POST Method for Edit the Department.
 */
export let editDepartments = async(req:Request, res:Response) => {
    logger.info('editEmployees method: POST');
    let departmentEntity: DepartmentEntity = new DepartmentEntity();
    let departmentRepo: DepartmentRepo = new DepartmentRepo();
    let restResult: RestResult = new RestResult();
    let deptCR = req.body;
    let deptID = deptCR.id;

    try {

        if(deptID == undefined){
            /** Here you need to validate user input. 
             Let's check Department Id is required field.
            */
                restResult.status = RestResult.REST_RESULT_FAILURE;
                restResult.message = "Parameter deptID is required";
                restResult.data = null;
                return res.send(restResult);
        }

        await departmentRepo.getDepartmentById(deptCR.id).then(async(result) => {
            if(result) {
                departmentEntity.id = deptID,
                departmentEntity.deptName = deptCR.deptName,
                
                await departmentRepo.saveDepartment(departmentEntity).then(async(result) => {
                    if(result){
                        await departmentRepo.getDepartmentById(result.id).then((result) => {
                            restResult.status = RestResult.REST_RESULT_SUCCESS;
                            restResult.message = "Successfully updated the department details";
                            restResult.data = result;
                            return res.send(restResult);
                        })
                    }
                })
            } else {
                restResult.status = RestResult.REST_RESULT_FAILURE;
                restResult.message = "Department not found with given deptID";
                restResult.data = null;
                return res.send(restResult);
            }
        })
    } catch(error) {
        restResult.status = RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
}


/**
 * API: Delete the Department from Database.
 */
export let deleteDepartments = async(req:Request, res:Response) => {
    logger.info('deleteDepartments method: GET');
    let departmentRepo: DepartmentRepo = new DepartmentRepo();
    let restResult: RestResult = new RestResult();
    
    let deptID = req.body.id;

    if(deptID == undefined){
            /** Here you need to validate user input. 
             Let's check Department Id is required field.
            */
            restResult.status = RestResult.REST_RESULT_FAILURE;
            restResult.message = "Parameter deptId is required";
            restResult.data = null;
            return res.send(restResult);
    }

    try {
        await departmentRepo.getDepartmentById(deptID).then(async(result) => {
            if(result){
                await departmentRepo.deleteDepartmentsById(result.id).then((result) => {
                    restResult.status = RestResult.REST_RESULT_SUCCESS;
                    restResult.message = "Successfully deleted department"
                    return res.send(restResult);
                })
            } else {
                restResult.status = RestResult.REST_RESULT_FAILURE;
                restResult.message = "Department not found with given deptID";
                restResult.data = null;
                return res.send(restResult);
            }
        })
    } catch(error) {
        restResult.status = RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
}
