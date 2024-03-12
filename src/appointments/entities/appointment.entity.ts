import { Client } from 'src/client/entities/client.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Merchant } from 'src/merchants/entities/merchant.entity';
import { Service } from 'src/services/entities/service.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  dateTime: Date;

  @ManyToOne(() => Merchant, (merchant) => merchant.appointments)
  merchant: Merchant;

  @ManyToOne(() => Client, (client) => client.appointments)
  client: Client;

  @ManyToOne(() => Employee, (employee) => employee.appointments)
  employee: Employee;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
