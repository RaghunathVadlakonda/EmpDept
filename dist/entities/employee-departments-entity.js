"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let EmployeeDepartmentEntity = class EmployeeDepartmentEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'emp_dept_id' }),
    __metadata("design:type", Number)
], EmployeeDepartmentEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'emp_id' }),
    __metadata("design:type", Number)
], EmployeeDepartmentEntity.prototype, "empID", void 0);
__decorate([
    typeorm_1.Column({ name: 'dept_id' }),
    __metadata("design:type", Number)
], EmployeeDepartmentEntity.prototype, "deptID", void 0);
EmployeeDepartmentEntity = __decorate([
    typeorm_1.Entity({ name: 'enlume.employee_departments' })
], EmployeeDepartmentEntity);
exports.EmployeeDepartmentEntity = EmployeeDepartmentEntity;
//# sourceMappingURL=employee-departments-entity.js.map