import { Router } from 'express';
const router = Router();
/**
 * Controllers (route handlers).
 */
import * as departmentController from '../controllers/department-controller';

// Create Department
router.post('/saveDepartment', departmentController.saveDepartment);
// Edit the Departments
router.post('/editDepartment', departmentController.editDepartments);
//delete the Department
router.post('/deleteDepartment', departmentController.deleteDepartments);

export default router;
