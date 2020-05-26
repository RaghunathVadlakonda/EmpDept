import { EmployeeEntity } from '../entities/employee-entity';
import { EmployeeDepartmentEntity } from '../entities/employee-departments-entity';
import { DepartmentEntity } from '../entities/department-entity';
import { getManager } from 'typeorm';

export class EmployeeRepo {

    saveEmployee(employee: EmployeeEntity) {
        return getManager()
               .getRepository(EmployeeEntity)
               .save(employee)
    }

    findEmployeeByName(empName: string) {
        return getManager()
               .getRepository(EmployeeEntity)
               .createQueryBuilder('employee')
               .where('employee.empName = :empName')
               .setParameters({empName:empName})
               .getOne();
    }

    findEmployeeByemailAddress(emailAddress: string) {
        return getManager()
               .getRepository(EmployeeEntity)
               .createQueryBuilder('employee')
               .where('employee.emailAddress = :emailAddress')
               .setParameters({emailAddress:emailAddress})
               .getOne();
    }

    getEmployees() {
        return getManager()
               .getRepository(EmployeeEntity)
               .createQueryBuilder('employee')
               .getMany()
    }

    getEmployeesByDepartment(deptID: number) {
        return getManager()
               .getRepository(EmployeeDepartmentEntity)
               .createQueryBuilder('employeedepartment')
               .select('employeedepartment.id', 'id')
               .addSelect('employee.empName', 'empName')
               .addSelect('employee.firstName', 'firstName')
               .addSelect('employee.lastName', 'lastName')
               .addSelect('employee.phoneNumber', 'phoneNumber')
               .addSelect('employee.emailAddress', 'emailAddress')
               .addSelect('employee.salary', 'salary')
               .addSelect('department.deptName', 'deptName')
               .innerJoin(EmployeeEntity, 'employee', 'employee.id = employeedepartment.empID')
               .innerJoin(DepartmentEntity, 'department', 'department.id = employeedepartment.deptID')
               .where('employeedepartment.deptID = :deptID')
               .setParameters({deptID:deptID})
               .getRawMany();
    }

    getEmployeesBySearch(firstName: string, lastName: string, hireDate: Date, deptName: string) { 
        return getManager()
               .getRepository(EmployeeDepartmentEntity)
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
               .innerJoin(EmployeeEntity, 'employee', 'employee.id = employeedepartment.empID')
               .innerJoin(DepartmentEntity, 'department', 'department.id = employeedepartment.deptID')
               .where('employee.firstName like :firstName', {firstName: '%' + firstName + '%'})
               .andWhere('employee.lastName like :lastName', {lastName: '%' + lastName + '%'})
               .andWhere('employee.hireDate like :hireDate', {hireDate: '%' + hireDate + '%'})
               .andWhere('department.deptName like :deptName', {deptName: '%' + deptName + '%'})
               .orderBy('employee.id', 'ASC')
               .getRawMany();
    }

    getEmployeesByMaxSalary() {
        return getManager()
               .getRepository(EmployeeDepartmentEntity)
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
               .innerJoin(EmployeeEntity, 'employee', 'employee.id = employeedepartment.empID')
               .innerJoin(DepartmentEntity, 'department', 'department.id = employeedepartment.deptID')
               .groupBy('department.deptName')
               .orderBy('MAX(employee.salary)', 'DESC')
               .limit(5)
               .getRawMany();

    }

    getEmployeeById(id: number) {
        return getManager()
               .getRepository(EmployeeEntity)
               .createQueryBuilder('employee')
               .where('employee.id = :id')
               .setParameters({id:id})
               .getOne();
    }

    deleteEmployeesById(id: number) {
        return getManager()
               .createQueryBuilder()
               .delete()
               .from(EmployeeEntity)
               .where('id = :id')
               .setParameters({id:id})
               .execute();
    }
}