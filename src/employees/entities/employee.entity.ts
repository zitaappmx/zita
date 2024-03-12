import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Merchant } from 'src/merchants/entities/merchant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  group: string;

  @ManyToOne(() => Merchant, (merchant) => merchant.employees)
  merchant: Merchant;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
