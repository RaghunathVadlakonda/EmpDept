import { DepartmentEntity } from '../entities/department-entity';
import { getManager } from 'typeorm';

export class DepartmentRepo {

    saveDepartment(department: DepartmentEntity) {
        return getManager()
               .getRepository(DepartmentEntity)
               .save(department)
    }

    findDepartmentByName(deptName: string) {
        return getManager()
               .getRepository(DepartmentEntity)
               .createQueryBuilder('department')
               .where('department.deptName = :deptName')
               .setParameters({deptName:deptName})
               .getOne();
    }

    getDepartmentById(id: number) {
        return getManager()
               .getRepository(DepartmentEntity)
               .createQueryBuilder('department')
               .where('department.id = :id')
               .setParameters({id:id})
               .getOne();
    }

    deleteDepartmentsById(id: number) {
        return getManager()
               .createQueryBuilder()
               .delete()
               .from(DepartmentEntity)
               .where('id = :id')
               .setParameters({'id':id})
               .execute();
    }
}