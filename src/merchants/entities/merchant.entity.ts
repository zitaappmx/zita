import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Service } from 'src/services/entities/service.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Appointment, (appointment) => appointment.merchant)
  appointments: Appointment[];

  @OneToMany(() => Employee, (employee) => employee.merchant)
  employees: Employee[];

  @OneToMany(() => Service, (service) => service.merchant)
  services: Service[];
}
