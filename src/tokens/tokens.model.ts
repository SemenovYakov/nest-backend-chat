import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId: number;
  @Column()
  refreshToken: string;
}
