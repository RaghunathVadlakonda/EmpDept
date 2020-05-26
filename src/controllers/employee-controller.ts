import { Request, Response } from 'express';
import { EmployeeRepo } from '../repository/employee-repository';
import { EmployeeEntity } from '../entities/employee-entity';
import { RestResult } from '../entities/RestResult';
import { logger } from '../utils/logger';


/**
 * @api {post} / Create a Employee.
 * API: Create the new Employee and Save in Database.
 */
export let saveEmployee = async(req:Request, res:Response) => {
    logger.info('saveEmployee method: POST');
    let employeeRepo: EmployeeRepo = new EmployeeRepo();
    let restResult: RestResult = new RestResult();
    let employeeEntity: EmployeeEntity = new EmployeeEntity();
    let empObj = req.body;
    let checkWithEmpName: any;
    let checkWithEmpemailaddress: any;

    try {
        let checkWithEmpName = await employeeRepo.findEmployeeByName(empObj.empName)
         /** Here you need to validate Employee Name from Database. 
             Let's check with Employee Name.
          */
        if(checkWithEmpName) {
            restResult.status = RestResult.REST_RESULT_FAILURE;
            restResult.message = "Employee already exists with this name";
            return res.send(restResult);
        }

        let checkWithEmpemailaddress = await employeeRepo.findEmployeeByemailAddress(empObj.emailAddress)
        /** Here you need to validate Employee EmailAddress from Database. 
             Let's check with Employee EmailAddress.
          */
        if(checkWithEmpemailaddress) {
            restResult.status = RestResult.REST_RESULT_FAILURE;
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
            await employeeRepo.saveEmployee(employeeEntity).then((result) => {
                restResult.status = RestResult.REST_RESULT_SUCCESS;
                restResult.message = "Successfully created employee";
                restResult.data = result;
                return res.send(restResult);
            })
        
    } catch(error) {
        restResult.status = RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
}


/**
 * @api {get} / Getting All the Employees.
 * API: Performing GET Method for fetching the All Employees from Database.
 */
export let getAllEmployees = async(req:Request, res:Response) => {
    logger.info('getEmployees method: GET');
    let employeeRepo: EmployeeRepo = new EmployeeRepo();
    let restResult: RestResult = new RestResult();

    try {
        await employeeRepo.getEmployees().then((result) => {
            restResult.status = RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully Get Employees";
            restResult.data = result;
            return res.send(restResult);
        })
    } catch(error) {
        restResult.status = RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
}


/**
 * @api {post} / Employees By Department.
 * API: Performing the POST Method for fetching the Employees By Department from Database.
 */
export let getEmployeesByDepartment = async(req:Request, res:Response) => {
    logger.info('getEmployeesByDepartment method: POST');
    let employeeRepo: EmployeeRepo = new EmployeeRepo();
    let restResult: RestResult = new RestResult();
    let deptID = req.body.deptID;

    try {
        if(deptID == undefined) {
            /** Here you need to validate user input. 
             Let's check Department Id is required field.
            */
            restResult.status = RestResult.REST_RESULT_FAILURE;
            restResult.message = "Parameter deptID required";
            restResult.data = null;
            return res.send(restResult);

        }
        await employeeRepo.getEmployeesByDepartment(deptID).then((result) => {
            restResult.status = RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully get employees";
            restResult.data = result;
            return res.send(restResult);
        })
    } catch(error) {
        restResult.status = RestResult.REST_RESULT_FAILURE;
        restResult.message = "Internal server error";
        restResult.data = null;
        return res.send(restResult);
    }
}


/**
 * @api {Get} / Employees By Search.
 * API: Performing the GET Method for fetching the Employees By Search from Database.
 */
export let getEmployeesBySearch = async (req:Request, res:Response) => {
    logger.info('getEmployeesBySearch method: GET');
    let employeeRepo: EmployeeRepo = new EmployeeRepo();
    let restResult: RestResult = new RestResult();

    let {firstName,lastName,hireDate,deptName} = req.query;

    try {
        await employeeRepo.getEmployeesBySearch(firstName,lastName,hireDate,deptName).then((result) => {
            // console.log(result);
            restResult.status = RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully get employees";
            restResult.data = result;
            if(result.length <= 0) {
                restResult.message = "No Data Found";
            }
            return res.send(restResult);
        })
    } catch {
            restResult.status = RestResult.REST_RESULT_FAILURE;
            restResult.message = "Internal server error";
            restResult.data = null;
            return res.send(restResult);
    }
}


/**
 * @api {Get} / Employees By Max Salary.
 * API: Performing the GET Method for fetching the Employees By Employees Max Salary from Database.
 */
export let getEmployeesByMaxSalary = async(req:Request, res:Response) => {
    logger.info('getEmployeesByMaxSalary method: GET');
    let employeeRepo: EmployeeRepo = new EmployeeRepo();
    let restResult: RestResult = new RestResult();

    try {
        await employeeRepo.getEmployeesByMaxSalary().then((result) => {
            restResult.status = RestResult.REST_RESULT_SUCCESS;
            restResult.message = "Successfully get employees";
            restResult.data = result;
            if(result.length <= 0) {
                restResult.message = "No Data Found";
            }
            return res.send(restResult);
        })
    } catch {
            restResult.status = RestResult.REST_RESULT_FAILURE;
            restResult.message = "Internal server error";
            restResult.data = null;
            return res.send(restResult);
    }

}


/**
 * @api {post} / - Edit/Update the Employees.
 * API: Performing the POST Method for Edit the Employees.
 */
export let editEmployees = async(req:Request, res:Response) => {
    logger.info('editEmployees method: POST');
    let employeeRepo: EmployeeRepo = new EmployeeRepo();
    let employeeEntity: EmployeeEntity = new EmployeeEntity();
    let restResult: RestResult = new RestResult();
    let empCR = req.body;
    let empID = empCR.id;

    try {
        if(empID == undefined){
            /** Here you need to validate user input. 
             Let's check Employee Id is required field.
            */
            restResult.status = RestResult.REST_RESULT_FAILURE;
            restResult.message = "Parameter empID is required";
            restResult.data = null;
            return res.send(restResult);  
        }

        await employeeRepo.getEmployeeById(empID).then(async(result) => {
            if(result) {
                employeeEntity.id = empID,
                employeeEntity.empName = empCR.empName,
                employeeEntity.firstName = empCR.firstName,
                employeeEntity.lastName = empCR.lastName;
                employeeEntity.emailAddress = empCR.emailAddress
                
                await employeeRepo.saveEmployee(employeeEntity).then((result) => {
                    if(result){
                        employeeRepo.getEmployeeById(result.id).then((result) => {
                            restResult.status = RestResult.REST_RESULT_SUCCESS;
                            restResult.message = "Successfully updated the employee details";
                            restResult.data = result;
                            return res.send(restResult);
                        })
                    }
                })
            } else {
                restResult.status = RestResult.REST_RESULT_FAILURE;
                restResult.message = "Employee not found with given empID";
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
 * @api {post} / Delete the Employees.
 * API: Delete the Employee from Database.
 */
export let deleteEmployees = async(req:Request, res:Response) => {
    logger.info('deleteEmployee method: GET');
    let employeeRepo: EmployeeRepo = new EmployeeRepo();
    let restResult: RestResult = new RestResult();
    
    let empID = req.body.id;

    try {
        if(empID == undefined){
            /** Here you need to validate user input. 
             Let's check Employee Id is required field.
            */
            restResult.status = RestResult.REST_RESULT_FAILURE;
            restResult.message = "Parameter empID is required";
            restResult.data = null;
            return res.send(restResult);
        }
        await employeeRepo.getEmployeeById(empID).then(async(result) => {
            if(result){
                await employeeRepo.deleteEmployeesById(result.id).then((result) => {
                restResult.status = RestResult.REST_RESULT_SUCCESS;
                restResult.message = "Successfully deleted Employee";
                return res.send(restResult);
            })
            } else {
                restResult.status = RestResult.REST_RESULT_FAILURE;
                restResult.message = "Employee not found with given empID";
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