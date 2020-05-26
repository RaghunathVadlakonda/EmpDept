import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'enlume.employee'})
export class EmployeeEntity {

  @PrimaryGeneratedColumn({name:'emp_id'})
  id: number;

  @Column({name:'emp_name'})
  empName: string;

  @Column({name:'first_name'})
  firstName: string;

  @Column({name:'last_name'})
  lastName: string;

  @Column({name:'phone_number'})
  phoneNumber: number;

  @Column({name:'email_address'})
  emailAddress: string;

  @Column({name:'salary'})
  salary: number;

  @Column({name:'hire_date'})
  hireDate: Date;

}