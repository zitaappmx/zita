import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn('uuid')
  merchantId: string;

  @Column()
  name: string;
}
