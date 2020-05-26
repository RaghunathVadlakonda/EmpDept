import { Router } from 'express';
const router = Router();
/**
 * Controllers (route handlers).
 */
import * as employeeController from '../controllers/employee-controller';

// Create Employee
router.post('/saveEmployee', employeeController.saveEmployee);
// Get All Employees
router.get('/getAllEmployees', employeeController.getAllEmployees);
// Get Employees By Department
router.post('/getEmployeesByDept', employeeController.getEmployeesByDepartment);
// Get Employees By given search Details
router.get('/getEmployeesBysearch', employeeController.getEmployeesBySearch);
// Get Employees By top salary with department wise
router.get('/getEmployeesByMaxSalary',employeeController.getEmployeesByMaxSalary);
// Edit the Employees
router.post('/editEmployee', employeeController.editEmployees);
//delete the Employee
router.post('/deleteEmployee', employeeController.deleteEmployees);

export default router;