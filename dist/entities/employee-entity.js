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
let EmployeeEntity = class EmployeeEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'emp_id' }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'emp_name' }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "empName", void 0);
__decorate([
    typeorm_1.Column({ name: 'first_name' }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ name: 'last_name' }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ name: 'phone_number' }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ name: 'email_address' }),
    __metadata("design:type", String)
], EmployeeEntity.prototype, "emailAddress", void 0);
__decorate([
    typeorm_1.Column({ name: 'salary' }),
    __metadata("design:type", Number)
], EmployeeEntity.prototype, "salary", void 0);
__decorate([
    typeorm_1.Column({ name: 'hire_date' }),
    __metadata("design:type", Date)
], EmployeeEntity.prototype, "hireDate", void 0);
EmployeeEntity = __decorate([
    typeorm_1.Entity({ name: 'enlume.employee' })
], EmployeeEntity);
exports.EmployeeEntity = EmployeeEntity;
//# sourceMappingURL=employee-entity.js.map