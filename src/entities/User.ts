import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  document_type: string;

  @Column()
  document_number: number;

  @Column()
  collector: boolean;

  @Column()
  phone_number: string;

  @Column()
  isAdmin: boolean;

  @Column()
  cep: number;

  @Column()
  street_and_number: string;

  @Column()
  complement: string;

  @Column()
  city_and_state: string;

  @CreateDateColumn()
  created_at: Date;
}
