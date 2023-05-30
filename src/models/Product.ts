import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public size!: number;

  @Column()
  public isHazardous!: boolean;
}