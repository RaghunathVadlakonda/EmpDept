import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'enlume.employee_departments'})
export class EmployeeDepartmentEntity {

  @PrimaryGeneratedColumn({name:'emp_dept_id'})
  id: number;

  @Column({name:'emp_id'})
  empID: number;

  @Column({name:'dept_id'})
  deptID: number
  
}