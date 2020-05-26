"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
/**
 * Controllers (route handlers).
 */
const departmentController = require("../controllers/department-controller");
// Create Department
router.post('/saveDepartment', departmentController.saveDepartment);
// Edit the Departments
router.post('/editDepartment', departmentController.editDepartments);
//delete the Department
router.post('/deleteDepartment', departmentController.deleteDepartments);
exports.default = router;
//# sourceMappingURL=department-routes.js.map