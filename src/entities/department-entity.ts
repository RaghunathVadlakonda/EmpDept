import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'enlume.department'})
export class DepartmentEntity {

  @PrimaryGeneratedColumn({name:'dept_id'})
  id: number;

  @Column({name:'dept_name'})
  deptName: string;
  
}