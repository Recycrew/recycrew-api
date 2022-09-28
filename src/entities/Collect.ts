import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Material } from "./Material";
import { User } from "./User";

@Entity("collections")
export class Collect {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Material, (material) => material.id)
  material_ids: Material[];

  @Column()
  donator_id: number;

  @Column()
  collector_id: number;

  @CreateDateColumn()
  collect_date: Date;

  @Column()
  status: string;
}
