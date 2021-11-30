import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public birth_date: Date;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;
}

export default Users;
