"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employee_entity_1 = require("../entities/employee-entity");
const employee_departments_entity_1 = require("../entities/employee-departments-entity");
const department_entity_1 = require("../entities/department-entity");
const typeorm_1 = require("typeorm");
class EmployeeRepo {
    saveEmployee(employee) {
        return typeorm_1.getManager()
            .getRepository(employee_entity_1.EmployeeEntity)
            .save(employee);
    }
    findEmployeeByName(empName) {
        return typeorm_1.getManager()
            .getRepository(employee_entity_1.EmployeeEntity)
            .createQueryBuilder('employee')
            .where('employee.empName = :empName')
            .setParameters({ empName: empName })
            .getOne();
    }
    findEmployeeByemailAddress(emailAddress) {
        return typeorm_1.getManager()
            .getRepository(employee_entity_1.EmployeeEntity)
            .createQueryBuilder('employee')
            .where('employee.emailAddress = :emailAddress')
            .setParameters({ emailAddress: emailAddress })
            .getOne();
    }
    getEmployees() {
        return typeorm_1.getManager()
            .getRepository(employee_entity_1.EmployeeEntity)
            .createQueryBuilder('employee')
            .getMany();
    }
    getEmployeesByDepartment(deptID) {
        return typeorm_1.getManager()
            .getRepository(employee_departments_entity_1.EmployeeDepartmentEntity)
            .createQueryBuilder('employeedepartment')
            .select('employeedepartment.id', 'id')
            .addSelect('employee.empName', 'empName')
            .addSelect('employee.firstName', 'firstName')
            .addSelect('employee.lastName', 'lastName')
            .addSelect('employee.phoneNumber', 'phoneNumber')
            .addSelect('employee.emailAddress', 'emailAddress')
            .addSelect('employee.salary', 'salary')
            .addSelect('department.deptName', 'deptName')
            .innerJoin(employee_entity_1.EmployeeEntity, 'employee', 'employee.id = employeedepartment.empID')
            .innerJoin(department_entity_1.DepartmentEntity, 'department', 'department.id = employeedepartment.deptID')
            .where('employeedepartment.deptID = :deptID')
            .setParameters({ deptID: deptID })
            .getRawMany();
    }
    getEmployeesBySearch(firstName, lastName, hireDate, deptName) {
        return typeorm_1.getManager()
            .getRepository(employee_departments_entity_1.EmployeeDepartmentEntity)
            .createQueryBuilder('employeedepartment')
            .select('employee.id', 'id')
            .addSelect('employee.empName', 'empName')
            .addSelect('employee.firstName', 'firstName')
            .addSelect('employee.lastName', 'lastName')
            .addSelect('employee.phoneNumber', 'phoneNumber')
            .addSelect('employee.emailAddress', 'emailAddress')
            .addSelect('employee.salary', 'salary')
            .addSelect('employee.hireDate', 'hireDate')
            .addSelect('department.deptName', 'deptName')
            .innerJoin(employee_entity_1.EmployeeEntity, 'employee', 'employee.id = employeedepartment.empID')
            .innerJoin(department_entity_1.DepartmentEntity, 'department', 'department.id = employeedepartment.deptID')
            .where('employee.firstName like :firstName', { firstName: '%' + firstName + '%' })
            .andWhere('employee.lastName like :lastName', { lastName: '%' + lastName + '%' })
            .andWhere('employee.hireDate like :hireDate', { hireDate: '%' + hireDate + '%' })
            .andWhere('department.deptName like :deptName', { deptName: '%' + deptName + '%' })
            .orderBy('employee.id', 'ASC')
            .getRawMany();
    }
    getEmployeesByMaxSalary() {
        return typeorm_1.getManager()
            .getRepository(employee_departments_entity_1.EmployeeDepartmentEntity)
            .createQueryBuilder('employeedepartment')
            .select('employee.id', 'id')
            .addSelect('employee.empName', 'empName')
            .addSelect('employee.firstName', 'firstName')
            .addSelect('employee.lastName', 'lastName')
            .addSelect('employee.phoneNumber', 'phoneNumber')
            .addSelect('employee.emailAddress', 'emailAddress')
            .addSelect('MAX(employee.salary)', 'salary')
            .addSelect('employee.hireDate', 'hireDate')
            .addSelect('department.deptName', 'deptName')
            .innerJoin(employee_entity_1.EmployeeEntity, 'employee', 'employee.id = employeedepartment.empID')
            .innerJoin(department_entity_1.DepartmentEntity, 'department', 'department.id = employeedepartment.deptID')
            .groupBy('department.deptName')
            .orderBy('MAX(employee.salary)', 'DESC')
            .limit(5)
            .getRawMany();
    }
    getEmployeeById(id) {
        return typeorm_1.getManager()
            .getRepository(employee_entity_1.EmployeeEntity)
            .createQueryBuilder('employee')
            .where('employee.id = :id')
            .setParameters({ id: id })
            .getOne();
    }
    deleteEmployeesById(id) {
        return typeorm_1.getManager()
            .createQueryBuilder()
            .delete()
            .from(employee_entity_1.EmployeeEntity)
            .where('id = :id')
            .setParameters({ id: id })
            .execute();
    }
}
exports.EmployeeRepo = EmployeeRepo;
//# sourceMappingURL=employee-repository.js.map