import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

// vidro, papel, plastico, borracha etc
@Entity("materials")
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isRecyclable: boolean;

  @CreateDateColumn()
  created_at: Date;
}
