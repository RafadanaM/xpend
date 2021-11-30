import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @Column({ unique: true })
  public email: string;

  @Column({ select: false })
  public password: string;

  @CreateDateColumn()
  public created: Date;

  @UpdateDateColumn()
  public updated: Date;
}

export default Users;
