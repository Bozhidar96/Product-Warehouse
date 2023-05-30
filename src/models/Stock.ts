import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Warehouse } from './Warehouse';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  warehouseId: number;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.stocks)
  warehouse: Warehouse;
}
