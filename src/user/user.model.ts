import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 30 })
  firstname: string;
  @Column({ length: 30 })
  lastname: string;
  @Column()
  email: string;
  @Column()
  age: number;
  @Column()
  password: string;
  @Column()
  photo: string;
}
