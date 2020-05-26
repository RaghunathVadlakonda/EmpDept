"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const department_entity_1 = require("../entities/department-entity");
const typeorm_1 = require("typeorm");
class DepartmentRepo {
    saveDepartment(department) {
        return typeorm_1.getManager()
            .getRepository(department_entity_1.DepartmentEntity)
            .save(department);
    }
    findDepartmentByName(deptName) {
        return typeorm_1.getManager()
            .getRepository(department_entity_1.DepartmentEntity)
            .createQueryBuilder('department')
            .where('department.deptName = :deptName')
            .setParameters({ deptName: deptName })
            .getOne();
    }
    getDepartmentById(id) {
        return typeorm_1.getManager()
            .getRepository(department_entity_1.DepartmentEntity)
            .createQueryBuilder('department')
            .where('department.id = :id')
            .setParameters({ id: id })
            .getOne();
    }
    deleteDepartmentsById(id) {
        return typeorm_1.getManager()
            .createQueryBuilder()
            .delete()
            .from(department_entity_1.DepartmentEntity)
            .where('id = :id')
            .setParameters({ 'id': id })
            .execute();
    }
}
exports.DepartmentRepo = DepartmentRepo;
//# sourceMappingURL=department-repository.js.map