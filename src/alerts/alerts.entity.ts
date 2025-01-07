import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Decimal128 } from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chain: string;

  @Column('decimal')
  price: number;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}