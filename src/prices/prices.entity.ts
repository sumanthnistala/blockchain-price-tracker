import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Decimal128 } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chain: string;

  @Column('decimal', { precision: 20, scale: 10 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}